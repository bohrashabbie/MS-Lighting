// ============================================================================
// Customer feedback — real HTML content, never baked into video pixels, so it
// stays selectable, translatable, indexable by search engines and readable to
// screen readers.
//
// ⚠️ PLACEHOLDER COPY. Replace `quote`, `author`, `role` and `location` with
// genuine, attributable client feedback before this goes in front of anyone.
// Inventing testimonials is a legal and trust risk — these exist only so the
// section has shape while you collect the real ones. Delete any you can't
// source; the section hides itself if the list is empty.
// ============================================================================

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  /** Optional project this refers to, shown as a small tag. */
  project?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They specified the whole retail rollout for us — fixture schedules, quantities and the SASO paperwork — and every store opened on time. One point of contact for four countries made it simple.",
    author: "— placeholder —",
    role: "Procurement Lead",
    location: "Kuwait",
    project: "Retail rollout",
  },
  {
    quote:
      "The colour rendering on the display lighting is the best we've had. Merchandise finally looks the way it does in the lookbook, and the beams sit exactly where we set them.",
    author: "— placeholder —",
    role: "Store Design Manager",
    location: "Dubai, UAE",
    project: "Flagship showroom",
  },
  {
    quote:
      "We handed over the reflected ceiling plan and got back photometrics, a fixture list and the certifications our consultant needed. It took a week off the tender.",
    author: "— placeholder —",
    role: "MEP Consultant",
    location: "Jiangmen, China",
    project: "Office fit-out",
  },
];

/** Headline proof points for the testimonials band. Confirm before publishing. */
export const PROOF = [
  { value: "500+", label: "Projects delivered" },
  { value: "4", label: "Countries served" },
  { value: "50+", label: "Brand partners" },
  { value: "15+", label: "Years of lighting" },
];
