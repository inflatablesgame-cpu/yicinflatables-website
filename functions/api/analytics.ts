interface Env {
  GOOGLE_SHEETS_WEBHOOK_URL?: string;
}

type AnalyticsEvent = {
  eventType: string;
  pageUrl?: string;
  sourceUrl?: string;
  referrer?: string;
  linkLabel?: string;
  targetUrl?: string;
  product?: string;
  sessionId?: string;
};

const allowedEvents = new Set([
  'page_view',
  'whatsapp_click',
]);

function cleanText(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanEvent(value: unknown): AnalyticsEvent | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  const eventType = cleanText(input.eventType, 60);
  if (!allowedEvents.has(eventType)) return null;
  return {
    eventType,
    pageUrl: cleanText(input.pageUrl),
    sourceUrl: cleanText(input.sourceUrl),
    referrer: cleanText(input.referrer),
    linkLabel: cleanText(input.linkLabel, 160),
    targetUrl: cleanText(input.targetUrl),
    product: cleanText(input.product, 200),
    sessionId: cleanText(input.sessionId, 100),
  };
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  if (!context.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    return Response.json({ ok: false, error: 'Analytics is not configured.' }, { status: 503 });
  }

  let event: AnalyticsEvent | null = null;
  try {
    event = cleanEvent(await context.request.json());
  } catch {
    return Response.json({ ok: false, error: 'Invalid analytics payload.' }, { status: 400 });
  }
  if (!event) return Response.json({ ok: false, error: 'Unsupported event.' }, { status: 400 });

  let response: Response;
  try {
    response = await fetch(context.env.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        ...event,
        receivedAt: new Date().toISOString(),
        country: context.request.cf?.country || '',
      }),
    });
  } catch {
    return Response.json({ ok: false, error: 'Analytics delivery failed.' }, { status: 502 });
  }
  const result = await response.json().catch(() => null) as { ok?: boolean } | null;
  if (!response.ok || result?.ok !== true) {
    return Response.json({ ok: false, error: 'Analytics delivery failed.' }, { status: 502 });
  }
  return new Response(null, { status: 204 });
};
