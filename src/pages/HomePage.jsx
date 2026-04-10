import { useRef } from "react";
import useParallax from "../hooks/useParallax";
import { PARALLAX_LAYERS, NAV_ITEMS } from "../data/poems";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  useParallax(bannerRef);

  return (
    <div className="pg">
      <section
        ref={bannerRef}
        className="h-banner"
        aria-label="Decorative parallax banner"
      >
        {PARALLAX_LAYERS.map((layer, i) => (
          <div
            key={i}
            className="h-layer"
            data-speed={layer.speed}
            style={layer.style}
            aria-hidden="true"
          />
        ))}
        <div className="h-scrim" aria-hidden="true" />
        <div className="h-title" data-speed={65} aria-label="AERAS">
          _-AERAS-_
        </div>
      </section>

      <main className="h-main" role="main">
        <p className="h-sub">A place for all the other places</p>

        <nav className="h-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(({ label, page }) => (
            <button
              key={label}
              className="h-nav-btn"
              onClick={() => page && navigate("/"+page)}
              aria-current={!page ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ height: "900px" }} />
      </main>
    </div>
  );
}
