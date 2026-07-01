'use client';

import SkillGroup from './SkillGroup';
import { useReveal } from '@/lib/hooks';

const SKILL_GROUPS = [
  {
    label: 'Robotics & Autonomy',
    dot: 'green' as const,
    skills: [
      'ROS2 Jazzy', 'ROS1', 'Gazebo Harmonic', 'TurtleBot3',
      'Motion Planning', 'Bayesian Filtering', 'Sensor Fusion',
      'Localization', 'State Machines', 'SLAM',
    ],
  },
  {
    label: 'Embedded & Firmware',
    dot: 'blue' as const,
    skills: [
      'Embedded C/C++', 'STM32', 'NXP S32K144', 'SPI', 'I2C', 'UART', 'CAN',
      'ADC', 'PWM', 'SVPWM', 'FOC', 'Virtual EEPROM', 'Flash HAL',
      'IMU / DMP', 'PI Control', 'Motor Control',
    ],
  },
  {
    label: 'Electronics & PCB',
    dot: 'purple' as const,
    skills: [
      'EAGLE PCB', 'Altium', 'PSpice', 'Op-Amp Design', 'Active Filters',
      'LPF Design', 'Current Sensing', '3-Phase Inverter',
      'Oscilloscope', 'Signal Probing', 'Soldering',
    ],
  },
  {
    label: 'Software & Algorithms',
    dot: 'yellow' as const,
    skills: [
      'Python', 'C/C++', 'MATLAB / Simulink', 'Linux', 'Bash',
      'Multithreading', 'TF-IDF', 'Naive Bayes / NLP', 'Git',
    ],
  },
  {
    label: 'Mechanical & CAD',
    dot: 'pink' as const,
    skills: [
      'Fusion 360', 'ANSYS Fluent', 'ANSYS Discovery',
      'CFD Optimization', 'VAWT Aerodynamics',
      'Mechanical Assembly', 'Bluebeam', 'Visio',
    ],
  },
  {
    label: 'Dev Tools & Platforms',
    dot: 'white' as const,
    skills: [
      'Git', 'VS Code', 'Visual Studio', 'S32K Design Studio',
      'Linux CLI', 'Excel Modelling', 'Bluebeam / Visio',
    ],
  },
];

export default function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-20"
    >
      {/* Bio */}
      <div className="mb-14 max-w-2xl">
        <h2 className="mb-6 font-display text-2xl font-semibold text-text">About Me</h2>
        <div className="space-y-4 text-base leading-7 text-text">
          <p>
            I&apos;m a third-year Engineering Science student at the University of
            Toronto, specialising in Robotics Engineering with a minor in
            Engineering Business (Rotman). I&apos;ve been lucky to receive the
            Alexander Rutherford and Wallberg scholarships, and I spent two years
            leading UTWind&apos;s aerodynamics sub-team to a first-place finish at
            an international competition.
          </p>
          <p>
            My work tends to live close to the hardware — embedded C on ARM
            Cortex-M, field-oriented motor control, ROS2-based autonomy, and the
            kind of debugging that requires an oscilloscope and a lot of patience.
            I like problems where firmware, control theory, and real hardware all
            have to agree with each other at the same time.
          </p>
          <p>
            I&apos;m building toward robotics and autonomous systems that improve
            quality of life in measurable ways. I pick problems based on their
            proximity to real impact, their safety stakes, and how specific they
            are to a domain — rather than how impressive they sound in a demo.
          </p>
        </div>
      </div>

      {/* Skills */}
      <h3 className="mb-8 font-mono text-sm uppercase tracking-wider text-muted">
        Skills &amp; Technologies
      </h3>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group) => (
          <SkillGroup
            key={group.label}
            label={group.label}
            dot={group.dot}
            skills={group.skills}
          />
        ))}
      </div>
    </section>
  );
}
