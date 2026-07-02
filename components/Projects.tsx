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
    tools: ['ROS1/2', 'Python', 'Gazebo Harmonic', 'TurtleBot3 Waffle Pi'],
    description:
      'TurtleBot3 Waffle Pi that autonomously navigates a multi-room office floor and delivers mail, using a 12-state Bayesian localization filter with a corridor-freeze strategy. Validated across 5 hardware trials, then ported to ROS2 Jazzy / Gazebo Harmonic.',
    github: 'https://github.com/manansawrangpate/Bayesian-Localization-Robot/tree/main',
    details: {
      overview:
`The project started with a deceptively simple brief: build a TurtleBot3 Waffle Pi that could autonomously navigate a multi-room office layout and deliver mail to specific rooms — using nothing but a 2D LiDAR and an RGB camera. No GPS, no pre-built point cloud, just probabilistic reasoning over a hand-crafted 12-state map.

The core of the navigation stack is a Bayesian localization filter. At each timestep, it predicts the robot's state using odometry, then updates belief by correlating LiDAR scan match probabilities and colour patch observations against the map. The first critical problem surfaced early: when a colour observation was misclassified — which happens more than expected under real office lighting — the filter would permanently eliminate that state's belief. The fix was a belief floor of 0.01 applied after every update cycle. A small change, but it meant the filter could recover from a bad observation rather than collapsing irreversibly into a wrong state.

The second problem was corridor traversal. The Bayesian prediction step advances belief every cycle, which meant a robot crossing a long corridor might double-advance into the next office — once on entry, once mid-traverse. We solved this with a corridor-freeze strategy: prediction is suppressed during mid-corridor segments and fires exactly once on room-patch entry, keeping state transitions tight regardless of traversal speed.

Delivery runs as a two-phase state machine. The first phase is an exploration lap to build initial confidence across all 12 states; delivery is then gated on 8 consecutive frames where the MAP estimate matches the target room. That threshold was found empirically — too low caused premature triggering and missed deliveries, too high caused timeouts.

After validating across 5 complete hardware trials and achieving 60% full 3-office delivery completion, we ported the entire stack to ROS2 Jazzy running in Gazebo Harmonic. The port introduced a non-trivial calibration problem: Gazebo's Ogre2 renderer produces colour outputs different enough from a real camera that all colour classification thresholds had to be recalibrated from scratch — even though the underlying filter logic was identical.`,
      // Drop project images into public/projects/ and list filenames below:
      images: [],
      links: [
        { label: 'Demo Video', href: 'https://www.youtube.com/watch?v=Y-dlipkhMvs&t=11s' },
        { label: 'Final Report', href: 'https://github.com/manansawrangpate/Bayesian-Localization-Robot/blob/main/docs/final_report.pdf' },
      ],
    },
  },
  {
    title: 'Dynamic Stability Cart',
    tools: ['STM32', 'C++', 'ICM-20948 IMU', 'SPI', 'Fusion 360', 'PI Control'],
    description:
      'Autonomous two-wheeled cart that traverses a rope-suspended bridge using a servo-actuated balancing rod and STM32 PI control. Offloading quaternion fusion to the IMU\'s onboard DMP cut control-loop latency from ~5 s to <100 ms, achieving <3° steady-state error.',
    details: {
      overview:
`The brief was deceptively simple: build a cart that can cross a rope-suspended bridge. In practice, that meant designing a system that could balance a two-wheeled vehicle on a 1 m single-axis rope rail while actually moving forward — a classic inverted-pendulum problem, but on an inherently compliant, swaying bridge rather than a rigid surface.

The hardware core is an STM32 NUCLEO-G070RB driving a servo-actuated balancing rod, with orientation provided by an ICM-20948 9-DoF IMU over SPI. Our first firmware revision read raw accelerometer and gyroscope data and ran a Madgwick filter on the MCU to compute pitch. It worked — but the latency was brutal. Pitch corrections were arriving with up to 5 seconds of lag, causing tip-overs before the servo could react. The fix was offloading quaternion fusion entirely to the ICM-20948's onboard Digital Motion Processor (DMP). The DMP outputs ready-to-use quaternions directly at the SPI interface, cutting control-loop latency to under 100 ms — a greater than 95% reduction — and tip-overs from delayed correction stopped immediately.

Control is a PI loop running on the MCU. We started with a full PID, but the derivative term introduced sustained oscillations across both bridge configurations — the rope's compliance amplified Kd's response to high-frequency disturbances in a way that was difficult to tune out. Dropping D and retuning to Kp=1.5, Ki=0.02 gave clean convergence to less than 3° steady-state error.

The chassis went through two full Fusion 360 design iterations. The first was an enclosed high-wall box structure — rigid, but too heavy and with a centre of mass too high for reliable single-axis balancing. The second moved to an open multi-level layout: heavy components mounted low, electronics elevated, and strict longitudinal symmetry enforced to keep the CoM on the rail axis. That symmetry turned out to be more important than expected — even a few millimetres of lateral offset introduced a lean bias the PI controller couldn't fully reject.

Validation progressed from a dual-anchor string (more forgiving, less compliance) to a single-anchor attachment (much more sway and disturbance). Final testing confirmed repeatable autonomous bridge traversal under single-anchor conditions — the harder of the two configurations.`,
      // Drop project images into public/projects/ and list filenames below:
      images: [],
      links: [
        { label: 'Cart Overview', href: 'https://youtube.com/shorts/9KmyEsKY3r4' },
        { label: 'Demo Videos', href: 'https://drive.google.com/drive/folders/1WdUrfUVB392MwbkiYOgDXzXlVdmxJXj8' },
        { label: 'Final Report', href: 'https://drive.google.com/file/d/1eHVN0l3nveRTs42LLFuMdob11xppMMwQ/view' },
      ],
    },
  },
  {
    title: 'Current Sensing PCB',
    tools: ['EAGLE PCB', 'PSpice', 'STM32G051', 'Op-Amp Design', 'Active LPF'],
    description:
      'Custom 2-layer PCB for a DC power supply current-sense path — non-inverting summing op-amp topology maps 0–3.5 A to STM32 ADC range, with a 3rd-order active Butterworth LPF at 5 kHz providing −35 dB switching-noise rejection. R²=0.999 calibration linearity.',
    github: 'https://github.com/manansawrangpate/dc-power-supply-current-sense',
    details: {
      overview:
`This project came from a real gap in our adjustable DC power supply: it had no visibility into how much current was actually flowing to the load. We needed a sense circuit that could accurately map 0–3.5 A to a voltage range the STM32's ADC could read — without being corrupted by the switching noise the supply's regulator generates on every cycle.

The analog front end uses a low-side shunt resistor with a non-inverting summing amplifier topology. An op-amp buffer offset stage shifts the shunt differential voltage into the STM32G051 ADC's 0.25–3.3 V input window — the 0.25 V floor keeps the signal clear of ground noise at the low end, and the 3.3 V ceiling leaves headroom before clipping. Getting the gain and offset biasing right took several PSpice iterations before the schematic was ready for layout.

Switching noise was the main adversary. The regulator generates harmonic content above 5 kHz that, if it reaches the ADC, causes aliasing and false current readings. We designed a 3rd-order active Butterworth low-pass filter at 5 kHz — providing −35 dB attenuation at the switching frequency. The choice of 3rd order over a simpler 1st or 2nd order was deliberate: we needed the steeper roll-off to achieve sufficient attenuation within a tight frequency band around the switching fundamental.

Translating the schematic to a 2-layer PCB in EAGLE meant thinking carefully about current paths. High-current traces — the shunt and supply return — were kept short and wide; the analog signal path was routed away from those traces, with a solid ground pour providing shielding between them. Component keepout regions around the op-amp inputs prevented accidental coupling from adjacent leads.

After assembly and soldering, we built STM32G051 calibration firmware that maps ADC readings to load current via a lookup table, achieving R²=0.999 linearity across the full 0–3.5 A range. A rotary encoder sets the target output and an LCD shows real-time voltage and current. Oscilloscope measurements under step-load conditions confirmed −35 dB attenuation at 5 kHz and under 250 mV output noise. We did catch one discrepancy: a ground-related ripple appeared near the filter cutoff that wasn't present in simulation, traceable to a shared ground return path between the analog and digital sections — a useful lesson for future mixed-signal PCB layout.`,
      images: [
        'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/PCB_Eagle_layout.png',
        'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/Mounted_PCB_photo.png',
        'https://raw.githubusercontent.com/manansawrangpate/dc-power-supply-current-sense/main/images/Backside_of_PCB.png',
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
