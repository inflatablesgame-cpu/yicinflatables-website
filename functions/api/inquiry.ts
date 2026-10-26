interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  INQUIRY_FROM_EMAIL?: string;
  INQUIRY_BACKUP_EMAIL?: string;
}

const fields = ['Name', 'Company', 'Email', 'Phone / WhatsApp', 'Country', 'Product', 'Quantity', 'Destination', 'Timeline', 'Requirements', 'Source page URL'];

function cleanText(value: unknown, maxLength = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
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
          `Country: ${payload.country || ''}`,
          `Product: ${payload.product || ''}`,
          `Quantity: ${payload.quantity || ''}`,
          `Destination: ${payload.destination || ''}`,
          `Timeline: ${payload.timeline || ''}`,
          `Source page: ${payload.sourceUrl || ''}`,
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
  let formData: FormData;
  try {
    formData = await context.request.formData();
  } catch {
    return Response.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  }

  const inquiry = Object.fromEntries(fields.map((field) => [field, cleanText(formData.get(field))]));
  if (!inquiry.Name || !inquiry.Email) {
    return Response.json({ ok: false, error: 'Name and email are required.' }, { status: 400 });
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
    country: inquiry.Country,
    quantity: inquiry.Quantity,
    destination: inquiry.Destination,
    timeline: inquiry.Timeline,
    requirements: inquiry.Requirements,
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
