// ============================================================================
// Lighting knowledge base — the editorial layer of the site.
//
// SPEC_LITERACY teaches the four numbers that decide whether a fixture is right
// for a room. INSIGHTS are longer-form positions with outbound citations, so a
// specifier can check the claim rather than take our word for it.
// ============================================================================

export interface SpecTerm {
  code: string;
  term: string;
  question: string;
  body: string;
  /** Rule-of-thumb values, rendered as a scale. */
  scale: { label: string; note: string }[];
}

export const SPEC_LITERACY: SpecTerm[] = [
  {
    code: "CRI",
    term: "Colour Rendering Index",
    question: "Will colours look true?",
    body:
      "CRI scores how faithfully a light source reveals colour against natural daylight, which sits at 100. Anything at 80 or above is acceptable for circulation and street lighting; retail, galleries and hospitality want 90+, and the R9 sub-score matters most because it governs reds — skin, timber, wine, meat.",
    scale: [
      { label: "80–89", note: "Standard — corridors, exterior, street" },
      { label: "90–94", note: "Architectural — offices, hotels, homes" },
      { label: "95+ · R9>50", note: "Critical colour — retail, galleries" },
    ],
  },
  {
    code: "CCT",
    term: "Correlated Colour Temperature",
    question: "How warm is the light?",
    body:
      "Measured in Kelvin, CCT describes the appearance of the white — not its brightness. Low numbers read warm and amber, high numbers read cool and blue. Tunable-white fixtures sweep roughly 2700K to 6500K on a single address, letting one luminaire follow the working day instead of committing to one mood.",
    scale: [
      { label: "2700–3000K", note: "Warm — hospitality, residential" },
      { label: "3500–4000K", note: "Neutral — offices, education" },
      { label: "5000–6500K", note: "Cool — industrial, task, clinical" },
    ],
  },
  {
    code: "UGR",
    term: "Unified Glare Rating",
    question: "Will it hurt to sit under?",
    body:
      "UGR models the discomfort a luminaire causes at seated eye height in an interior. It is an indoor metric only — it says nothing about exterior fixtures or daylight. Workplaces with screens are specified at UGR under 19; anything above 22 will be felt within an hour and complained about within a week.",
    scale: [
      { label: "< 16", note: "Precision — drafting, inspection" },
      { label: "< 19", note: "Screen work — offices, classrooms" },
      { label: "< 22", note: "General — circulation, retail floor" },
    ],
  },
  {
    code: "IP",
    term: "Ingress Protection",
    question: "Will it survive outside?",
    body:
      "Two digits: the first rates solids, the second water. In the Gulf the dust digit does the heavy lifting — IP6x is dust-tight, which matters more than most exterior schedules assume. Add coastal salt and the housing alloy and gasket compound decide the fixture's real service life, not the rating on the datasheet.",
    scale: [
      { label: "IP20", note: "Indoor, dry — recessed, track" },
      { label: "IP65", note: "Dust-tight, jets — façade, wall" },
      { label: "IP67", note: "Immersion — in-ground, lawn" },
    ],
  },
];

export interface Insight {
  kicker: string;
  title: string;
  body: string;
  readTime: string;
  source: { label: string; href: string };
}

export const INSIGHTS: Insight[] = [
  {
    kicker: "Controls",
    title: "DALI-2, 0–10V or wireless mesh?",
    body:
      "DALI-2 earns its wiring on large, mission-critical projects: every driver is individually addressable, so zones, schedules and fault diagnostics change in software rather than in the ceiling. 0–10V remains the honest choice for simple zones and straight retrofits. Wireless Bluetooth mesh — Casambi and increasingly Matter over Thread — wins on phased rollouts where pulling a control pair is the whole cost.",
    readTime: "4 min",
    source: { label: "Casambi · DALI controls", href: "https://casambi.com/dali-controls/" },
  },
  {
    kicker: "Wellbeing",
    title: "Human-centric lighting, minus the marketing",
    body:
      "Tunable white supports circadian rhythm by shifting correlated colour temperature across the day — cooler and brighter through the morning, warmer and lower after mid-afternoon. Under DALI it rides a single address as device type 8 (DT8). The effect is real, but it depends on intensity at the eye and timing, not on the colour temperature alone.",
    readTime: "5 min",
    source: { label: "Tunable white & circadian guide", href: "https://www.beeslighting.com/blogs/ideas-advice-blog/circadian-lighting-tunable-white-wellness-guide" },
  },
  {
    kicker: "Retail",
    title: "Why R9 decides your merchandising",
    body:
      "A fixture can post CRI 90 and still render reds flatly, because general CRI averages eight pastel samples and never tests saturated red. R9 is that missing test. For fashion, cosmetics, butchery and any interior with warm timber, specify R9 above 50 and hold the accent-to-ambient contrast around 3:1 so the eye is led rather than flooded.",
    readTime: "3 min",
    source: { label: "Retail spec guide · CRI, CCT, beam", href: "https://www.br-lighting.com.cn/retail-lighting-specification-guide-cri-cct-and-beam-angle-by-store-type/" },
  },
  {
    kicker: "Datasheets",
    title: "Reading a datasheet like a specifier",
    body:
      "Efficacy in lumens per watt should be quoted for the system, not the bare LED chip, or the driver loss is quietly yours. Lifetime is meaningless without its qualifier: L80 at 50,000 hours means 80% of initial output survives that long, at a stated ambient. Check the ambient. A fixture rated at 25°C behaves differently on a Kuwaiti roof in July.",
    readTime: "6 min",
    source: { label: "LED product specifications", href: "https://www.ledlightingsupply.com/blog/led-product-specifications-important-points-to-watch" },
  },
];

