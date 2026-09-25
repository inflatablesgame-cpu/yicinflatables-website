interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
}

const fields = ['Name', 'Company', 'Email', 'Country', 'Product', 'Requirements', 'Source page URL'];

function cleanText(value: unknown, maxLength = 4000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
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

  const response = await fetch(context.env.GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
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
    }),
  });

  if (!response.ok) {
    return Response.json({ ok: false, error: 'The inquiry could not be recorded.' }, { status: 502 });
  }
  return Response.json({ ok: true });
};
