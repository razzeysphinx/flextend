# Implementation Plan — FlexTend PT Website Redesign & Carousel Integration

Redesign the **FlexTend Physical Therapy Clinic** website (`FLEXTEND REVISED 2.html`) to adopt the **Emerald Ink & Champagne** 6-color palette, modern healthcare design aesthetics (inspired by the provided UI mockups), and Shadcn-style UI components including an interactive image showcase Carousel.

## 6-Color Palette Specification

| Role | Color Name | Hex Code | Usage |
|---|---|---|---|
| **Darkest** | Deep Forest | `#032D22` | Hero dark banner, dark cards, footer, primary dark typography |
| **Primary** | Emerald Ink | `#064E3B` | Main brand color, header CTA buttons, primary section backgrounds |
| **Highlight** | Jade | `#2E9B7C` | Accents, active indicators, hover highlights, success badges |
| **Light** | Champagne | `#F8E7C9` | Section background tint, card background surfaces, subtle fills |
| **Metallic** | Antique Gold | `#C9A24B` | Badge accents, star ratings, premium callouts, icon highlights |
| **Accent** | Terracotta | `#C1663F` | Secondary CTA buttons, interactive hover elements, arrow links |
| *Body Light* | Off-White Champagne | `#FAF7F2` | Main page background |

---

## Proposed Key Features & Components

### 1. Header & Navigation (Shadcn Navbar Style)
- Glassmorphism sticky header with Deep Forest/Emerald Ink branding.
- Navigation links: Home, Services, About Us, Clinicians, Gallery, FAQ, Contact.
- Action CTA: "Book Appointment" (Emerald Ink rounded pill button) + Quick Phone call button.

### 2. Hero Section with Quick Booking Widget
- Soft Champagne & Jade gradient hero background (`#FAF7F2` → `#F8E7C9`).
- Headline: *"You'll Love the Way We Care for You — Improving Lives Together"*.
- Subtitle highlighting evidence-based physical & occupational therapy in Lipa City, Batangas.
- **Shadcn Quick Booking Bar**: Floating container with Service Select, Location Select, Date Picker, and "Make An Appointment" CTA button.
- Hero Image: Professional healthcare & physical therapy team.

### 3. Dark Emerald Experience Banner
- Deep Forest (`#032D22`) full-width or rounded banner.
- Highlighting over 25 years of combined clinical experience, licensed therapists, and 48-hour new patient guarantee.

### 4. Interactive Image Showcase Carousel (Shadcn Carousel Component)
- Custom-built, responsive touch-swipe and button-navigated carousel for clinic gallery.
- Showcase categories: *Clinic Facilities*, *Rehabilitation Area*, *Advanced Equipment*, and *Patient Care*.
- Interactive prev/next arrows, slide indicators/dots, caption overlays, and category filter tabs.

### 5. Services & Specialties Grid (Shadcn Cards)
- Modern cards with Champagne (`#F8E7C9`) surface, custom icons, title, description, and "Discover More ->" links with Terracotta hover state.
- Covers Physical Therapy, Occupational Therapy, Sports Rehab, Pediatric PT, Geriatric Therapy, Neurological PT, and Orthopedic Care.

### 6. Licensed Clinicians / Team Section
- Profile cards for therapists with photos, names, titles (e.g., Senior Physical Therapist, Licensed Occupational Therapist), credentials, and booking links.

### 7. Interactive Booking Dialog (Shadcn Modal Component)
- Modal dialog for appointment requests with service, date, time slot, contact info, and confirmation feedback.

### 8. FAQ Accordion (Shadcn Accordion)
- Smooth expanding/collapsing questions regarding referrals, insurance, first visit expectations, and clinic hours.

---

## User Review Required

> [!IMPORTANT]
> **Single File HTML Architecture**: The website is contained within [FLEXTEND REVISED 2.html](file:///c:/Users/peral/Documents/flextend/FLEXTEND%20REVISED%202.html). All CSS variables, Shadcn UI component styles, icons, and carousel JavaScript logic will be self-contained within this file to ensure zero external build step dependencies and instant browser playability.

---

## Proposed Changes

### [FlexTend Core Website]

#### [MODIFY] [FLEXTEND REVISED 2.html](file:///c:/Users/peral/Documents/flextend/FLEXTEND%20REVISED%202.html)
- Replace outdated CSS tokens with the **Emerald Ink & Champagne** 6-color system (`#032D22`, `#064E3B`, `#2E9B7C`, `#F8E7C9`, `#C9A24B`, `#C1663F`).
- Update Hero layout to match the healthcare UI style image (headline, subtext, floating appointment selector bar, hero clinician image).
- Implement the Dark Forest (`#032D22`) clinic feature banner.
- Add the **Shadcn Carousel Component** showcasing clinic facility images, therapy rooms, equipment, and patient care with slide navigation & tab filtering.
- Implement Shadcn-style Card, Select, Badge, Button, Modal Dialog, and Accordion components.
- Add mobile sticky CTA bar for one-tap calling (`+63-967-195-6863`), texting, and booking.

---

## Verification Plan

### Manual Verification
1. **Visual Style & Color Palette Check**:
   - Verify all 6 colors (`#032D22`, `#064E3B`, `#2E9B7C`, `#F8E7C9`, `#C9A24B`, `#C1663F`) are applied correctly across header, hero, cards, buttons, badges, and carousel.
2. **Carousel Component Verification**:
   - Test Previous/Next slide buttons, indicator dots, category filter tabs, and slide transition smoothness.
3. **Interactive Components Check**:
   - Test Shadcn Quick Booking bar selection and "Book Now" modal dialog popup.
   - Test FAQ accordion open/close animations.
4. **Responsive Layout Check**:
   - Test viewport widths: Desktop (1280px+), Tablet (768px), and Mobile (375px).
   - Ensure sticky mobile CTA bar functions on smaller screens.
