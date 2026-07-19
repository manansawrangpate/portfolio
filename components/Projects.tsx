'use client';

import { useState } from 'react';
import ProjectCard, { Project } from './ProjectCard';
import ProjectModal from './ProjectModal';
import { useReveal } from '@/lib/hooks';

// ─── HOW TO ADD IMAGES TO PROJECT MODALS ─────────────────────────────────────
// 1. Create the folder:  public/projects/
// 2. Drop your .jpg/.png files in there
// 3. Add paths to the images[] array below, e.g.:
//      images: ['projects/robot-front.jpg', 'projects/robot-map.png']
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: 'Autonomous Mail Delivery Robot',
    tools: ['ROS1', 'ROS2', 'Python', 'Gazebo Harmonic', 'TurtleBot3 Waffle Pi', 'Perception', 'Bayesian Filter'],
    description:
      'Developed a Bayesian localization system enabling a TurtleBot3 Waffle Pi to autonomously navigate a closed-loop office map and deliver mail to target locations. The robot builds a probabilistic map from colored paper markers to identify its position and trigger delivery actions. Validated on real hardware, then extended to ROS2 Jazzy and Gazebo Harmonic simulation.',
    github: 'https://github.com/manansawrangpate/Bayesian-Localization-Robot/tree/main',
    details: {
      overview:
`The project started with a deceptively simple brief: build a TurtleBot3 Waffle Pi that could autonomously navigate a multi-room office layout and deliver mail to specific rooms — using nothing but a 2D LiDAR and an RGB camera. No GPS, no pre-built point cloud, just probabilistic reasoning over a hand-crafted 12-state map.

The core of the navigation stack is a Bayesian localization filter. At each timestep, it predicts the robot's state using odometry, then updates belief by correlating LiDAR scan match probabilities and colour patch observations against the map. The first critical problem surfaced early: when a colour observation was misclassified — which happens more than expected under real office lighting — the filter would permanently eliminate that state's belief. The fix was a belief floor of 0.01 applied after every update cycle. A small change, but it meant the filter could recover from a bad observation rather than collapsing irreversibly into a wrong state.

The second problem was corridor traversal. The Bayesian prediction step advances belief every cycle, which meant a robot crossing a long corridor might double-advance into the next office — once on entry, once mid-traverse. We solved this with a corridor-freeze strategy: prediction is suppressed during mid-corridor segments and fires exactly once on room-patch entry, keeping state transitions tight regardless of traversal speed.

Delivery runs as a two-phase state machine. The first phase is an exploration lap to build initial confidence across all 12 states; delivery is then gated on 8 consecutive frames where the MAP estimate matches the target room. That threshold was found empirically — too low caused premature triggering and missed deliveries, too high caused timeouts.

After validating across 5 complete hardware trials and achieving 60% full 3-office delivery completion, we ported the entire stack to ROS2 Jazzy running in Gazebo Harmonic. The port introduced a non-trivial calibration problem: Gazebo's Ogre2 renderer produces colour outputs different enough from a real camera that all colour classification thresholds had to be recalibrated from scratch — even though the underlying filter logic was identical.`,
      images: [
        { src: 'IMG_5622.jpeg', caption: 'TurtleBot3 Waffle Pi' },
        { src: 'track_topology.png', caption: '12-State Office Navigation Map' },
      ],
      links: [
        { label: 'Demo Video', href: 'https://www.youtube.com/watch?v=Y-dlipkhMvs&t=11s' },
        { label: 'Final Report', href: 'https://github.com/manansawrangpate/Bayesian-Localization-Robot/blob/main/docs/final_report.pdf' },
      ],
    },
  },
  {
    title: 'Dynamic Stability Cart',
    tools: ['STM32', 'C++', 'IMU', 'SPI', 'Fusion 360', 'PID Control', 'Sensor Fusion'],
    report: 'https://drive.google.com/file/d/1eHVN0l3nveRTs42LLFuMdob11xppMMwQ/view',
    description:
      'A two-wheeled robot that crosses a flexible rope bridge the way a tightrope walker does, using a mounted beam that shifts dynamically left and right to adjust its center of gravity and stay balanced. An STM32 PI controller reads IMU orientation to drive the beam servo, with quaternion fusion offloaded to the IMU\'s onboard DMP to cut control-loop latency from ~5 s to under 100 ms.',
    details: {
      overview:
`The problem we aimed to solve was inspired by tightrope walkers, who carry a long beam to lower their center of gravity and make balancing easier. Our robot replicates this: a two-wheeled cart that crosses a rope-suspended bridge by dynamically shifting a mounted beam left and right, adjusting its center of mass in real time to stay upright as it moves.

The hardware is built around an STM32 NUCLEO-G070RB driving a servo that actuates the balancing beam. Orientation comes from an ICM-20948 9-DoF IMU over SPI. Our first firmware revision ran a Madgwick filter directly on the MCU to compute pitch, but latency was around 5 seconds, long enough for the cart to tip before the servo could respond. We fixed this by offloading quaternion fusion to the IMU's onboard Digital Motion Processor (DMP), which outputs ready-to-use quaternions at the SPI interface. This cut control-loop latency to under 100 ms, a reduction of over 95%.

Control is a PI loop tuned to Kp=1.5, Ki=0.02. We initially used a full PID, but the derivative term amplified high-frequency disturbances from the rope's compliance, causing sustained oscillations that were difficult to tune out. Dropping the D term gave clean convergence to under 3 degrees of steady-state error.

The chassis went through two Fusion 360 design iterations. The first was a rigid enclosed box, but it was too heavy with a center of mass too high for reliable balancing. The second used an open multi-level layout with heavy components mounted low and strict longitudinal symmetry enforced. Even a few millimetres of lateral offset introduced a lean bias the PI controller couldn't fully compensate for.

Testing progressed from a dual-anchor string to a single-anchor rope attachment, which is far more compliant and prone to sway. The cart achieved repeatable autonomous bridge traversal under both configurations.`,
      images: [
        { src: 'Screenshot 2026-07-18 191648.png', caption: 'Overview of the Dynamic Stability Cart' },
        { src: 'cart-system-diagram.png', caption: 'System Diagram (STM32 & connections)' },
        { src: 'cart-deconstructed.png', caption: 'Deconstructed View of Cart' },
        { src: 'cart-side-view.png', caption: 'Side View of Cart with Balancing Beam' },
      ],
      links: [
        { label: 'Cart Overview', href: 'https://youtube.com/shorts/9KmyEsKY3r4' },
        { label: 'Demo Videos', href: 'https://drive.google.com/drive/folders/1WdUrfUVB392MwbkiYOgDXzXlVdmxJXj8' },
        { label: 'Final Report', href: 'https://drive.google.com/file/d/1eHVN0l3nveRTs42LLFuMdob11xppMMwQ/view' },
      ],
    },
  },
  {
    title: 'Current Sensing PCB',
    tools: ['Eagle PCB', 'PSpice', 'STM32', 'Circuit Design', 'Low Pass Filter', 'C'],
    description:
      'Designed and built a current sensing system for an adjustable DC power supply. Simulated the circuit in PSpice, then laid out a custom 2-layer PCB in EAGLE and integrated it with an STM32 and LCD display for real-time current readout and system verification.',
    github: 'https://github.com/manansawrangpate/dc-power-supply-current-sense',
    details: {
      overview:
`This project came from a real gap in our adjustable DC power supply: it had no visibility into how much current was actually flowing to the load. We needed a sense circuit that could accurately map 0–3.5 A to a voltage range the STM32's ADC could read — without being corrupted by the switching noise the supply's regulator generates on every cycle.

The analog front end uses a low-side shunt resistor with a non-inverting summing amplifier topology. An op-amp buffer offset stage shifts the shunt differential voltage into the STM32G051 ADC's 0.25–3.3 V input window — the 0.25 V floor keeps the signal clear of ground noise at the low end, and the 3.3 V ceiling leaves headroom before clipping. Getting the gain and offset biasing right took several PSpice iterations before the schematic was ready for layout.

Switching noise was the main adversary. The regulator generates harmonic content above 5 kHz that, if it reaches the ADC, causes aliasing and false current readings. We designed a 3rd-order active Butterworth low-pass filter at 5 kHz — providing −35 dB attenuation at the switching frequency. The choice of 3rd order over a simpler 1st or 2nd order was deliberate: we needed the steeper roll-off to achieve sufficient attenuation within a tight frequency band around the switching fundamental.

Translating the schematic to a 2-layer PCB in EAGLE meant thinking carefully about current paths. High-current traces — the shunt and supply return — were kept short and wide; the analog signal path was routed away from those traces, with a solid ground pour providing shielding between them. Component keepout regions around the op-amp inputs prevented accidental coupling from adjacent leads.

After assembly and soldering, we built STM32G051 calibration firmware that maps ADC readings to load current via a lookup table, achieving R²=0.999 linearity across the full 0–3.5 A range. A rotary encoder sets the target output and an LCD shows real-time voltage and current. Oscilloscope measurements under step-load conditions confirmed −35 dB attenuation at 5 kHz and under 250 mV output noise. We did catch one discrepancy: a ground-related ripple appeared near the filter cutoff that wasn't present in simulation, traceable to a shared ground return path between the analog and digital sections — a useful lesson for future mixed-signal PCB layout.`,
      images: [
        { src: 'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/PCB_Eagle_layout.png', caption: 'PCB Layout in EAGLE' },
        { src: 'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/Mounted_PCB_photo.png', caption: 'Soldered PCB with LCD Display Active' },
        { src: 'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/Backside_of_PCB.png', caption: 'PCB Integrated with STM32-based Power Supply' },
      ],
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
        <h2 className="mb-10 font-display text-3xl font-semibold text-white">
          Selected Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
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
