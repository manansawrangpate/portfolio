'use client';

import { useReveal } from '@/lib/hooks';

interface Entry {
  company: string;
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
    company: 'Hedgehog Technologies',
    team: 'Motor Control Firmware Team',
    role: 'Embedded Software Engineering Intern',
    date: 'May 2026 – Present',
    duration: '2 mo',
    location: 'Burnaby, BC',
    current: true,
    summary:
      "Currently building embedded C firmware for motor controller boards on the NXP S32K144. Day-to-day is a mix of hardware bring-up and debugging — characterizing 3-phase SVPWM waveforms with an oscilloscope, tracing SPI bus faults down to component-level shorts, and diagnosing bring-up failures across board revisions through Altium schematics. One of my first shipped pieces was virtual EEPROM mapped to internal flash, which let the team eliminate a physical EEPROM chip from the board design entirely.",
  },
  {
    company: 'York Region',
    team: 'Process Optimization & Analytics',
    role: 'Process Engineering Intern',
    date: 'May 2025 – April 2026',
    duration: '11 mo',
    location: 'Newmarket, ON',
    summary:
      "Spent nearly a year embedded in the process engineering team at a regional wastewater facility. I built a two-stage Python ML pipeline (TF-IDF + Complement Naive Bayes) to triage thousands of monthly operator logs — 100% issue recall on validation and a 55% cut in manual review time. Beyond the ML work, I derived geometric volume models for SCADA integration, modelled pump cycles from indirect operational data to inform equipment sizing, and produced P&IDs and As-Built schematics from onsite inspections. Good introduction to how engineering decisions ripple through large infrastructure systems.",
  },
  {
    company: 'Workplace Safety and Insurance Board',
    team: 'Customer Care Team',
    role: 'Customer Service',
    date: 'May 2024 – August 2024',
    duration: '4 mo',
    location: 'Toronto, ON',
    summary:
      "Spent a summer on WSIB's customer care team, fielding inbound inquiries from injured workers and employers navigating Ontario's workplace safety insurance system — claims status, benefit entitlements, return-to-work timelines, and form submissions. Worked within WSIB's internal CRM to document interactions and escalate complex cases. Good first exposure to a high-stakes public service environment where the calls are never trivial.",
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
      <h2 className="mb-12 font-display text-2xl font-semibold text-text">
        Professional Experience
      </h2>

      <div className="relative ml-2 border-l border-border pl-8">
        {ENTRIES.map((entry, i) => (
          <div key={entry.company + entry.date} className={i === ENTRIES.length - 1 ? '' : 'mb-14'}>
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] h-2.5 w-2.5 rounded-full ${
                entry.current ? 'bg-green' : 'bg-muted'
              }`}
              style={{
                boxShadow: entry.current ? '0 0 8px rgba(79,195,247,0.7)' : 'none',
              }}
            />

            {/* Company + team */}
            <div className="mb-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-base font-semibold text-text">{entry.company}</span>
              <span className="text-xs text-muted">{entry.team}</span>
            </div>

            {/* Role · date · duration */}
            <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="font-mono text-[13px] text-green">{entry.role}</span>
              <span className="text-xs text-muted">
                · {entry.date}{entry.location ? ` · ${entry.location}` : ''} · ({entry.duration})
              </span>
            </div>

            {/* Narrative */}
            <p className="max-w-2xl text-sm leading-7 text-muted">
              {entry.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
