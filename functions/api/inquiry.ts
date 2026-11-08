interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  INQUIRY_FROM_EMAIL?: string;
  INQUIRY_BACKUP_EMAIL?: string;
}

const fields = ['Name', 'Company', 'Email', 'Phone / WhatsApp', 'Buyer Type', 'Country', 'Product', 'Quantity', 'Destination', 'Timeline', 'Requirements', 'Source page URL', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d\s.-]+$/;

function cleanText(value: unknown, maxLength = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

async function verifyTurnstile(token: string, secret: string, remoteIp: string) {
  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set('remoteip', remoteIp);
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const result = await response.json().catch(() => null) as { success?: boolean } | null;
    return response.ok && result?.success === true;
  } catch {
    return false;
  }
}

async function deliverToSheet(payload: Record<string, unknown>, webhookUrl: string) {
  const body = JSON.stringify(payload);
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body,
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
      if (response.ok && result?.ok === true) return true;
    } catch {
      // Retry once, then fall through to the graceful fallback below.
    }
  }
  return false;
}

async function deliverToBackupEmail(payload: Record<string, unknown>, env: Env) {
  if (!env.RESEND_API_KEY || !env.INQUIRY_FROM_EMAIL || !env.INQUIRY_BACKUP_EMAIL) return false;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: env.INQUIRY_FROM_EMAIL,
        to: [env.INQUIRY_BACKUP_EMAIL],
        reply_to: payload.email || undefined,
        subject: `YIC inquiry: ${payload.product || 'Commercial inflatables'}`,
        text: [
          `Name: ${payload.name || ''}`,
          `Email: ${payload.email || ''}`,
          `Phone / WhatsApp: ${payload.phone || ''}`,
          `Company: ${payload.company || ''}`,
          `Buyer type: ${payload.buyerType || ''}`,
          `Country: ${payload.country || ''}`,
          `Product: ${payload.product || ''}`,
          `Quantity: ${payload.quantity || ''}`,
          `Destination: ${payload.destination || ''}`,
          `Timeline: ${payload.timeline || ''}`,
          `Source page: ${payload.sourceUrl || ''}`,
          `Initial landing page: ${payload.initialLandingPage || ''}`,
          `Campaign: ${[payload.utmSource, payload.utmMedium, payload.utmCampaign].filter(Boolean).join(' / ')}`,
          '',
          `Requirements:\n${payload.requirements || ''}`,
        ].join('\n'),
      }),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.TURNSTILE_SECRET_KEY) {
    return Response.json({ ok: false, error: 'Spam protection is not configured.' }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch {
    return Response.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  }

  const turnstileToken = cleanText(formData.get('cf-turnstile-response'), 4096);
  const honeypot = cleanText(formData.get('Website'), 200);
  const startedAt = Number(cleanText(formData.get('Form Started At'), 30));
  const elapsed = Date.now() - startedAt;
  if (honeypot || !turnstileToken || !Number.isFinite(startedAt) || elapsed < 2500 || elapsed > 2 * 60 * 60 * 1000) {
    return Response.json({ ok: false, error: 'Spam verification failed.' }, { status: 403 });
  }
  const verified = await verifyTurnstile(
    turnstileToken,
    context.env.TURNSTILE_SECRET_KEY,
    context.request.headers.get('CF-Connecting-IP') || '',
  );
  if (!verified) return Response.json({ ok: false, error: 'Spam verification failed.' }, { status: 403 });

  const inquiry = Object.fromEntries(fields.map((field) => [field, cleanText(formData.get(field))]));
  const contactMethod = cleanText(formData.get('Contact Method'));
  if (!inquiry.Email && !inquiry['Phone / WhatsApp'] && contactMethod) {
    if (emailPattern.test(contactMethod)) inquiry.Email = contactMethod;
    else if (phonePattern.test(contactMethod) && contactMethod.replace(/\D/g, '').length >= 7 && contactMethod.replace(/\D/g, '').length <= 15) inquiry['Phone / WhatsApp'] = contactMethod;
  }
  if (!inquiry.Name || (!inquiry.Email && !inquiry['Phone / WhatsApp'])) {
    return Response.json({ ok: false, error: 'Name and either email or WhatsApp are required.' }, { status: 400 });
  }
  if (inquiry.Email && !emailPattern.test(inquiry.Email)) {
    return Response.json({ ok: false, error: 'Enter a valid work email.' }, { status: 400 });
  }
  if (inquiry['Phone / WhatsApp']) {
    const phoneDigits = inquiry['Phone / WhatsApp'].replace(/\D/g, '');
    if (!phonePattern.test(inquiry['Phone / WhatsApp']) || phoneDigits.length < 7 || phoneDigits.length > 15) {
      return Response.json({ ok: false, error: 'Enter a valid WhatsApp number.' }, { status: 400 });
    }
  }

  const payload = {
    eventType: 'form_submit_success',
    receivedAt: new Date().toISOString(),
    pageUrl: new URL(context.request.url).origin + '/contact/',
    sourceUrl: inquiry['Source page URL'],
    product: inquiry.Product,
    name: inquiry.Name,
    company: inquiry.Company,
    email: inquiry.Email,
    phone: inquiry['Phone / WhatsApp'],
    buyerType: inquiry['Buyer Type'],
    country: inquiry.Country,
    quantity: inquiry.Quantity,
    destination: inquiry.Destination,
    timeline: inquiry.Timeline,
    requirements: inquiry.Requirements,
    initialLandingPage: inquiry['Initial Landing Page'],
    utmSource: inquiry['UTM Source'],
    utmMedium: inquiry['UTM Medium'],
    utmCampaign: inquiry['UTM Campaign'],
    utmTerm: inquiry['UTM Term'],
    utmContent: inquiry['UTM Content'],
    gclid: inquiry.GCLID,
    msclkid: inquiry.MSCLKID,
    countryCode: context.request.cf?.country || '',
  };
  const deliveredToSheet = context.env.GOOGLE_SHEETS_WEBHOOK_URL
    ? await deliverToSheet(payload, context.env.GOOGLE_SHEETS_WEBHOOK_URL)
    : false;

  // Try a verified email only when Sheets did not accept the lead. If neither
  // channel is configured, return an error so the browser opens its mailto fallback.
  const deliveredToEmail = deliveredToSheet ? false : await deliverToBackupEmail(payload, context.env);
  if (!deliveredToSheet && !deliveredToEmail) {
    return Response.json({ ok: false, error: 'The inquiry service is temporarily unavailable.' }, { status: 502 });
  }

  return Response.json({ ok: true, recorded: deliveredToSheet, channel: deliveredToSheet ? 'sheets' : 'email' });
};
