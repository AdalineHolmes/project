import { useState } from "react";
import { FILTER_CATS } from "../data/poems";

export default function PoemSidebar({ filters, onToggle }) {
  const [openCats, setOpenCats] = useState({ aesthetic: true, style: true });

  const toggleCat = (key) =>
    setOpenCats((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="pm-side" role="navigation" aria-label="Filter sidebar">
      <div className="pm-side-top" aria-hidden="true">
        <span className="pm-side-glyph">⊕</span>
        <span className="pm-side-label">Categories</span>
      </div>

      {FILTER_CATS.map((cat) => (
        <div
          key={cat.key}
          className={`pm-cat${openCats[cat.key] ? " open" : ""}`}
        >
          <div
            className="pm-cat-h"
            onClick={() => toggleCat(cat.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleCat(cat.key)
            }
            aria-expanded={openCats[cat.key]}
          >
            <span className="pm-arr">›</span>
            {cat.key[0].toUpperCase() + cat.key.slice(1)}
          </div>

          <div className="pm-drop" aria-hidden={!openCats[cat.key]}>
            {cat.items.map((item) => {
              const val    = item.toLowerCase();
              const active = filters[cat.key] === val;
              return (
                <div
                  key={item}
                  className={`pm-item${active ? " on" : ""}`}
                  onClick={() => onToggle(cat.key, val)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && onToggle(cat.key, val)
                  }
                  aria-pressed={active}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
