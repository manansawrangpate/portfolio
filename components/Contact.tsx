'use client';

import { useReveal } from '@/lib/hooks';

const GITHUB_URL = 'https://github.com/manansawrangpate';
const LINKEDIN_URL = 'https://www.linkedin.com/in/manansawrangpate/';
const EMAIL = 'manan.sawrangpate@mail.utoronto.ca';

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.58-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.65.24 2.87.12 3.17.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 .79 0 0 .77v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

const LINKS = [
  { label: 'GitHub', href: GITHUB_URL, Icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: LINKEDIN_URL, Icon: LinkedinIcon, external: true },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: MailIcon, external: false },
];

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

      <p className="mx-auto mb-9 max-w-xl text-base leading-7 text-muted">
        Open to Summer 2026 and January 2027 robotics and embedded systems
        internships across North America.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {LINKS.map(({ label, href, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="group inline-flex items-center gap-2 rounded-full border border-green px-5 py-2.5 text-sm font-medium text-green transition-colors duration-200 hover:bg-green hover:text-[#1e1e1e]"
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>

      <footer className="mt-24 font-mono text-xs text-muted">
        // Built by Manan Sawrangpate · 2026
      </footer>
    </section>
  );
}
