'use client';

import { useReveal } from '@/lib/hooks';

interface Entry {
  company: string;
  url: string;
  logo: string;
  nameColor: string;
  team: string;
  role: string;
  date: string;
  duration: string;
  location?: string;
  current?: boolean;
  summary: string;
}

const ENTRIES: Entry[] = [
  {
    company: 'Hedgehog Technologies Inc.',
    url: 'https://hedgehogtech.com/',
    logo: 'https://www.google.com/s2/favicons?domain=hedgehogtech.com&sz=64',
    nameColor: '#569cd6',
    team: 'Motor Control R&D Team',
    role: 'Embedded Software Engineering Intern',
    date: 'May 2026 – Present',
    duration: '2 mo',
    location: 'Burnaby, BC',
    current: true,
    summary:
      "Building bare-metal embedded C firmware for motor controller boards, including hardware bring-up and debugging across board revisions, SMD soldering, and developing test software to validate new hardware.",
  },
  {
    company: 'York Region',
    url: 'https://www.york.ca/',
    logo: 'https://www.google.com/s2/favicons?domain=york.ca&sz=64',
    nameColor: '#4fc3f7',
    team: 'Process Optimization and Analytics Team',
    role: 'Process Engineering Intern',
    date: 'May 2025 – April 2026',
    duration: '11 mo',
    location: 'Newmarket, ON',
    summary:
      "Built an ML-based log classifier to automate operator report triage, cutting manual review time. Developed geometric volume models for a new tank installation and analyzed operational datasets to inform EQ tank design.",
  },
  {
    company: 'Workplace Safety and Insurance Board',
    url: 'https://www.wsib.ca/en',
    logo: 'https://www.google.com/s2/favicons?domain=wsib.ca&sz=64',
    nameColor: '#4ec9b0',
    team: 'Customer Care Team',
    role: 'Customer Service Representative',
    date: 'May 2024 – August 2024',
    duration: '4 mo',
    location: 'Toronto, ON',
    summary:
      "Handled inbound inquiries from injured workers and employers on payment, healthcare, and policy matters, ensuring a high-quality experience. Responded to escalations, crisis situations, and security concerns with empathy and professionalism, achieving a 90%+ resolution rate.",
  },
];

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-20"
    >
      <h2 className="mb-12 font-display text-3xl font-semibold text-white">
        Professional Experience
      </h2>

      <div className="relative ml-6 border-l border-border">
        {ENTRIES.map((entry, i) => (
          <div key={entry.company + entry.date} className={`flex items-start gap-5 ${i < ENTRIES.length - 1 ? 'mb-14' : ''}`}>
            {/* Logo — centered on the timeline line */}
            <div className="-ml-6 shrink-0">
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.company} website`}
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-bg transition-colors hover:border-green">
                  <img
                    src={entry.logo}
                    alt={`${entry.company} logo`}
                    className="h-8 w-8 object-contain"
                  />
                </div>
              </a>
            </div>

            {/* Content */}
            <div className="flex-1 pt-1">
              {/* Company + team */}
              <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-text transition-opacity hover:opacity-80"
                >
                  {entry.company}
                </a>
                {entry.current && (
                  <span className="rounded-full bg-green/10 px-2 py-0.5 text-[11px] font-medium text-green">
                    Current
                  </span>
                )}
                <span className="text-xs text-muted">{entry.team}</span>
              </div>

              {/* Role · date · duration */}
              <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-mono text-sm" style={{ color: entry.nameColor }}>{entry.role}</span>
                <span className="text-[13px] text-muted">
                  · {entry.date}{entry.location ? ` · ${entry.location}` : ''} · ({entry.duration})
                </span>
              </div>

              {/* Narrative */}
              <p className="max-w-2xl text-base leading-7 text-muted">
                {entry.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
