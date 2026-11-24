# ResumeKit MVP Test Plan

## Editor and preview
- [ ] Page loads without JavaScript console errors.
- [ ] Contact and summary fields update the preview while typing.
- [ ] Add, edit and remove multiple experience entries.
- [ ] Add, edit and remove multiple education entries.
- [ ] Add, edit and remove multiple project entries.
- [ ] Text containing HTML-like characters is displayed as text, not interpreted as markup.
- [ ] Empty sections are omitted from the preview.
- [ ] Classic and Modern templates both render correctly.
- [ ] Layout remains usable at mobile, tablet and desktop widths.

## Draft and backup
- [ ] Save draft and reload the page; fields and repeatable entries are restored.
- [ ] Export JSON and verify it contains the entered data.
- [ ] Import the exported JSON and verify all sections restore.
- [ ] Invalid JSON shows an error without breaking the editor.
- [ ] Clear action requires confirmation and removes the saved draft.

## ATS helper and quality checks
- [ ] Quality checklist changes as required fields are completed.
- [ ] Empty job description displays a helpful prompt.
- [ ] Job description comparison shows overlap percentage and keyword groups.
- [ ] UI clearly explains that the comparison is not a real ATS score.

## Print
- [ ] Export PDF opens browser print dialog.
- [ ] A4 print preview contains only the resume, not editor controls.
- [ ] Long resumes flow across pages without clipped content.
- [ ] Browser print output is checked in Chromium and Firefox.

## Privacy
- [ ] No resume data is sent to a server endpoint.
- [ ] No analytics or tracking scripts are present.
- [ ] Draft remains local to the current browser profile.
