# FlexTend PT Website Redesign Walkthrough

The **FlexTend Physical Therapy Clinic** website has been updated and pushed to GitHub with the root entry point `index.html` to resolve Vercel and GitHub Pages 404 errors.

---

## 🚀 Vercel & GitHub 404 Deployment Fix

### Why the 404 Error Occurred:
- Static hosting providers (like Vercel and GitHub Pages) expect an entry file named `index.html` in the root folder of the repository to serve as the default homepage (`/`).
- Previously, the file was named `FLEXTEND REVISED 2.html`, causing Vercel to return a **404: NOT_FOUND** error when visiting the root domain.

### Resolution Applied:
1. Created [index.html](file:///c:/Users/peral/Documents/flextend/index.html) as an exact, fully updated copy of `FLEXTEND REVISED 2.html`.
2. Committed and pushed `index.html` directly to the `main` branch of your GitHub repository (`razzeysphinx/flextend`).
3. Vercel will automatically trigger a new deployment and serve your website live!

---

## Recent Updates Summary
- **Mobile Phone Dialer Links**: Click-to-call links for both numbers (`tel:+639671956863` and `tel:+639064574530`).
- **Direct Gmail Web Compose Link**: Clickable email opening Gmail compose window directly.
- **Clinic Hours**: Mon - Fri: 8am - 4pm, Sat: By Appointment (Home Visit), Sun: Closed.
- **Visit Address & Map**: Google Maps link (`https://maps.app.goo.gl/QBoQGC5gAwqWQKBH9`).
- **Reason for Visit Options**: Musculoskeletal & orthopedic, Neurologic cases, Pediatric cases, Not Yet.
