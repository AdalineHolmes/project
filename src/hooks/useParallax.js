import { useEffect } from "react";

export default function useParallax(containerRef) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const isTouch  = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isNarrow = window.innerWidth < 700;
    if (isTouch || isNarrow) return;

    const layers = [...el.querySelectorAll("[data-speed]")];
    let raf = false;
    let containerTop = 0;

    const measure = () => {
      containerTop = el.getBoundingClientRect().top + window.scrollY;
    };
    const update = () => {
      const rel = window.scrollY - containerTop;
      layers.forEach((layer) => {
        const speed = parseFloat(layer.dataset.speed) || 0;
        const y = Math.round(rel * (speed / 100));
        layer.style.transform = `translate3d(0, ${y}px, 0)`;
      });
      raf = false;
    };
    const tick = () => {
      if (!raf) { requestAnimationFrame(update); raf = true; }
    };

    measure();
    update();
    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", () => { measure(); update(); }, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, [containerRef]);
}
