import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element the first time it scrolls into view. Returns the ref to
 * attach and whether it has already appeared. Elements are visible from the
 * start when IntersectionObserver is missing or the guest asked for reduced
 * motion, so nothing can stay invisible.
 */
export const useReveal = <T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') => {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isVisible };
};
