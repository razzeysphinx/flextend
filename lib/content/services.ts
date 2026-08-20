export type ServiceCategory = "pt" | "ot" | "peds" | "neuro" | "specialized";

export interface RelatedCondition {
  slug: string;
  label: string;
}

export interface ServiceContent {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
  image: string;
  relatedConditions: RelatedCondition[];
}

export const services: ServiceContent[] = [
  {
    id: "pt",
    category: "pt",
    categoryLabel: "Physical Therapy",
    title: "Orthopedic & Musculoskeletal Rehabilitation",
    badge: "Physical Therapy",
    description:
      "Individualized physical therapy for movement limitations, pain, injury recovery, post-surgical rehabilitation, and everyday mobility goals.",
    features: [
      "Mobility, strength, balance, and gait training",
      "Fracture and joint-replacement rehabilitation",
      "Spine, back, shoulder, hip, and knee support",
      "Personalized home exercise and activity planning",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "fracture-rehabilitation", label: "Fracture Rehabilitation" },
      { slug: "hip-replacement-rehabilitation", label: "Hip Replacement" },
      { slug: "frozen-shoulder", label: "Frozen Shoulder" },
      { slug: "arthritis-rehabilitation", label: "Arthritis" },
      { slug: "hip-knee-back-pain", label: "Hip, Knee and Back Pain" },
      { slug: "scoliosis", label: "Scoliosis" },
      { slug: "myofascial-pain-syndrome", label: "Myofascial Pain Syndrome" },
      { slug: "generalized-body-weakness", label: "Generalized Body Weakness" },
    ],
  },
  {
    id: "ot",
    category: "ot",
    categoryLabel: "Occupational Therapy",
    title: "Occupational Therapy & Daily-Activity Retraining",
    badge: "Occupational Therapy",
    description:
      "Practical therapy to support independence, upper-extremity function, daily activities, work or school tasks, and safe participation at home.",
    features: [
      "Self-care and Activities of Daily Living training",
      "Hand, upper-extremity, and fine-motor rehabilitation",
      "Cognitive, routine, and task-participation strategies",
      "Home, school, work, and caregiver education",
    ],
    image:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "stroke-rehabilitation", label: "Stroke" },
      { slug: "traumatic-brain-injury", label: "Traumatic Brain Injury" },
      { slug: "parkinsons-disease", label: "Parkinson's Disease" },
      { slug: "progressive-supranuclear-palsy", label: "Progressive Supranuclear Palsy" },
      { slug: "multiple-sclerosis", label: "Multiple Sclerosis" },
      { slug: "guillain-barre-syndrome", label: "Guillain-Barré Syndrome" },
      { slug: "amyotrophic-lateral-sclerosis", label: "ALS" },
      { slug: "cerebral-palsy", label: "Cerebral Palsy" },
      { slug: "global-developmental-delay", label: "Global Developmental Delay" },
    ],
  },
  {
    id: "peds",
    category: "peds",
    categoryLabel: "Pediatric Rehabilitation",
    title: "Pediatric Physical & Occupational Therapy",
    badge: "Pediatric Care",
    description:
      "Play-based, family-centered therapy supporting movement, coordination, daily skills, participation, and age-appropriate developmental goals.",
    features: [
      "Developmental motor and participation support",
      "Cerebral palsy and neuromotor rehabilitation",
      "Play-based balance, coordination, and strength activities",
      "Family coaching for home and school routines",
    ],
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "cerebral-palsy", label: "Cerebral Palsy" },
      { slug: "global-developmental-delay", label: "Global Developmental Delay" },
      { slug: "scoliosis", label: "Scoliosis" },
    ],
  },
  {
    id: "neuro",
    category: "neuro",
    categoryLabel: "Neurological Rehabilitation",
    title: "Neurological Rehabilitation",
    badge: "Neurological Care",
    description:
      "Goal-oriented rehabilitation supporting movement, balance, transfers, walking, endurance, daily activities, and participation after neurological change.",
    features: [
      "Movement, balance, gait, and transfer training",
      "Fall-risk, fatigue, and energy-management strategies",
      "Neurological daily-activity and caregiver support",
      "Coordination with the person’s medical care team",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "bells-palsy", label: "Bell's Palsy" },
      { slug: "stroke-rehabilitation", label: "Stroke" },
      { slug: "spinal-cord-injury", label: "Spinal Cord Injury" },
      { slug: "traumatic-brain-injury", label: "Traumatic Brain Injury" },
      { slug: "parkinsons-disease", label: "Parkinson's Disease" },
      { slug: "progressive-supranuclear-palsy", label: "Progressive Supranuclear Palsy" },
      { slug: "multiple-sclerosis", label: "Multiple Sclerosis" },
      { slug: "guillain-barre-syndrome", label: "Guillain-Barré Syndrome" },
      { slug: "amyotrophic-lateral-sclerosis", label: "ALS" },
    ],
  },
  {
    id: "sports",
    category: "specialized",
    categoryLabel: "Return to Activity",
    title: "Sports & Return-to-Activity Rehabilitation",
    badge: "Active Recovery",
    description:
      "Progressive rehabilitation for returning to exercise, sport, work, and other meaningful activities after injury or reduced activity.",
    features: [
      "Strength, mobility, and movement retraining",
      "Gradual return-to-activity planning",
      "Knee, hip, shoulder, and fracture recovery support",
      "Education for sustainable activity progression",
    ],
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "fracture-rehabilitation", label: "Fracture Rehabilitation" },
      { slug: "arthritis-rehabilitation", label: "Arthritis" },
      { slug: "hip-knee-back-pain", label: "Hip, Knee and Back Pain" },
    ],
  },
  {
    id: "myofascial",
    category: "specialized",
    categoryLabel: "Pain & Myofascial Care",
    title: "Myofascial Pain & Movement Rehabilitation",
    badge: "Targeted Support",
    description:
      "A clinician-led rehabilitation option for selected muscle and movement-related concerns, combining assessment, education, exercise, and appropriate hands-on care.",
    features: [
      "Movement and muscle-load assessment",
      "Mobility, strengthening, and activity education",
      "Manual therapy or dry needling when appropriate",
      "Home strategies for sustainable self-management",
    ],
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
    relatedConditions: [
      { slug: "myofascial-pain-syndrome", label: "Myofascial Pain Syndrome" },
      { slug: "frozen-shoulder", label: "Frozen Shoulder" },
      { slug: "hip-knee-back-pain", label: "Hip, Knee and Back Pain" },
    ],
  },
];
