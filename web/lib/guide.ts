// ============================================================================
// Category landing guides — the WAC-style educational layer under each family
// grid. Three collapsible sections per family: what it is, where it works,
// and how to specify it. Copy is generic lighting-design knowledge keyed off
// the family slug; nothing here makes claims about specific MS models.
// ============================================================================
import { sectionOf } from "./sections";

export interface GuideItem {
  title: string;
  body: string;
}

/** slug keyword → tailored "about" + "where" copy */
const TYPES: { match: RegExp; about: string; where: string }[] = [
  {
    match: /down-light/,
    about:
      "Downlights are the workhorse of architectural interiors — a compact source recessed into or mounted onto the ceiling, aimed straight down to build the room's ambient layer. Recessed versions disappear into the plane for the cleanest ceiling; surface-mounted versions deliver the same optic where the ceiling void is too shallow to cut into.",
    where:
      "Corridors, hotel rooms, residences, offices and retail floors — anywhere a calm, even base layer is needed. Space fixtures roughly one ceiling-height apart for uniform coverage, tighter over task areas. Pair a low-glare trim with wall washing to keep vertical surfaces bright and the room feeling larger.",
  },
  {
    match: /grille|spot/,
    about:
      "Spotlights are accent instruments: a controlled beam that pulls objects out of the ambient layer. Grille and multi-head versions group two or three adjustable sources behind one trim, so a run of accents reads as a single architectural element rather than a scatter of holes.",
    where:
      "Retail displays, artwork, feature walls, dining tables and shelving. Aim for an accent-to-ambient contrast of around 3:1 — enough to lead the eye without theatrical hotspots. Adjustable gimbals let the scheme evolve after handover; keep aiming angles under 30° off vertical to avoid glare.",
  },
  {
    match: /track/,
    about:
      "Track puts light on a circuit you can rearrange. Heads clip anywhere along the rail, aim in any direction, and move when the room changes — no rewiring, no new ceiling cuts. It is the fastest way to give a space a flexible accent layer.",
    where:
      "Galleries, boutiques, showrooms and hospitality — any interior that re-merchandises or re-hangs regularly. Run track parallel to the walls it lights, about 800–1000 mm off the wall for typical ceiling heights, and specify one spare head per run so the scheme can grow.",
  },
  {
    match: /magnet/,
    about:
      "Magnetic track is the modular evolution of the rail: a low-voltage channel that recesses flush, surface-mounts or suspends, with spots, floods, linear diffuse and pendant modules that snap in by magnet. One slim black line in the ceiling carries the whole lighting scheme.",
    where:
      "Contemporary residences, offices and retail where the ceiling should read as a single graphic line. Mix module types on one run — diffuse linear for the ambient layer, spots for accents — and reconfigure by hand in seconds. Recess the channel in plasterboard for the fully trimless look.",
  },
  {
    match: /panel/,
    about:
      "Panels turn the whole fixture face into the source — a broad, evenly luminous plane that delivers high lumen packages with low luminance. Edge-lit and back-lit constructions keep the profile thin enough for shallow plenums and modular ceiling grids.",
    where:
      "Open-plan offices, classrooms, clinics and back-of-house — spaces specified to a uniform lux level with UGR below 19 for screen work. Recessed panels drop into standard grid modules; surface frames carry the same optic onto concrete soffits.",
  },
  {
    match: /linear/,
    about:
      "Linear fixtures draw light as a continuous line — recessed, surface or suspended — with seamless joins, corners and end caps that let the run follow the architecture. Diffused optics keep the line unbroken; louvred versions add task-grade glare control.",
    where:
      "Offices, reception desks, supermarkets and coves. Suspend direct/indirect runs over workstations to light the desk and lift the ceiling at once; tuck cove profiles above joinery to graze walls with soft light. Order runs to a drawing so joins land where the design needs them.",
  },
  {
    match: /ceiling-light/,
    about:
      "Surface ceiling fixtures deliver the downlight optic where recessing isn't an option — concrete soffits, heritage fabric, or plenums already full of services. The housing becomes a visible cylinder or disc, so its proportions and finish matter as much as its optics.",
    where:
      "Lobbies, stairwells, balconies and exposed-structure interiors. Use consistent diameters and finishes across a project so surface fixtures read as an intentional family, not a compromise. Cylinder forms suit double-height spaces; slim discs sit comfortably in corridors.",
  },
  {
    match: /high-bay/,
    about:
      "High bays are engineered for altitude: concentrated lumen packages, tight thermal management and optics that push usable light down from 6 to 15 metres of mounting height. Modern LED high bays cut energy and maintenance dramatically against the discharge lamps they replace.",
    where:
      "Warehouses, production floors, logistics hubs and sports halls. Racking aisles want narrow distributions aligned to the aisle; open floors want wide beams on a regular grid. Design to 150–300 lux for storage and picking, 500 for assembly, with occupancy dimming where aisles sit empty.",
  },
  {
    match: /module/,
    about:
      "Module series are the light engines behind the trims — standardised LED, optic and heat-sink assemblies that drop into compatible housings. Specifying the module separately lets one engine serve many apertures, simplifying maintenance and future upgrades.",
    where:
      "Projects that value serviceability: hotels and commercial interiors where trims vary room to room but the engine, driver and spare-parts list stay common. Confirm module-to-housing compatibility and driver current at specification, not on site.",
  },
  {
    match: /wall-light/,
    about:
      "Outdoor wall fixtures shape a building after dark — grazing texture, washing planes, or throwing controlled up/down beams that turn a façade into composition. Sealed IP65+ housings in marine-grade finishes are what separate a five-year fixture from a two-summer one.",
    where:
      "Façades, entrances, terraces and boundary walls. Up/down forms rhythm a long elevation; single-direction washers keep light off neighbouring windows. In coastal and desert climates, specify dust-tight gaskets and corrosion-resistant alloys — the environment is harder on fixtures than the hours are.",
  },
  {
    match: /lawn/,
    about:
      "Lawn and landscape fixtures put light low: bollards marking a route, spike spots grazing planting, in-ground markers tracing an edge. Good landscape lighting is felt more than seen — sources shielded, beams aimed at foliage and stone rather than eyes.",
    where:
      "Gardens, pathways, hotel grounds and courtyards. Light the destination and the hazard — steps, level changes, turns — and let darkness do the composing between them. IP65 is the floor; anything at soil level or near irrigation wants IP67.",
  },
  {
    match: /street/,
    about:
      "Street fixtures are photometric instruments: their asymmetric distributions throw light long and flat along the carriageway while cutting it off before it becomes glare or sky-glow. Housing, surge protection and thermal design are rated for decades on a pole, unattended.",
    where:
      "Roadways, compounds, parking and perimeter routes. Match the distribution type to the road section — pole height, spacing and carriage width decide it — and hold colour at 3000–4000 K. Dimming profiles after midnight save energy without leaving the route dark.",
  },
  {
    match: /flood/,
    about:
      "Floodlights deliver volume: wide, symmetric or aimed beams that cover façades, yards and fields from a distance. The specification lives in the beam — spread, aiming angle and mounting position decide whether the result is architecture or light pollution.",
    where:
      "Façade washing, construction and storage yards, sports surfaces and security perimeters. Aim within 60° of straight down wherever possible, add visors near boundaries, and split large areas across several smaller beams for evenness a single big source can't give.",
  },
];

