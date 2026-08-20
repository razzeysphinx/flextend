export interface BodyRegion {
  num: string;
  id: string;
  title: string;
  regionLabel: string;
  desc: string;
  conditions: string[];
  conditionLinks: Array<{ slug: string; label: string }>;
  coords: { top: string; left: string };
}

export const bodyRegions: BodyRegion[] = [
  {
    num: "01",
    id: "head_neck",
    title: "Head, Neck & Cervical Spine",
    regionLabel: "Neck and upper spine",
    desc: "Explore movement and rehabilitation topics involving neck mobility, posture, and the upper spine.",
    conditions: ["Neck stiffness", "Postural strain", "Cervical pain", "Jaw-related concerns"],
    conditionLinks: [
      { slug: "bells-palsy", label: "Bell's Palsy" },
      { slug: "stroke-rehabilitation", label: "Stroke" },
      { slug: "traumatic-brain-injury", label: "Traumatic Brain Injury" },
      { slug: "parkinsons-disease", label: "Parkinson's Disease" },
      { slug: "progressive-supranuclear-palsy", label: "Progressive Supranuclear Palsy" },
    ],
    coords: { top: "7%", left: "71%" },
  },
  {
    num: "02",
    id: "upper_back",
    title: "Shoulder & Upper Back",
    regionLabel: "Shoulder and upper back",
    desc: "Learn about assessment and rehabilitation options for shoulder movement, upper-back comfort, and posture.",
    conditions: ["Frozen shoulder", "Shoulder stiffness", "Rotator-cuff concerns", "Upper-back pain"],
    conditionLinks: [
      { slug: "frozen-shoulder", label: "Frozen Shoulder" },
      { slug: "myofascial-pain-syndrome", label: "Myofascial Pain Syndrome" },
    ],
    coords: { top: "20%", left: "27%" },
  },
  {
    num: "03",
    id: "lumbar_spine",
    title: "Lower Back & Lumbar Spine",
    regionLabel: "Lower back",
    desc: "Explore movement-focused care for lower-back pain, spinal mobility, strength, and activity tolerance.",
    conditions: ["Low-back pain", "Sciatica symptoms", "Lumbar stiffness", "Core weakness"],
    conditionLinks: [
      { slug: "hip-knee-back-pain", label: "Hip, Knee and Back Pain" },
      { slug: "scoliosis", label: "Scoliosis" },
      { slug: "spinal-cord-injury", label: "Spinal Cord Injury" },
    ],
    coords: { top: "42%", left: "25%" },
  },
  {
    num: "04",
    id: "shoulder_chest",
    title: "Anterior Shoulder",
    regionLabel: "Front of shoulder",
    desc: "Review common shoulder movement concerns and how a clinician may assess strength, mobility, and function.",
    conditions: ["Shoulder pain", "Limited overhead reach", "Shoulder weakness", "Post-injury stiffness"],
    conditionLinks: [
      { slug: "fracture-rehabilitation", label: "Fracture Rehabilitation" },
    ],
    coords: { top: "19%", left: "65%" },
  },
  {
    num: "05",
    id: "abdomen_core",
    title: "Core & Lumbo-Pelvic Region",
    regionLabel: "Core and trunk",
    desc: "Explore rehabilitation topics related to trunk control, balance, functional strength, and safe movement.",
    conditions: ["Core weakness", "Balance limitations", "Post-surgical deconditioning", "Movement coordination"],
    conditionLinks: [
      { slug: "generalized-body-weakness", label: "Generalized Body Weakness" },
      { slug: "amyotrophic-lateral-sclerosis", label: "Amyotrophic Lateral Sclerosis" },
    ],
    coords: { top: "40%", left: "71%" },
  },
  {
    num: "06",
    id: "wrist_hand",
    title: "Wrist, Hand & Upper Extremity",
    regionLabel: "Hand and wrist",
    desc: "Learn how occupational or physical therapy may support hand use, upper-extremity movement, and daily tasks.",
    conditions: ["Hand stiffness", "Wrist pain", "Grip weakness", "Fine-motor difficulty"],
    conditionLinks: [
      { slug: "global-developmental-delay", label: "Global Developmental Delay" },
    ],
    coords: { top: "51%", left: "55%" },
  },
  {
    num: "07",
    id: "knee_joint",
    title: "Knee & Quadriceps",
    regionLabel: "Knee",
    desc: "Explore rehabilitation for knee mobility, strength, balance, and gradual return to daily or sporting activity.",
    conditions: ["Knee pain", "Post-operative recovery", "Knee stiffness", "Strength loss"],
    conditionLinks: [
      { slug: "hip-replacement-rehabilitation", label: "Total and Partial Hip Replacement" },
      { slug: "arthritis-rehabilitation", label: "Arthritis" },
    ],
    coords: { top: "74%", left: "69%" },
  },
  {
    num: "08",
    id: "ankle_foot",
    title: "Ankle, Foot & Achilles",
    regionLabel: "Ankle and foot",
    desc: "Review movement and rehabilitation topics involving walking, ankle mobility, foot loading, and balance.",
    conditions: ["Ankle sprain", "Foot pain", "Plantar-fascia symptoms", "Gait changes"],
    conditionLinks: [
      { slug: "multiple-sclerosis", label: "Multiple Sclerosis" },
      { slug: "guillain-barre-syndrome", label: "Guillain-Barré Syndrome" },
      { slug: "cerebral-palsy", label: "Cerebral Palsy" },
    ],
    coords: { top: "95%", left: "71%" },
  },
];
