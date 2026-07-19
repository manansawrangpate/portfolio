'use client';

import { useState, useEffect } from 'react';
import SkillGroup from './SkillGroup';
import { useReveal } from '@/lib/hooks';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const PHOTOS = [
  { src: `${BASE}/Biking.jpeg`, alt: 'Biking in the Rockies' },
  { src: `${BASE}/bigchair.jpeg`, alt: 'Travelling' },
  { src: `${BASE}/StarWars.jpg`, alt: 'At a Star Wars exhibit' },
];

function PhotoShuffle() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx(i => (i + 1) % PHOTOS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
      {PHOTOS.map((photo, i) => (
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

const SKILL_GROUPS = [
  {
    label: 'Robotics & Autonomy',
    dot: 'green' as const,
    skills: [
      'ROS2 Jazzy', 'ROS1', 'Gazebo Harmonic', 'TurtleBot3',
      'Autonomous Navigation', 'Motion Planning', 'Bayesian Filtering',
      'Sensor Fusion', 'Localization', 'State Machines', 'Multithreading',
    ],
  },
  {
    label: 'Embedded & Firmware',
    dot: 'blue' as const,
    skills: [
      'Embedded C/C++', 'STM32', 'NXP S32K144', 'SPI', 'I2C', 'CAN', 'Modbus',
      'ADC', 'PWM', 'SVPWM', 'FOC', 'Virtual EEPROM', 'Flash HAL',
      'IMU / DMP', 'PID Control', 'Motor Control', 'Actuators / Servos',
    ],
  },
  {
    label: 'Electronics & PCB',
    dot: 'purple' as const,
    skills: [
      'EAGLE PCB', 'Altium', 'PSpice', 'Op-Amp Design',
      'Low Pass Filter Design', 'Current Sensing', '3-Phase Inverter',
      'Oscilloscope', 'Signal Probing', 'Soldering', 'Multimeter', 'Electrical Assembly',
    ],
  },
  {
    label: 'Software & Algorithms',
    dot: 'yellow' as const,
    skills: [
      'Python', 'C/C++', 'Object Oriented Programming', 'MATLAB / Simulink',
      'Linux / Ubuntu', 'Bash', 'Git / GitHub', 'TF-IDF',
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
      'Visual Studio', 'S32K Design Studio', 'Jira',
      'Excel Modelling', 'Bluebeam / Visio',
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
      <h2 className="mb-10 font-display text-3xl font-semibold text-white">About Me</h2>

      {/* Top: bio + photo */}
      <div className="mb-16 grid gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left: bio + personal */}
        <div className="space-y-6 text-base leading-7 text-muted">
          <p>
            I&apos;m a third-year{' '}
            <a
              href="https://engsci.utoronto.ca/program/what-is-engsci/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green underline-offset-4 hover:underline"
            >
              Engineering Science
            </a>{' '}
            student at the University of Toronto, majoring in Robotics Engineering
            with minors in Engineering Business and Artificial Intelligence.
          </p>
          <p>
            My interests span autonomous systems, hardware, embedded software and
            firmware, and controls, all important to robotics. I enjoy solving
            difficult problems across a variety of fields, and my goal is to build
            robotic and autonomous systems that improve human quality of life.
          </p>

          <hr className="border-border" />

          <p>
            Outside of professional interests, I&apos;m a proud Albertan and an even
            prouder Canadian. I grew up in Edmonton and developed a passion for
            hiking and camping in the Rockies, and I really enjoy biking with
            friends. I&apos;ve been lucky to travel abroad and have visited Thailand,
            Singapore, Egypt, Italy, and the US many times. Spain is next on the
            list! Outside of engineering, I play guitar - you can check out some
            recordings on my{' '}
            <a
              href="https://www.youtube.com/@sawrangpatesounds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green underline-offset-4 hover:underline"
            >
              YouTube channel
            </a>
            .
          </p>
        </div>

        {/* Right: photo shuffle */}
        <div className="flex flex-col gap-4">
          <PhotoShuffle />
        </div>
      </div>

      {/* Skills */}
      <h3 className="mb-8 font-mono text-base uppercase tracking-wider text-muted">
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