/** WAC-style value keywords for the brand strip. */
export const VALUES = ["Innovative", "Precise", "Certified", "Efficient", "Reliable"] as const;

// ============================================================================
// Recommended maintained illuminance by space, per EN 12464-1 (the European
// workplace-lighting standard specifiers design to). Grouped so the table reads
// as three columns. Values are the standard's maintained lux (Em).
// ============================================================================
export interface LuxGroup {
  group: string;
  rows: { space: string; lux: string }[];
}

export const LUX_LEVELS: LuxGroup[] = [
  {
    group: "Workplace",
    rows: [
      { space: "Circulation & corridors", lux: "100" },
      { space: "Computer workstation", lux: "300" },
      { space: "General office work", lux: "500" },
      { space: "Meeting rooms", lux: "300" },
      { space: "Technical drawing", lux: "750" },
    ],
  },
  {
    group: "Retail",
    rows: [
      { space: "Sales area", lux: "300" },
      { space: "Checkout / till", lux: "500" },
      { space: "Feature display", lux: "750–1000" },
      { space: "Fitting rooms", lux: "300" },
      { space: "Storerooms", lux: "150" },
    ],
  },
  {
    group: "Industrial",
    rows: [
      { space: "Storage racking", lux: "150" },
      { space: "Loading bays", lux: "150" },
      { space: "Picking / packing", lux: "300" },
      { space: "Assembly, medium", lux: "500" },
      { space: "Inspection", lux: "750–1000" },
    ],
  },
];

export const LUX_SOURCE = {
  label: "EN 12464-1 · indoor workplace lighting",
  href: "https://calderelectricalservices.co.uk/en-12464-1-for-offices-shops-schools/",
};

// ============================================================================
// Certification marks. The hero claims "CE · RoHS · CB · SASO" — this explains
// what each guarantees, with the Gulf-import context (SASO IECEE + G-Mark) a
// buyer in Kuwait/UAE/KSA actually needs to clear customs.
// ============================================================================
export interface Certification {
  mark: string;
  name: string;
  body: string;
  scope: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    mark: "CE",
    name: "Conformité Européenne",
    body: "Declares the fixture meets EU safety, health and electromagnetic-compatibility directives. The baseline mark for electrical goods and the reference most other schemes build on.",
    scope: "Safety · EMC",
  },
  {
    mark: "RoHS",
    name: "Restriction of Hazardous Substances",
    body: "Certifies the product is free of lead, mercury, cadmium and other restricted materials above trace limits — required as a report or declaration for onward IECEE registration.",
    scope: "Materials",
  },
  {
    mark: "CB",
    name: "IECEE CB Scheme",
    body: "An internationally recognised test report and certificate issued against IEC standards, so a single set of tests is accepted across member countries instead of re-testing per market.",
    scope: "Global · IEC",
  },
  {
    mark: "SASO",
    name: "Saudi Standards (IECEE + EER)",
    body: "Mandatory for lighting entering Saudi Arabia since 2019 — combines the IECEE safety recognition with an energy-efficiency label covering lifetime, lumen maintenance, CRI and power factor.",
    scope: "Saudi import",
  },
  {
    mark: "G-Mark",
    name: "Gulf Conformity Mark",
    body: "The GCC-wide conformity mark required across Saudi Arabia, Kuwait, the UAE, Qatar, Oman and Bahrain. Regulated products must carry it to be sold anywhere in the Gulf market.",
    scope: "GCC-wide",
  },
];

export const CERT_SOURCE = {
  label: "SASO IECEE & Gulf market access",
  href: "https://www.ul.com/news/saudi-arabia-market-access-new-requirements-lighting-products-saso-iecee-and-saso-ee",
};
