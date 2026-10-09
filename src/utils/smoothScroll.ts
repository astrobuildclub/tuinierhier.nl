import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let bodyObserver: ResizeObserver | null = null;

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize Lenis smooth scroll
 */
export function initSmoothScroll(): Lenis | null {
  // Don't initialize if user prefers reduced motion
  if (prefersReducedMotion()) {
    return null;
  }

  // Don't initialize if already exists
  if (lenis) {
    return lenis;
  }

  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker for smooth animations
    tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    gsap.ticker.lagSmoothing(0);

    // Lenis meet de pagina via <html>, maar die is `height: 100%` en verandert nooit.
    // Groeit de inhoud (meer nieuws, later geladen afbeeldingen), dan blijft de scrolllimiet
    // anders op de oude lengte staan en kun je niet verder scrollen. Daarom body observeren.
    let lastHeight = document.body.scrollHeight;
    let timer: ReturnType<typeof setTimeout>;
    bodyObserver = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const height = document.body.scrollHeight;
        if (height === lastHeight) return;
        lastHeight = height;
        refreshScrollLength();
      }, 100);
    });
    bodyObserver.observe(document.body);

    return lenis;
  } catch (error) {
    console.warn('Failed to initialize Lenis smooth scroll:', error);
    return null;
  }
}

/**
 * Na een hoogteverandering van de pagina: Lenis en ScrollTrigger opnieuw laten meten.
 */
export function refreshScrollLength(): void {
  lenis?.resize();
  ScrollTrigger.refresh();
}

/**
 * Destroy Lenis instance and cleanup
 */
export function destroySmoothScroll(): void {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  bodyObserver?.disconnect();
  bodyObserver = null;
  
  // Remove GSAP ticker callback if it exists
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
}

/**
 * Refresh ScrollTrigger after Lenis initialization
 */
export function refreshScrollTrigger(): void {
  if (!prefersReducedMotion()) {
    ScrollTrigger.refresh();
  }
}

/**
 * Get current Lenis instance
 */
export function getLenisInstance(): Lenis | null {
  return lenis;
}
