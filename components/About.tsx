'use client';

import SkillGroup from './SkillGroup';
import { useReveal } from '@/lib/hooks';

const SKILL_GROUPS = [
  {
    label: 'Hardware & Firmware',
    dot: 'green' as const,
    skills: [
      'STM32',
      'NXP S32K144',
      'SPI',
      'CAN',
      'I2C',
      'UART',
      'ADC',
      'PWM',
      'SVPWM',
      'FOC',
      'Eagle PCB',
      'Altium',
      'PSpice',
    ],
  },
  {
    label: 'Software & Autonomy',
    dot: 'blue' as const,
    skills: [
      'ROS2 (Jazzy)',
      'ROS1',
      'C/C++',
      'Python',
      'Linux',
      'Gazebo',
      'Bayesian Filtering',
      'Motion Planning',
      'Multithreading',
      'MATLAB/Simulink',
    ],
  },
  {
    label: 'Tools & Infra',
    dot: 'white' as const,
    skills: [
      'Git',
      'Bash',
      'Visual Studio',
      'S32K IDE',
      'Oscilloscope',
      'Signal Probing',
      'Soldering',
    ],
  },
];

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-24"
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {/* Left — About */}
        <div>
          <h2 className="mb-6 font-mono text-sm text-green">&lt;AboutMe/&gt;</h2>
          <div className="space-y-4 text-base leading-7 text-muted">
            <p>
              I&apos;m a robotics engineering student in the Engineering Science
              program at the University of Toronto, with a minor in Engineering
              Business (Rotman). I&apos;ve been awarded the Alexander Rutherford
              and Wallberg scholarships, and have led an international
              competition team as Aerodynamics Lead for UTWind.
            </p>
            <p>
              My work lives close to the metal: embedded C/C++, field-oriented
              control (FOC) for brushless motors, ROS2-based autonomy, and
              sensor fusion. I like the moment where firmware, control theory,
              and real hardware have to agree with each other simultaneously.
            </p>
            <p>
              I&apos;m building toward robotics and autonomous systems that
              improve quality of life — choosing problems by their proximity to
              real impact, their safety and efficiency stakes, and their
              specificity to a domain over generic demos.
            </p>
          </div>
        </div>

        {/* Right — Skills */}
        <div className="space-y-8">
          {SKILL_GROUPS.map((group) => (
            <SkillGroup
              key={group.label}
              label={group.label}
              dot={group.dot}
              skills={group.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
