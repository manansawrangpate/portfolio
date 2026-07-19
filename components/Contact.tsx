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
      <h2 className="mb-5 font-display text-3xl font-semibold text-white">
        Get in Touch
      </h2>

      <p className="mx-auto max-w-xl text-lg leading-7 text-muted">
        I&apos;m always happy to connect or have a chat.
      </p>

      <div className="mt-6 flex items-center justify-center gap-6">
        <a
          href="mailto:manansawrangpate1@gmail.com"
          className="font-mono text-base text-muted transition-colors hover:text-green"
        >
          manansawrangpate1@gmail.com
        </a>
        <span className="text-border">·</span>
        <a
          href="https://linkedin.com/in/manansawrangpate"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-base text-muted transition-colors hover:text-green"
        >
          linkedin.com/in/manansawrangpate
        </a>
      </div>

      <footer className="mt-24 font-mono text-xs text-muted">
        2026
      </footer>
    </section>
  );
}
