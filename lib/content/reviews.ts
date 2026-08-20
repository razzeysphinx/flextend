export interface PatientReview {
  id: string;
  name: string;
  location?: string;
  service?: string;
  rating: number;
  quote: string;
  source?: string;
  date?: string;
  consentConfirmed: boolean;
}

/**
 * Only add a review here after it has been verified, dated, and approved for
 * publication. The empty list intentionally prevents placeholder testimonials
 * from being presented as real patient experiences.
 */
export const publishedReviews: PatientReview[] = [];
