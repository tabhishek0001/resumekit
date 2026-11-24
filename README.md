# ResumeKit

A privacy-first, browser-based resume builder and basic ATS keyword checker.

## Use
Open `index.html` in a modern browser, or deploy the repository as a static website.

1. Fill in contact details and resume sections.
2. Add work experience, education and projects as needed.
3. Select Classic or Modern preview.
4. Use **Save** to store a draft in the current browser.
5. Use **Export PDF** and choose A4 / Save as PDF in the browser print dialog.
6. Use **Import JSON** to restore a backup on this or another device.

## Privacy
Resume information is processed in the browser. The app does not upload resume content to a backend. Saved drafts use browser localStorage and are not synced across devices. Export a JSON backup if you need to move your data.

## ATS checker
Paste a job description to see a basic keyword overlap report. This is not a real ATS score and does not predict hiring outcomes.

## Development
No build step is required. Bootstrap and Font Awesome are loaded from public CDNs. Run JavaScript syntax validation with:

```bash
node --check assets/js/app.js
```

See [PRODUCT-SPEC.md](PRODUCT-SPEC.md) and [tests/TEST-PLAN.md](tests/TEST-PLAN.md).
