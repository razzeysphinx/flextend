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
