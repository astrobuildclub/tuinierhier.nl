/**
 * Sticky secties die hoger zijn dan het scherm: eerst doorscrollen tot de onderkant
 * zichtbaar is, pas dan vastzetten. Zo blijft alle content leesbaar.
 *
 * Zet per element `--sticky-top` op min(0, schermhoogte − elementhoogte):
 * - past de sectie op het scherm → 0px (gewoon `top: 0`)
 * - is hij hoger → negatief, de sectie plakt met zijn onderkant tegen de onderkant van het scherm
 *
 * Gebruik: `data-sticky-fit` + `lg:sticky lg:top-[var(--sticky-top,0px)]` op het element.
 * Een ResizeObserver houdt de waarde actueel (fonts, afbeeldingen, schermgrootte).
 */
export function initStickyFit(selector = "[data-sticky-fit]"): void {
  const elements = [...document.querySelectorAll<HTMLElement>(selector)];
  if (!elements.length) return;

  const update = () => {
    for (const el of elements) {
      const top = Math.min(0, window.innerHeight - el.offsetHeight);
      el.style.setProperty("--sticky-top", `${top}px`);
    }
  };

  const observer = new ResizeObserver(update);
  elements.forEach((el) => observer.observe(el));
  window.addEventListener("resize", update, { passive: true });
  update();
}
