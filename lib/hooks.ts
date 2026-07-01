'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useTypewriter — cycles through an array of phrases, typing then deleting each.
 * No external library. Returns the current visible text.
 */
export function useTypewriter(
  phrases: string[],
  {
    typeSpeed = 70,
    deleteSpeed = 35,
    holdTime = 1600,
  }: { typeSpeed?: number; deleteSpeed?: number; holdTime?: number } = {}
) {
  const [text, setText] = useState('');
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    // Respect reduced motion: show the first phrase statically.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setText(phrases[0] ?? '');
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = phrases[phraseIndex.current] ?? '';

      if (!deleting.current) {
        charIndex.current += 1;
        setText(current.slice(0, charIndex.current));

        if (charIndex.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, holdTime);
          return;
        }
        timeout = setTimeout(tick, typeSpeed);
      } else {
        charIndex.current -= 1;
        setText(current.slice(0, charIndex.current));

        if (charIndex.current === 0) {
          deleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        }
        timeout = setTimeout(tick, deleteSpeed);
      }
    };

    timeout = setTimeout(tick, typeSpeed);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

/**
 * useReveal — adds `is-visible` to an element once it scrolls into view,
 * via IntersectionObserver. Returns a ref to attach to the element.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
