export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What's the difference between physical therapy and occupational therapy?",
    answer:
      "Physical therapy (PT) focuses on restoring movement, strength, and physical function — walking, balance, mobility. Occupational therapy (OT) focuses on the skills needed for daily life and independence — dressing, cooking, writing, work tasks, fine motor control. Many patients receive both, especially after stroke, surgery, or injury.",
  },
  {
    question: "How long does each session last?",
    answer:
      "Most PT and OT sessions run 45–60 minutes, though initial evaluations may take slightly longer.",
  },
  {
    question: "How many sessions will I need?",
    answer:
      "This varies by condition and severity, but many patients see noticeable progress within 6–12 sessions. Your therapist will give you a more specific estimate after your evaluation.",
  },
  {
    question: "At what age can a child start occupational therapy?",
    answer:
      "OT can begin in infancy if developmental concerns are identified, though it's most commonly started in toddler and early school years for delays in motor skills, sensory processing, or behavior.",
  },
  {
    question: "Do you treat older adults differently than younger patients?",
    answer:
      "Yes. Geriatric rehabilitation places extra emphasis on balance, fall prevention, and functional independence, with treatment paced according to the patient's overall health and mobility.",
  },
  {
    question: "Do you offer therapy for post-surgical recovery?",
    answer:
      "Yes, we support recovery following a range of procedures, coordinating closely with your surgeon's timeline and guidelines.",
  },
  {
    question: "Is therapy safe for chronic or progressive conditions?",
    answer:
      "Yes. Treatment plans are carefully tailored to your specific diagnosis and current abilities, with intensity and technique adjusted to what's safe and effective for your condition.",
  },
];
