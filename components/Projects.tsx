'use client';

import ProjectCard, { Project } from './ProjectCard';
import { useReveal } from '@/lib/hooks';

const PROJECTS: Project[] = [
  {
    title: 'Autonomous Mail Delivery Robot',
    tags: 'NAVIGATION · LOCALIZATION · ROS2',
    platform: 'TurtleBot3 Waffle Pi · ROS2 Jazzy · Gazebo Harmonic',
    description:
      'Built a 12-state Bayesian localization filter and corridor-freeze state machine for reliable indoor office navigation. Validated across 5 physical TurtleBot3 hardware trials, then extended the implementation to Gazebo Harmonic, recalibrating colour classification thresholds from real camera to the Ogre2 renderer.',
    metric: '60% full 3-office delivery completion across 5 physical trials · >90% state confidence within 5 observations',
    badges: ['ROS2', 'Python', 'Gazebo', 'Bayesian Filtering', 'Linux', 'PID Control'],
    github: 'https://github.com/manansawrangpate',
  },
  {
    title: 'Dynamic Stability Cart',
    tags: 'CONTROL · EMBEDDED · IMU · FIRMWARE',
    platform: 'STM32 NUCLEO-G070RB · ICM-20948 IMU · C++',
    description:
      'Designed an autonomous balancing cart for rope-bridge traversal with a 9-DoF IMU over SPI and a servo-actuated balancing rod. Offloaded quaternion sensor fusion to the IMU\'s onboard DMP, and converged on a tuned PI controller (Kp=1.5, Ki=0.02) after diagnosing Kd-induced oscillations across dual- to single-anchor rail configurations.',
    metric: '>95% control-loop latency reduction (5 s → <100 ms) via onboard DMP · <3° steady-state error',
    badges: ['STM32', 'C++', 'SPI', 'IMU', 'PI Control', 'Fusion 360'],
  },
];

export default function Projects() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="projects"
      ref={ref}
      className="reveal mx-auto max-w-6xl px-6 py-24"
    >
      <h2 className="mb-10 font-display text-2xl font-semibold text-text">
        <span className="font-mono text-green"># </span>Featured Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
