/**
 * Bind this script to the YIC Inquiry Events Google Sheet, then deploy it as
 * a Web app. Store the resulting URL, including ?key=..., in Cloudflare as
 * GOOGLE_SHEETS_WEBHOOK_URL. Do not put that URL in browser-side code.
 */

const WEBHOOK_KEY = 'REPLACE_WITH_A_LONG_RANDOM_SECRET';
const NOTIFICATION_EMAILS = 'lanna@yicinflatables.com';

const HEADERS = {
  'Page Views': ['Timestamp', 'Page URL', 'Referrer', 'Session ID', 'Country', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'],
  'WhatsApp Clicks': ['Timestamp', 'Button or Link', 'Page URL', 'Source Page URL', 'Product', 'WhatsApp Destination', 'Session ID', 'Country', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'],
  'Quote Clicks': ['Timestamp', 'Button or Link', 'Page URL', 'Source Page URL', 'Product', 'Target URL', 'Session ID', 'Country', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'],
  'Email Clicks': ['Timestamp', 'Button or Link', 'Page URL', 'Source Page URL', 'Product', 'Target URL', 'Session ID', 'Country', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'],
  'Form Submissions': ['Timestamp', 'Name', 'Email', 'Phone / WhatsApp', 'Company', 'Buyer Type', 'Country', 'Product', 'Quantity', 'Destination', 'Timeline', 'Requirements', 'Source Page URL', 'Visitor Country', 'Initial Landing Page', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'GCLID', 'MSCLKID'],
};

function attributionValues_(data) {
  return [data.initialLandingPage, data.utmSource, data.utmMedium, data.utmCampaign, data.utmTerm, data.utmContent, data.gclid, data.msclkid];
}

function doGet() {
  return reply_({ ok: true, service: 'YIC inquiry event receiver' });
}

// Run this once from the Apps Script editor after saving. It confirms that
// the script can write to this spreadsheet before website traffic is tested.
function testTracking() {
  append_('Page Views', [new Date(), 'https://yicinflatables.com/diagnostic-test/', '', 'manual-test', '']);
}

function doPost(e) {
  try {
    if (!e || !e.postData || e.parameter.key !== WEBHOOK_KEY) return reply_({ ok: false, error: 'Unauthorized' });
    const data = JSON.parse(e.postData.contents || '{}');
    const timestamp = data.receivedAt ? new Date(data.receivedAt) : new Date();

    if (data.eventType === 'page_view') {
      append_('Page Views', [timestamp, data.pageUrl, data.referrer, data.sessionId, data.country].concat(attributionValues_(data)));
    } else if (data.eventType === 'whatsapp_click') {
      append_('WhatsApp Clicks', [timestamp, data.linkLabel, data.pageUrl, data.sourceUrl, data.product, data.targetUrl, data.sessionId, data.country].concat(attributionValues_(data)));
    } else if (data.eventType === 'quote_click') {
      append_('Quote Clicks', [timestamp, data.linkLabel, data.pageUrl, data.sourceUrl, data.product, data.targetUrl, data.sessionId, data.country].concat(attributionValues_(data)));
    } else if (data.eventType === 'email_click') {
      append_('Email Clicks', [timestamp, data.linkLabel, data.pageUrl, data.sourceUrl, data.product, data.targetUrl, data.sessionId, data.country].concat(attributionValues_(data)));
    } else if (data.eventType === 'form_submit_success') {
      append_('Form Submissions', [timestamp, data.name, data.email, data.phone, data.company, data.buyerType, data.country, data.product, data.quantity, data.destination, data.timeline, data.requirements, data.sourceUrl, data.countryCode].concat(attributionValues_(data)));
      notify_(data);
    }
    return reply_({ ok: true });
  } catch (error) {
    console.error(error);
    return reply_({ ok: false, error: 'Unable to record event' });
  }
}

function append_(sheetName, row) {
  const sheet = getOrCreateSheet_(sheetName);
  sheet.appendRow(row.map((value) => value == null ? '' : value));
}

function getOrCreateSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(sheetName);
  const headers = HEADERS[sheetName];
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  // Keep headers aligned when an existing sheet predates a new tracked field.
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0b2946').setFontColor('#ffffff');
  sheet.autoResizeColumns(1, headers.length);
  return sheet;
}

function notify_(data) {
  if (!NOTIFICATION_EMAILS) return;
  const subject = `YIC inquiry: ${data.product || 'Commercial inflatables'}`;
  const body = [
    `Name: ${data.name || ''}`,
    `Email: ${data.email || ''}`,
    `Phone / WhatsApp: ${data.phone || ''}`,
    `Company: ${data.company || ''}`,
    `Buyer type: ${data.buyerType || ''}`,
    `Country: ${data.country || ''}`,
    `Product: ${data.product || ''}`,
    `Quantity: ${data.quantity || ''}`,
    `Destination: ${data.destination || ''}`,
    `Timeline: ${data.timeline || ''}`,
    `Source page: ${data.sourceUrl || ''}`,
    `Initial landing page: ${data.initialLandingPage || ''}`,
    `Campaign: ${[data.utmSource, data.utmMedium, data.utmCampaign].filter(Boolean).join(' / ')}`,
    '',
    `Requirements:`,
    data.requirements || '',
  ].join('\n');
  MailApp.sendEmail(NOTIFICATION_EMAILS, subject, body, { replyTo: data.email || undefined });
}

function reply_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