const SPEC_INDOOR =
  "Four numbers decide an interior fixture: CRI 90+ where colour matters (80+ for circulation); CCT 2700–3000 K for hospitality and homes, 3500–4000 K for work; UGR below 19 over screens; and efficacy quoted for the whole fixture, not the bare chip. All MS Lighting families ship with CE and RoHS documentation for project sign-off.";
const SPEC_OUTDOOR =
  "Outside, ingress protection leads: IP65 as the working floor, IP67 at ground level. In Gulf climates the dust digit and the housing alloy decide real service life — check gasket compound and salt-spray rating for coastal sites. Confirm surge protection on pole-mounted fixtures and hold CCT at 3000–4000 K. CE and RoHS documentation ships with every family.";

/** Build the three-section guide for a category. */
export function guideFor(name: string, slug: string): GuideItem[] {
  const t = TYPES.find((x) => x.match.test(slug));
  const outdoor = sectionOf(slug) === "outdoor";
  return [
    {
      title: `About ${name.toLowerCase()}`,
      body:
        t?.about ??
        `${name} from MS Lighting — architectural LED fixtures engineered for clean output, honest colour and long service life.`,
    },
    {
      title: "Where it works best",
      body:
        t?.where ??
        "Specified across commercial, hospitality and residential projects in the region — tell us about the space and we'll place it correctly.",
    },
    {
      title: "How to specify",
      body: outdoor ? SPEC_OUTDOOR : SPEC_INDOOR,
    },
  ];
}

/** Generic guide for the all-products catalogue page. */
export const CATALOGUE_GUIDE: GuideItem[] = [
  {
    title: "How the catalogue is organised",
    body:
      "Families are grouped by application: indoor covers the architectural interior layer — recessed, surface, linear, track and magnetic systems — while outdoor covers sealed, IP-rated wall, lawn, street and flood fixtures. Every model page carries its full specification sheet.",
  },
  {
    title: "Choosing between fixture families",
    body:
      "Start from the job the light must do, not the fixture. A calm ambient layer points to downlights or panels; accent and display work points to spots and track; continuous architectural lines point to linear and magnetic systems; height points to high bay; and anything outside starts from its IP rating.",
  },
  {
    title: "Certifications & regional supply",
    body:
      "Families ship with CE and RoHS documentation, with CB and SASO coverage for Gulf import where projects need it. Stock and delivery run through the Al-Burhan network across Kuwait and the UAE, with China direct and Egypt coming online.",
  },
];
