'use client';

import { useReveal } from '@/lib/hooks';

interface Entry {
  company: string;
  role: string;
  date: string;
  location?: string;
  current?: boolean;
  lines: string[];
}

const ENTRIES: Entry[] = [
  {
    company: 'Hedgehog Technologies',
    role: 'Embedded Software Engineering Intern',
    date: 'May 2026 – Present',
    location: 'Burnaby, BC',
    current: true,
    lines: [
      'Developed embedded C firmware for virtual EEPROM on NXP S32K144 via internal flash HAL, eliminating physical EEPROM from the board design',
      'Brought up 2 FOC motor controller boards — characterized 3-phase SVPWM waveforms (0–4000/24V & 0–7500 RPM/48V) via oscilloscope and built a validation test plan',
      'Diagnosed repeated SPI bus faults to a MOSI-CLK short on the motor driver IC by probing MOSI, MISO, CS, CLK and resolving via component replacement',
      'Traced bring-up failure modes (bootstrap capacitor sizing, failed MOSFETs) across 3 boards through Altium schematics; documented modifications for board status tracking',
    ],
  },
  {
    company: 'York Region',
    role: 'Process Engineering Intern',
    date: 'May 2025 – April 2026',
    location: 'Newmarket, ON',
    lines: [
      'Built a two-stage Python classifier (keyword filter + TF-IDF/Complement Naive Bayes) to triage 4,000–5,000 monthly operator logs; 100% issue recall on validation, 55% manual review reduction',
      'Derived geometric volume models for septage tanks from structural drawings, with a linearized Excel approximation for SCADA integration — live KPIs to ±0.1 m³ accuracy',
      'Built Excel pump cycle models from indirect operational data, informing EQ tank sizing and saving $18K annually',
      'Produced 5+ P&IDs and process schematics in Bluebeam/Visio with As-Built revisions from onsite inspections',
    ],
  },
  {
    company: 'University of Toronto — UTWind',
    role: 'Aerodynamics Lead',
    date: 'Sept 2023 – June 2025',
    lines: [
      'Led a 10-member aerodynamics sub-team in iterative CFD optimization of VAWT blade profiles using ANSYS Fluent and Discovery',
      '1st place at the 2024 International Small Wind Turbine Competition — blade selection informed by team\'s CFD results',
    ],
  },
];

export default function Experience() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="experience"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-24"
    >
      <h2 className="mb-12 font-mono text-xl text-text">
        <span className="text-green">&gt; </span>Mission Log
      </h2>

      <div className="relative ml-2 border-l border-border pl-8">
        {ENTRIES.map((entry, i) => (
          <div key={entry.company} className={i === ENTRIES.length - 1 ? '' : 'mb-12'}>
            {/* Node on the timeline */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5px] h-2.5 w-2.5 rounded-full ${
                entry.current ? 'bg-green' : 'bg-muted'
              }`}
              style={{
                boxShadow: entry.current
                  ? '0 0 8px rgba(0,200,150,0.6)'
                  : 'none',
              }}
            />

            {/* Header */}
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[15px] font-medium text-text">
                {entry.company}
              </span>
              <span className="font-mono text-[13px] text-green">
                {entry.role}
              </span>
              <span className="font-mono text-xs text-muted">
                {entry.date}{entry.location ? ` · ${entry.location}` : ''}
              </span>
            </div>

            {/* Body — commented code lines */}
            <ul className="mt-3 space-y-1.5">
              {entry.lines.map((line) => (
                <li
                  key={line}
                  className="font-mono text-[13px] leading-6 text-muted"
                >
                  <span className="text-border">// </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
