/**
 * Kinetic type band — a single line of giant outlined display type that
 * slides with the scroll (Ambience drives it; it reverses when you scroll
 * up). Pure markup here: eight copies of the phrase make the loop seamless
 * at any viewport, and without JS it simply stands still as a designed
 * typographic band.
 */
export default function Kinetic({
  text,
  dark = false,
  speed = 0.45,
}: {
  text: string;
  dark?: boolean;
  speed?: number;
}) {
  return (
    <section className={dark ? "kinetic dark" : "kinetic"} data-kin={speed} aria-hidden="true">
      <div className="kin-track">
        {Array.from({ length: 8 }).map((_, i) => (
          <span className="kin-unit" key={i}>
            {text}
            <i>—</i>
          </span>
        ))}
      </div>
    </section>
  );
}
