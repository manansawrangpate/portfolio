'use client';

import { useReveal } from '@/lib/hooks';

export default function Contact() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-24 text-center"
    >
      <h2 className="mb-5 font-mono text-sm text-green">
        &lt;GetInTouch/&gt;
      </h2>

      <p className="mx-auto max-w-xl text-base leading-7 text-muted">
        Open to January 2027 roles.
      </p>

      <footer className="mt-24 font-mono text-xs text-muted">
        2026
      </footer>
    </section>
  );
}
