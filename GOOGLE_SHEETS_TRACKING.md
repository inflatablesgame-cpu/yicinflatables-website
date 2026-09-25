# Google Sheets inquiry and click tracking

The site records only these three event streams through Cloudflare Pages:

- `Page Views`: one entry per page view.
- `WhatsApp Clicks`: WhatsApp clicks only.
- `Form Submissions`: confirmed quote-form submissions only (`form_submit_success`).

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

## 2. Add the Cloudflare secret

In **Cloudflare Pages > yicinflatables-website > Settings > Environment variables** add a secret:

```
GOOGLE_SHEETS_WEBHOOK_URL = full Google Apps Script URL including ?key=...
```

Save it, then use **Deployments > Retry deployment** (or push a new Git commit).

The Google endpoint stays server-side. Visitors never receive the secret or the Apps Script URL.

## 3. Test

1. Open a page of the live site: a row should appear in `Page Views`.
2. Click a WhatsApp button: a row should appear in `WhatsApp Clicks`.
3. Submit a test quote form: a row should appear in `Form Submissions` and an email should be sent to `NOTIFICATION_EMAILS`.

Do not treat a `mailto:` draft as a submitted inquiry. The site records form submissions only after the Cloudflare endpoint receives and forwards the form successfully.
