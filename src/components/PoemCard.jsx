import { useState, useRef } from "react";

export default function PoemCard({ poem, hidden }) {
  const [loaded, setLoaded] = useState(false);
  const cardRef = useRef(null);

  const onEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vw   = window.innerWidth;
    const bias = (rect.left + rect.width / 2 - vw / 2) / (vw / 2);
    const ox   = 50 + Math.max(-0.4, Math.min(0.4, bias)) * 28;
    const edge = Math.min(rect.left, vw - rect.right);
    const extra = (rect.width * 0.04) / 2;
    const cut   = Math.max(0, extra - edge);
    const safe  = Math.max(1.015, Math.min(1.055, 1.04 - cut / rect.width));
    el.style.transformOrigin = `${ox}% 50%`;
    el.style.setProperty("--safe-scale", safe);
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transformOrigin = "50% 50%";
    el.style.setProperty("--safe-scale", 1);
  };

  if (hidden) return null;

  return (
    <div
      ref={cardRef}
      className="pm-card"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <img
        src={poem.src}
        alt={`Poem ${poem.id}`}
        className={loaded ? "ld" : ""}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}
