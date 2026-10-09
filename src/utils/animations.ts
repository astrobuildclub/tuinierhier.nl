import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Common animation configurations
 */
export const animationConfig = {
  // Default durations
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
  },
  
  // Easing functions
  ease: {
    out: 'power2.out',
    in: 'power2.in',
    inOut: 'power2.inOut',
    back: 'back.out(1.7)',
  },
  
  // Stagger delays
  stagger: {
    small: 0.05,
    medium: 0.1,
    large: 0.15,
  },
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none reverse',
  },
};

/**
 * Performance-optimized defaults for GSAP
 */
export function setGSAPDefaults(): void {
  gsap.defaults({
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.out,
  });
}

/**
 * Create a fade in animation with optional slide
 */
export function createFadeIn(
  elements: gsap.TweenTarget,
  options: {
    slide?: boolean;
    slideDistance?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  } = {}
) {
  if (prefersReducedMotion()) return;

  const {
    slide = false,
    slideDistance = 20,
    duration = animationConfig.duration.normal,
    delay = 0,
    stagger = 0,
  } = options;

  const tl = gsap.timeline({ delay });

  if (slide) {
    tl.fromTo(
      elements,
      {
        opacity: 0,
        y: slideDistance,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: animationConfig.ease.out,
      }
    );
  } else {
    tl.fromTo(
      elements,
      { opacity: 0 },
      {
        opacity: 1,
        duration,
        stagger,
        ease: animationConfig.ease.out,
      }
    );
  }

  return tl;
}

/**
 * Create a stagger animation for multiple elements
 */
export function createStaggerAnimation(
  elements: gsap.TweenTarget,
  options: {
    animation?: 'fadeIn' | 'slideUp' | 'scale';
    stagger?: number;
    duration?: number;
    delay?: number;
  } = {}
) {
  if (prefersReducedMotion()) return;

  const {
    animation = 'fadeIn',
    stagger = animationConfig.stagger.medium,
    duration = animationConfig.duration.normal,
    delay = 0,
  } = options;

  const tl = gsap.timeline({ delay });

  switch (animation) {
    case 'fadeIn':
      tl.fromTo(
        elements,
        { opacity: 0 },
        {
          opacity: 1,
          duration,
          stagger,
          ease: animationConfig.ease.out,
        }
      );
      break;

    case 'slideUp':
      tl.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: animationConfig.ease.out,
        }
      );
      break;

    case 'scale':
      tl.fromTo(
        elements,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease: animationConfig.ease.back,
        }
      );
      break;
  }

  return tl;
}

/**
 * Create a ScrollTrigger animation
 */
export function createScrollTrigger(
  trigger: gsap.TweenTarget,
  animation: gsap.TweenVars,
  scrollOptions: ScrollTrigger.StaticVars = {}
) {
  if (prefersReducedMotion()) return;

  return gsap.fromTo(trigger, animation.from || {}, {
    ...animation.to,
    scrollTrigger: {
      trigger,
      ...animationConfig.scrollTrigger,
      ...scrollOptions,
    },
  });
}

/**
 * Create a parallax effect
 */
export function createParallax(
  elements: gsap.DOMTarget,
  options: {
    speed?: number;
    direction?: 'up' | 'down';
    trigger?: gsap.DOMTarget;
  } = {}
) {
  if (prefersReducedMotion()) return;

  const { speed = 0.5, direction = 'up', trigger: scrollTrigger } = options;

  const yValue = direction === 'up' ? -100 * speed : 100 * speed;

  return gsap.to(elements, {
    y: yValue,
    ease: 'none',
    scrollTrigger: {
      trigger: scrollTrigger || elements,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Create a text split animation (without SplitText plugin)
 * Splits text into individual characters for letter-by-letter animation
 */
export function createTextSplit(
  element: HTMLElement,
  options: {
    stagger?: number;
    duration?: number;
    delay?: number;
    splitBy?: 'letters' | 'words';
  } = {}
) {
  if (prefersReducedMotion()) return;

  const { stagger = 0.05, duration = 0.6, delay = 0, splitBy = 'letters' } = options;

  // Get original text
  const text = element.textContent || '';
  // Losse <span>s per letter of woord: schermlezers krijgen het hele woord via aria-label.
  element.setAttribute('aria-label', text.trim());
  
  if (splitBy === 'letters') {
    // Split text into individual characters
    const characters = text.split('');
    
    element.innerHTML = characters
      .map((char) => {
        if (char === ' ') {
          return '<span aria-hidden="true" style="display: inline-block; width: 0.25em;">&nbsp;</span>';
        }
        return `<span aria-hidden="true" style="display: inline-block; white-space: nowrap;">${char}</span>`;
      })
      .join('');

    const charSpans = element.querySelectorAll('span');

    return gsap.fromTo(
      charSpans,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: animationConfig.ease.out,
      }
    );
  } else {
    // Split text into words
    const words = text.split(' ');
    
    element.innerHTML = words
      .map((word) => `<span aria-hidden="true" style="display: inline-block;">${word}</span>`)
      .join(' ');

    const wordSpans = element.querySelectorAll('span');

    return gsap.fromTo(
      wordSpans,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: animationConfig.ease.out,
      }
    );
  }
}

/**
 * Cleanup all GSAP animations
 */
export function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('*');
}
