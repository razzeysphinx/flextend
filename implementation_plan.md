# Implementation Plan — FlexTend PT Website Mobile Responsiveness Fix

Enhance and fix the mobile responsiveness of the **FlexTend Physical Therapy Clinic** website ([index.html](file:///c:/Users/peral/Documents/flextend/index.html)) to ensure seamless readability, navigation, and usability across all mobile screen sizes (from 320px ultra-narrow smartphones up to 768px tablets and desktops).

## Core Mobile Responsiveness Improvements

### 1. Mobile Header & Navigation Drawer
- **Hamburger Menu Button**: Add an animated mobile menu button (`<button class="mobile-toggle">`) with Lucide `menu` / `x` icon in the sticky header.
- **Mobile Drawer Navigation Overlay**: Implement a smooth backdrop drawer for mobile viewports (`<= 768px`) containing all navigation links (`Home`, `Services`, `Interactive Body Map`, `Gallery & Facility`, `Clinicians`, `FAQ`) so mobile users can navigate sections effortlessly.
- **Header Actions Adaptation**: Optimize phone link and "Book Now" CTA display in the header for small screens (<= 480px) to prevent layout wrapping or overflow.

### 2. Typography & Viewport Scaling
- **Fluid Heading Sizes**: Use CSS `clamp()` and responsive font-size media rules for section titles and hero headings (preventing line overflows on 320px–390px screens).
- **iOS Safari Auto-Zoom Fix**: Ensure all form inputs, selects, and textareas use a minimum `font-size: 16px` on mobile viewports to prevent unwanted page auto-zooming on focus.

### 3. Grid Layout & Flexbox Overflow Fixes
- **Treatments & Services Grid (`.treat-grid`)**: Update `grid-template-columns` minmax from `320px` to `minmax(270px, 1fr)` to prevent horizontal scrollbars on 320px–360px mobile screens.
- **Clinicians Grid (`.team-grid`)**: Adjust `minmax` to `minmax(240px, 1fr)` on small devices.
- **Inline Booking Form (`.book-panel` & `.book-form-card`)**:
  - Collapse name input row (`grid-template-columns: 1fr 1fr`) to single column `1fr` on screens below `576px`.
  - Adjust internal padding (`52px 48px` -> `24px 16px` on mobile).
- **Footer Grid (`.footer-grid`)**: Change from 2 columns to single column (`1fr`) on screens `<= 640px` for optimal tap target spacing and readability.

### 4. Image Showcase & Interactive Component Scaling
- **Hero Image (`.hero-image-wrap img`)**: Change fixed `440px` height to responsive height (`260px–320px` on mobile) so it fits elegantly within mobile viewports.
- **Interactive Carousel (`.carousel-slide` & `.carousel-nav-btn`)**:
  - Adjust mobile slide height to `280px–320px` on `< 480px` screens.
  - Scale navigation buttons and indicators to avoid overlaying on slide text.
  - Add touch swipe support for mobile touchscreens.
- **Interactive Body Map (`.bm-graphic-wrap`)**: Scale height and font sizes for mobile screens.

### 5. Sticky Bottom Bar & Modal Dialog Alignment
- **Mobile Sticky CTA Bar (`.sticky-mobile-cta`)**: Ensure padding and bottom offset match body padding so footer links and form submit buttons remain fully accessible.
- **Booking Modal Dialog (`.modal-card`)**: Ensure max-height and scrolling behavior are optimized for short landscape mobile screens.

---

## User Review Required

> [!NOTE]
> **Zero External Dependencies & Single File Architecture**: All media queries, mobile drawer styling, and mobile toggle JavaScript handlers will be cleanly integrated directly into [index.html](file:///c:/Users/peral/Documents/flextend/index.html).

---

## Proposed Changes

### [FlexTend Core Website]

#### [MODIFY] [index.html](file:///c:/Users/peral/Documents/flextend/index.html)
- Add CSS media queries for `@media (max-width: 768px)`, `@media (max-width: 576px)`, and `@media (max-width: 380px)`.
- Implement mobile hamburger menu button and slide-out navigation drawer HTML & JS.
- Refine container padding, grid minmax bounds, heading clamps, image heights, form fields, and carousel controls.

---

## Verification Plan

### Manual Verification
1. **Responsive Viewport Testing**:
   - Inspect layout on standard mobile sizes: **360px** (Galaxy S20/Android), **375px–390px** (iPhone SE/12/13/14), **414px–430px** (iPhone Max/Plus), and **768px** (Tablet).
   - Ensure zero horizontal overflow (no sideways scrolling).
2. **Mobile Navigation Drawer Test**:
   - Tap mobile hamburger button to open drawer, verify all navigation links jump smoothly to sections, and verify drawer closes when a link or overlay backdrop is tapped.
3. **Form & Select Field Verification**:
   - Check input focus state on mobile to ensure no iOS auto-zoom occurs.
   - Verify inline booking form and modal form inputs on mobile.
4. **Carousel Touch & Buttons Test**:
   - Verify carousel buttons and indicator dots scale cleanly without obscuring text on small mobile screens.

---

## Phase 2.0 — Front-End Scale-Up, Content Refresh & SEO

The backend functionality is considered complete. This phase focuses on improving the public-facing website, strengthening patient trust, and expanding organic search reach without changing the existing booking, authentication, storage, or RLS functionality.

### 2.0.1 Content and Asset Approval

Collect and approve the source-of-truth content before implementation:

- Final hero, service, gallery, and clinician photos.
- Clinician names, biographies, and photos are intentionally excluded from the public website for privacy.
- The final list of services actually offered by the clinic.
- Real, current reviews with source, date, and permission to publish.
- Confirmed address, phone, email, opening hours, and service area.
- Final brand wording and preferred language.

Do not publish invented names, credentials, reviews, patient outcomes, or unverified statistics.

### 2.0.2 Reusable Front-End Content Model

Move public-facing content into typed, reusable data modules so the UI and SEO pages share one approved source of truth:

- `content/site.ts`
- `content/services.ts`
- `content/clinicians.ts`
- `content/reviews.ts`
- `content/faqs.ts`
- `content/conditions.ts`
- `content/media.ts`

Media records should include stable URLs, alt text, category, dimensions/aspect ratio, and ownership or credit information where applicable.

### 2.0.3 Homepage and Conversion Improvements

Refresh the public homepage in this order:

1. Replace the hero image and strengthen the value proposition and appointment CTA.
2. Reorganize services by orthopedic, neurological, pediatric, pain/mobility, and occupational therapy categories.
3. Rebuild the interactive body map with accessible labels, keyboard navigation, mobile touch controls, a list fallback, and links to relevant services or condition pages.
4. Keep the public clinician/profile section removed until the clinic explicitly approves its return.
5. Replace placeholder reviews with real, permission-approved reviews or an anonymous aggregate Google review summary.
6. Add practical patient FAQs covering appointments, therapy duration, preparation, payment, home exercises, pediatric care, and post-surgery rehabilitation.

The body map must remain educational and must not present itself as a diagnostic tool.

### 2.0.4 SEO Condition Page System

Create a reusable condition-page system:

- `/conditions`
- `/conditions/[slug]`

Each page must include:

- Unique title and meta description.
- One clear H1 and patient-friendly introduction.
- Symptoms.
- Causes.
- Diagnosis.
- Treatment and rehabilitation support.
- Benefits.
- Recovery timeline with a clear variability disclaimer.
- Related services and internal links.
- FAQs where useful.
- Book Appointment CTA using the existing booking flow.
- Medical-information disclaimer and last-reviewed date.
- Breadcrumb navigation.

Condition pages must be educational, not diagnostic or prescriptive. All medical content requires review and approval by an appropriately licensed clinician before publication.

### 2.0.5 Initial Condition URL Map

Create the following pages:

- `/conditions/fracture-rehabilitation`
- `/conditions/hip-replacement-rehabilitation`
- `/conditions/frozen-shoulder`
- `/conditions/arthritis-rehabilitation`
- `/conditions/hip-knee-back-pain`
- `/conditions/scoliosis`
- `/conditions/generalized-body-weakness`
- `/conditions/myofascial-pain-syndrome`
- `/conditions/bells-palsy`
- `/conditions/stroke-rehabilitation`
- `/conditions/spinal-cord-injury`
- `/conditions/traumatic-brain-injury`
- `/conditions/parkinsons-disease`
- `/conditions/progressive-supranuclear-palsy`
- `/conditions/multiple-sclerosis`
- `/conditions/guillain-barre-syndrome`
- `/conditions/amyotrophic-lateral-sclerosis`
- `/conditions/cerebral-palsy`
- `/conditions/global-developmental-delay`

Total and partial hip replacement rehabilitation will initially share one comprehensive page. Parkinson’s disease and progressive supranuclear palsy will have separate pages because they require distinct, condition-specific information.

Build and approve one complete pilot page first, then reuse the approved template for the remaining pages. Avoid thin or near-duplicate pages.

### 2.0.6 Technical SEO Foundation

Implement:

- Page-specific metadata and canonical URLs.
- `metadataBase`, Open Graph, and social preview data.
- `sitemap.ts` containing all public condition routes.
- `robots.ts`.
- Breadcrumb structured data.
- Appropriate medical-condition structured data.
- FAQ structured data only for visible, accurate FAQs.
- Internal links between services, conditions, clinicians, FAQs, and booking.
- Search Console submission after deployment.

### 2.0.7 Phase 2.0 Verification

Before release, verify:

1. All images load correctly, have meaningful alt text, and do not cause layout shifts.
2. Homepage and condition-page CTAs open the working booking flow.
3. Body map works with mouse, keyboard, touch, and the mobile fallback list.
4. The public clinician section and clinician images remain removed for privacy.
5. Services, reviews, business information, and medical content are approved.
6. Every condition page has unique metadata, a canonical URL, an H1, all required sections, internal links, a disclaimer, and a booking CTA.
7. No broken links, placeholder content, fabricated claims, or duplicate pages remain.
8. Mobile, accessibility, performance, sitemap, robots, and structured-data checks pass.
9. `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass successfully.
