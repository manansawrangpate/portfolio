'use client';

import KinematicArm from './KinematicArm';
import { useTypewriter } from '@/lib/hooks';

export default function Hero() {
  const typed = useTypewriter([
    'Robotics Engineering Student',
    'Embedded Systems Developer',
    'Autonomous Systems Builder',
  ]);

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-24"
    >
      <div className="flex w-full flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
        {/* Left column */}
        <div className="w-full md:w-3/5">
          <p className="mb-4 font-mono text-sm text-green">
            // robotics-engineer.ts
          </p>

          <h1 className="font-display leading-[1.05]">
            <span className="block text-3xl font-medium text-text sm:text-4xl">
              Hi, I&apos;m
            </span>
            <span className="relative block text-5xl font-bold tracking-[-0.02em] text-white sm:text-6xl lg:text-7xl">
              {/* subtle radial green glow behind the name */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at left center, rgba(0,200,150,0.05), transparent 70%)',
                }}
              />
              Manan Sawrangpate
            </span>
          </h1>

          {/* Typewriter */}
          <div className="mt-5 font-mono text-lg text-green sm:text-xl">
            <span>{typed}</span>
            <span className="cursor-blink">_</span>
          </div>

          {/* Bio */}
          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            Building autonomous systems at the intersection of embedded hardware
            and AI. Currently an Embedded Software Intern at Hedgehog Technologies,
            developing FOC motor controller firmware on NXP S32K144.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-badge bg-green px-5 py-2.5 text-sm font-semibold text-[#06241d] transition-transform duration-200 hover:-translate-y-0.5"
            >
              ▶ View Projects
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-badge border border-border px-5 py-2.5 text-sm font-semibold text-text transition-colors duration-200 hover:border-green hover:text-green"
            >
              ↗ Resume
            </a>
          </div>

          {/* Stack line */}
          <p className="mt-8 font-mono text-xs text-muted sm:text-sm">
            const stack = [&apos;ROS2&apos;, &apos;C/C++&apos;, &apos;FOC&apos;,
            &apos;STM32&apos;, &apos;Python&apos;, &apos;Linux&apos;]
          </p>
        </div>

        {/* Right column — kinematic arm (hidden on mobile) */}
        <div className="hidden w-2/5 justify-end md:flex">
          <KinematicArm />
        </div>
      </div>
    </section>
  );
}
