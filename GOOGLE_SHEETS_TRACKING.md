# Google Sheets inquiry and click tracking

The site records these event streams through Cloudflare Pages:

- `Page Views`: one entry per page view, with first landing page and paid/UTM attribution when present.
- `WhatsApp Clicks`: WhatsApp clicks, including the buyer's original campaign context.
- `Quote Clicks`: clicks on quote/request buttons before the form is opened.
- `Email Clicks`: clicks on visible email links.
- `Form Submissions`: confirmed quote-form submissions only (`form_submit_success`), with buyer type, quantity, destination, timeline, and attribution fields.

## 1. Deploy the Google Apps Script

1. Open the **YIC Inquiry Events** Google Sheet.
2. Select **Extensions > Apps Script**.
3. Replace the editor contents with `google-apps-script/YICInquiryEvents.gs`.
4. Replace `REPLACE_WITH_A_LONG_RANDOM_SECRET` with a long random value.
5. If required, change `NOTIFICATION_EMAILS` to the email address that should receive new inquiries.
6. Click **Deploy > New deployment > Web app**.
7. Set **Execute as** to **Me** and **Who has access** to **Anyone**.
8. Authorize the script, then copy the Web app URL.
9. Append the secret to the copied URL. Example:

   `https://script.google.com/macros/s/DEPLOYMENT_ID/exec?key=YOUR_LONG_RANDOM_SECRET`

After changing `YICInquiryEvents.gs`, create a new version under **Deploy > Manage deployments > Edit > New version**. The existing deployed version does not update automatically.

## 2. Add the Cloudflare secret

In **Cloudflare Pages > yicinflatables-website > Settings > Environment variables** add a secret:

```
GOOGLE_SHEETS_WEBHOOK_URL = full Google Apps Script URL including ?key=...
RESEND_API_KEY = Resend API key, used only as the email fallback when the
  Google Sheets webhook fails, so an inquiry is never silently lost.
INQUIRY_FROM_EMAIL = verified sender address in Resend, e.g. quotes@yicinflatables.com
INQUIRY_BACKUP_EMAIL = mailbox that receives the fallback copy, e.g. lanna@yicinflatables.com
```

Save it, then use **Deployments > Retry deployment** (or push a new Git commit).

The Google endpoint stays server-side. Visitors never receive the secret or the Apps Script URL.

## 3. Verify Google Sheets access

In the Apps Script editor, select `testTracking` from the function picker and
click **Run**. Authorize it if requested. It must create a `Page Views` tab
and one `manual-test` row. If it does not, resolve the Apps Script
authorization before testing the website.

## 4. Test the website

1. Open a page of the live site: a row should appear in `Page Views`.
2. Click a WhatsApp button: a row should appear in `WhatsApp Clicks`.
3. Submit a test quote form using an email or WhatsApp number: a row should appear in `Form Submissions` and an email should be sent to `NOTIFICATION_EMAILS`.
4. Open a tagged URL such as `?utm_source=test&utm_medium=referral&utm_campaign=tracking-check`, then submit a test quote. Confirm the first landing page and UTM fields appear in the Sheet.

Do not treat a `mailto:` draft as a submitted inquiry. The site records form submissions only after the Cloudflare endpoint receives and forwards the form successfully.
