'use client';

import { useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useReveal } from '@/lib/hooks';

// ─── HOW TO ADD CONTENT TO PROJECT MODALS ────────────────────────────────────
//
// IMAGES: Drop .jpg/.png files into public/projects/ and add paths like:
//   images: ['projects/robot-demo.jpg', 'projects/robot-map.png']
//
// LINKS: Add YouTube demos, Google Drive reports, GitHub repos etc.:
//   links: [
//     { label: 'Demo Video', href: 'https://youtube.com/...' },
//     { label: 'Final Report', href: 'https://drive.google.com/...' },
//   ]
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: 'Autonomous Mail Delivery Robot',
    tools: ['ROS1/2', 'Python', 'Gazebo Harmonic', 'TurtleBot3 Waffle Pi'],
    description:
      'Autonomous indoor mail delivery on TurtleBot3 using a 12-state Bayesian localization filter and corridor-aware state machine. Validated across 5 live hardware trials and ported to Gazebo Harmonic simulation.',
    github: 'https://github.com/manansawrangpate',
    details: {
      overview:
        `Built as a final project, this system autonomously navigates a multi-room office floor and delivers mail to target rooms using a TurtleBot3 Waffle Pi equipped with a 2D LiDAR and RGB camera.

The navigation stack is built around a 12-state Bayesian localization filter that estimates the robot's position from LiDAR scan probabilities and colour observations. A corridor-freeze state machine prevents mid-corridor turns — the primary cause of navigation failure in early trials — by locking heading until the robot clears a corridor threshold.

Validated across 5 complete hardware delivery runs achieving 60% full 3-office delivery completion and >90% state confidence within 5 corridor observations. The stack was later ported to Gazebo Harmonic simulation, requiring camera colour classification threshold recalibration to match the Ogre2 renderer's output characteristics.`,
      // Drop images into public/projects/ and list filenames below:
      images: [],
      // Add demo video, final report, GitHub repo etc. below:
      links: [],
    },
  },
  {
    title: 'Dynamic Stability Cart',
    tools: ['STM32', 'C++', 'ICM-20948 IMU', 'SPI', 'PI Control'],
    description:
      'A self-balancing cart for rope-bridge traversal using an ICM-20948 IMU over SPI and a servo-actuated rod. Quaternion fusion offloaded to the sensor\'s onboard DMP; a tuned PI controller achieves <3° steady-state error.',
    details: {
      overview:
        `Designed to autonomously balance on and traverse a rope bridge, this cart uses a servo-actuated balancing rod driven by a PI controller running on an STM32 NUCLEO-G070RB.

Orientation comes from an ICM-20948 9-DoF IMU connected over SPI. To minimize MCU processing load and latency, quaternion sensor fusion is offloaded to the IMU's onboard Digital Motion Processor (DMP), delivering ready-to-use orientation data at the SPI interface rather than requiring the MCU to run Madgwick or Mahony filters in software.

The PI controller was tuned iteratively — early D-term attempts introduced oscillations across both dual- and single-anchor bridge configurations, leading to a final Kp=1.5, Ki=0.02 parameter set. The system achieves <3° steady-state angle error and >95% reduction in stabilization latency (from ~5 s to <100 ms) vs. software-only sensor fusion.`,
      // Drop images into public/projects/ and list filenames below:
      images: [],
      // Add demo video, project report, GitHub repo etc. below:
      links: [],
    },
  },
  {
    title: 'Current Sensing PCB',
    tools: ['EAGLE PCB', 'PSpice', 'STM32G051', 'Op-Amp Design'],
    description:
      'A custom 2-layer PCB conditioning a shunt-resistor signal for STM32 ADC input, with a 3rd-order active LPF providing −35 dB of switching-noise rejection. Designed in EAGLE, simulated in PSpice, validated with calibration firmware.',
    details: {
      overview:
        `Designed a complete current sensing solution for STM32-based motor control applications, from analog front-end design through PCB layout and firmware validation.

The analog front end uses a non-inverting summing amplifier with an op-amp buffer offset stage, mapping a 0–3.5 A shunt signal to the STM32G051 ADC's 0.25–3.3 V input range. A 3rd-order active Butterworth LPF at 5 kHz provides −35 dB attenuation of PWM switching noise.

Designed in EAGLE as a 2-layer board with a solid ground pour and short high-current trace routing, then simulated in PSpice prior to fabrication to verify frequency response. Calibration firmware was developed for end-to-end validation using a rotary encoder for input control and an LCD display for real-time readout — achieving R²=0.999 linearity across the full measurement range.`,
      // Drop images into public/projects/ (PCB layout, oscilloscope traces, etc.):
      images: [],
      // Add EAGLE files (Google Drive), oscilloscope data, report etc. below:
      links: [],
    },
  },
];

export default function Projects() {
  const ref = useReveal<HTMLElement>();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section
        id="projects"
        ref={ref}
        className="reveal mx-auto max-w-6xl px-6 py-20"
      >
        <h2 className="mb-10 font-display text-2xl font-semibold text-text">
          Selected Projects
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpenDetails={() => setActiveProject(project)}
            />
          ))}
        </div>
      </section>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
}
