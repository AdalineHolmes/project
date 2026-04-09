import { useState } from "react";
import { POEMS } from "../data/poems";
import PoemSidebar from "../components/PoemSidebar";
import PoemCard from "../components/PoemCard";

export default function PoemsPage({ onNavigate }) {
  const [filters, setFilters] = useState({});

  const toggleFilter = (type, value) =>
    setFilters((prev) => {
      const next = { ...prev };
      next[type] === value ? delete next[type] : (next[type] = value);
      return next;
    });

  const isVisible = (poem) =>
    Object.entries(filters).every(([k, v]) => poem[k] === v);

  return (
    <div className="pm-wrap pg">
      <section className="pm-banner" aria-label="Poems banner">
  <img src="images/a.jpg" className="pm-banner-img" alt="Poems banner" />

  <div className="pm-overlay" aria-hidden="true">
    <h1 className="pm-heading">Poems</h1>
  </div>
  

        <button
          className="pm-back-btn"
          onClick={() => onNavigate("home")}
          aria-label="Back to home"
        >
          ← Home
        </button>

        <PoemSidebar filters={filters} onToggle={toggleFilter} />
      </section>

      <section className="pm-grid" aria-label="Poem gallery">
        {POEMS.map((poem) => (
          <PoemCard
            key={poem.id}
            poem={poem}
            hidden={!isVisible(poem)}
          />
        ))}
      </section>
    </div>
  );
}