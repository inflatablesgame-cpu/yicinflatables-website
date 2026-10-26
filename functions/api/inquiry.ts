interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  INQUIRY_FROM_EMAIL?: string;
  INQUIRY_BACKUP_EMAIL?: string;
}

const fields = ['Name', 'Company', 'Email', 'Country', 'Product', 'Requirements', 'Source page URL'];

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

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    return Response.json({ ok: false, error: 'The inquiry service is not configured.' }, { status: 503 });
  }

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

  const delivered = await deliverToSheet({
    eventType: 'form_submit_success',
    receivedAt: new Date().toISOString(),
    pageUrl: new URL(context.request.url).origin + '/contact/',
    sourceUrl: inquiry['Source page URL'],
    product: inquiry.Product,
    name: inquiry.Name,
    company: inquiry.Company,
    email: inquiry.Email,
    country: inquiry.Country,
    requirements: inquiry.Requirements,
    countryCode: context.request.cf?.country || '',
  }, context.env.GOOGLE_SHEETS_WEBHOOK_URL);

  // The lead is the priority. If Google Sheets is unreachable, still tell the
  // visitor it worked, and email a backup copy so the lead is never lost.
  if (!delivered) {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: context.env.INQUIRY_FROM_EMAIL || 'onboarding@resend.dev',
        to: [context.env.INQUIRY_BACKUP_EMAIL || 'lanna@yicinflatables.com'],
        reply_to: inquiry.Email || undefined,
        subject: `YIC inquiry (backup): ${inquiry.Product || 'Commercial inflatables'}`,
        text: `Name: ${inquiry.Name}\nEmail: ${inquiry.Email}\nCompany: ${inquiry.Company}\nCountry: ${inquiry.Country}\nProduct: ${inquiry.Product}\nSource page: ${inquiry['Source page URL']}\n\nRequirements:\n${inquiry.Requirements}`,
      }),
    }).catch(() => undefined);
  }

  return Response.json({ ok: true, recorded: delivered });
};
