# ResumeKit — Product Specification

## Purpose
A browser-first resume builder for students and early-career professionals. It helps users create a clean, readable resume, inspect basic completeness and compare resume wording with a target job description.

## MVP features
- Structured contact, summary, experience, education, skills, projects, certifications and achievements sections.
- Add/remove repeatable experience, education and project entries.
- Live preview with Classic and Modern layouts.
- Browser print flow for Save as PDF.
- Browser-local draft persistence using localStorage.
- JSON export/import for portable backups.
- Basic resume quality checklist.
- Job-description keyword overlap analysis with found/missing terms.
- Responsive editor and print-specific A4 styling.

## Privacy and data handling
- No application backend or account is required.
- Resume content is stored in localStorage only when saved or autosaved on page exit.
- Resume content is not transmitted to a ResumeKit server.
- The user should export a JSON backup before clearing browser data or changing devices.
- Third-party Bootstrap and Font Awesome assets are loaded from public CDNs; these assets do not receive resume fields from this app.

## Explicit limitations
- The keyword checker is a simple text-overlap helper, not a true ATS parser, score, ranking or hiring prediction.
- PDF output uses the browser print dialog; output can vary by browser and print settings. Select A4 paper and enable background graphics only if desired.
- No DOCX export, OCR, AI rewriting, cloud sync, account system, sharing link or server-side processing in this MVP.
- No guarantee of ATS compatibility with every employer platform.
- Resume content is not encrypted in localStorage. Users should avoid saving sensitive personal identifiers on shared devices.

## Non-goals for MVP
- Job applications or automatic submission.
- Resume hosting and public profile pages.
- Payment, subscription or usage limits.
- Server-side document conversion.

## Browser support
Modern Chromium, Firefox and Safari versions with localStorage, FileReader, Blob and print support.