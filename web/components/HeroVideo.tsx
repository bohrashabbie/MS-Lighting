"use client";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/assets";

/**
 * Two-clip banner. clip1 plays, then clip2, then the pair loops — concatenated
 * at playback time, so neither file is re-encoded and the colours are exactly
 * as generated (no grading, no dimming).
 *
 * Both clips are muted. `muted` is load-bearing: it silences the source audio
 * track AND is what lets browsers autoplay. Never remove it.
 *
 * Implementation: two stacked <video> elements. Only the active one is shown;
 * the next one is preloaded and primed so the hand-off has no black frame.
 */
const CLIPS = ["/video/clip1.mp4", "/video/clip2.mp4"].map(asset);

export default function HeroVideo() {
  const [active, setActive] = useState(0);
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];

  useEffect(() => {
    const cur = refs[active].current;
    const nextIdx = (active + 1) % CLIPS.length;
    const nxt = refs[nextIdx].current;
    if (!cur) return;

    // Prime the next clip to its first frame so the swap is instant.
    if (nxt) {
      nxt.currentTime = 0;
      nxt.pause();
    }
    cur.play().catch(() => {});

    const onEnded = () => setActive(nextIdx);
    cur.addEventListener("ended", onEnded);
    return () => cur.removeEventListener("ended", onEnded);
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="hero-video" aria-hidden>
      {CLIPS.map((src, i) => (
        <video
          key={src}
          ref={refs[i]}
          className={i === active ? "hv-clip on" : "hv-clip"}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
      <div className="hv-veil" />
    </div>
  );
}
