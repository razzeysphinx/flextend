import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "FlexTend Physical Therapy Clinic — Lipa City, Batangas",
  description:
    "FlexTend Physical Therapy & Occupational Therapy Clinic in Lipa City, Batangas. Evidence-based care, licensed clinicians, new patients seen within 48 hours.",
  keywords: [
    "Physical Therapy Lipa City",
    "Occupational Therapy Batangas",
    "FlexTend PT Clinic",
    "Pediatric Rehabilitation Lipa",
    "Dry Needling Batangas",
    "Stroke Rehab Lipa City",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhysicalTherapy",
  name: "FlexTend Physical Therapy Clinic",
  description:
    "Evidence-based physical and occupational therapy in Lipa City, Batangas by licensed clinicians.",
  telephone: "+63-967-195-6863",
  email: "flextendtherapy2024@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "299 San Jose Subdivision, Balagbag, Brgy. San Sebastian",
    addressLocality: "Lipa City",
    addressRegion: "Batangas",
    postalCode: "4217",
    addressCountry: "PH",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "16:00",
    },
  ],
  medicalSpecialty: [
    "Physical Therapy",
    "Occupational Therapy",
    "Pediatric Rehabilitation",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#0A1C16] font-body flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
