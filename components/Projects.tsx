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
`This project initially began as a final course project in a group of two for ROB301: Introduction to Robotics. I later extended the initial software to ROS2 and tested it via simulation on Gazebo Harmonic. The goal was to design a fully autonomous mail delivery system: a robot that follows a line, figures out where it is using only onboard sensing, and delivers mail to a set of target offices without ever being told its starting location.

The track consisted of a closed loop of black tape with coloured paper markers scattered at fixed but arbitrary points along the track. Each marker corresponded to one of 12 numbered offices, but only four distinct colors were available, so color alone was never enough to tell offices apart (see map above). The robot started at an unknown office and was given a random set of targets to visit. It had to follow the line, localize itself using what it could see, and stop to perform a delivery action at each correct target, all without any external positioning system.

The core of the navigation stack is a discrete Bayesian localization filter developed in Python using rospy, which maintains a probability distribution over which office the robot is currently near. At every timestep it runs two steps: a predict step that updates the belief distribution using odometry, accounting for how far the robot has moved along the track; and an update step that corrects that belief using a measurement model, comparing the camera's observed RGB values against the expected color signature for each hypothesis.

One of the harder bugs came from how belief was propagated. In a standard Bayesian update, the posterior for each state is proportional to its prior belief multiplied by the likelihood of the new measurement. The problem is that this is a multiplication: if any state's belief ever reaches exactly 0.0, no future measurement can rescue it. Say office A sits at 0.4 belief and office B has dropped to 0.0. If the camera reading strongly favors B - likelihood(A) = 0.1 and likelihood(B) = 0.9 - the unnormalized results are A: 0.04 and B: 0.0. Office B stays at zero, even though it was the far more likely explanation. Once a hypothesis hit zero, it was permanently eliminated regardless of any future evidence.

The fix was to enforce a small floor on every state after each update: belief(x) = max(belief(x), 0.01). This guarantees no hypothesis can ever be driven to exactly zero, so every office remains recoverable if future measurements point back to it.

The line-following controller itself was a PID loop, tuned until it stayed robust across sharp curves and varying track geometry. The harder part was combining that with reliable color classification. Once the robot needed to distinguish between four marker colors accurately while still moving smoothly, small perception errors started feeding directly into the localization filter, which is what made the belief-flooring fix necessary in the first place.

I later ported the software to ROS2 and rebuilt the environment in Gazebo Harmonic to continue iterating in simulation. This surfaced a new problem: early on, the robot's belief distribution stayed too ambiguous to act on confidently until it had physically traversed the entire loop at least once. The fix was to split each delivery run into two phases. In the first phase, the robot traverses the track and lets its belief distribution converge after a full loop. Only in the second phase does it act on that confidence and navigate to each target office to complete deliveries. [Demo Video]`,
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
`This project was a final project for MIE438: Embedded Systems, built with a team of four. The goal was to cross a flexible rope bridge without flipping over. The design was inspired by tightrope walkers, who carry a long pole and shift it side to side to lower their effective center of gravity and maintain balance. This was translated onto a two-wheeled cart using a mounted beam that shifts left and right in real time, serving the same function as a tightrope walker's pole. I was responsible for the IMU communications, embedded systems integration, and control tuning within the team.

One challenge during this project was the initial weight and asymmetry of the chassis. The first version was a compact, mostly enclosed 3D-printed shell that ended up heavier than necessary, with the battery and STM32 positioned high in the structure. This raised the center of mass and worked against the balancing beam rather than supporting it. In response, the team developed a second version that opened up the structure, removed unnecessary walls, and stacked components by weight from bottom to top: battery, then microcontroller, then beam. Asymmetry of even a few millimeters in the print introduced a lean bias that prevented the PID controller from converging, so the final layout was built around strict centerline symmetry.

With the mechanical design addressed, another issue was orientation computation. The initial firmware used a Madgwick filter on the STM32 to fuse raw accelerometer, gyroscope, and magnetometer data into a pitch estimate. This introduced a multi-second lag between the cart tilting and the controller registering the change, causing the cart to lose balance before a correction could be applied. The fix was to offload sensor fusion to the ICM-20948 IMU's onboard Digital Motion Processor, which performs quaternion-based fusion in hardware and outputs orientation data directly over SPI. Accessing the DMP through the SparkFun library, rather than fusing raw sensor data on the microcontroller, reduced control loop latency enough for corrections to arrive before a tilt became a fall.

Control tuning followed a similar pattern. The initial controller used full PID for the balancing servo, but on the rail the derivative term amplified noise from the compliant rope bridge and the cart's own wheel motion, introducing jitter into the pitch signal. This caused the beam to overcorrect and oscillate with increasing amplitude instead of settling. Removing the derivative term and running P and I alone eliminated the oscillation. Integral windup was a concern during design, but traversal time was short enough that error accumulation never became significant.

Testing difficulty was controlled through the rail's string anchor points. The two supporting frames were connected with tensioned string, and moving the anchor points from two spread-out positions to a single fixed point per side reduced the rail's stability margin, collapsing the bridge's balance point onto a single line instead of a stable region. With a symmetric chassis, DMP-based orientation sensing, and a tuned PI controller, the cart achieved an 80% completion rate consistently across trials.

My biggest learning across this project was that control-level problems often originated at a different layer of the system. Mechanical symmetry was a precondition for PID convergence, and the orientation lag was a sensor fusion problem rather than a control tuning problem. Addressing the underlying layer directly resolved issues that iterative controller tuning alone could not.`,
      images: [
        { src: 'Screenshot 2026-07-18 191648.png', caption: 'Overview of the Dynamic Stability Cart' },
        { src: 'Screenshot 2026-07-19 134344.png', caption: 'Top View of Cart with Balancing Beam' },
        { src: 'Screenshot 2026-07-19 134305.png', caption: 'L-Rail Bridge the Cart Had to Cross' },
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
`This project was part of MIE366: Electronics for Robotics, completed in a group of two. The aim was to develop a robust current sensing system for an adjustable DC power supply. More specifically, the goal was to design a sense circuit that could accurately map 0 to 3.5 A into a voltage range the STM32's ADC could read, without that signal being corrupted by the switching noise the supply's own regulator generates on every cycle.

One challenge was getting the analog front end right. The design used a low-side shunt resistor paired with a non-inverting summing amplifier topology, with an op-amp buffer offset stage shifting the shunt differential voltage into the STM32G051 ADC's 0.25 to 3.3 V input window. The 0.25 V floor kept the signal clear of ground noise at the low end, and the 3.3 V ceiling left headroom before clipping. Landing on the correct gain and offset biasing took several PSpice iterations before the schematic was stable enough to move to layout.

Another challenge was switching noise. The regulator generates harmonic content above 5 kHz that, if it reached the ADC, caused aliasing and false current readings. To resolve this, the sensing circuit was paired with a low-pass filter set at 5 kHz, providing 35 dB of attenuation at the switching frequency. Choosing a 3rd order filter over a simpler 1st or 2nd order design was a deliberate tradeoff: the steeper roll-off was needed to achieve sufficient attenuation within a tight frequency band around the switching fundamental, given how close the signal band sat to the noise source.

From there, the schematic was translated into a 2-layer PCB in EAGLE and sent off for manufacture.

Once the physical PCB arrived, I tested it node by node, which surfaced its own set of manufacturing issues, before integrating it with the larger power supply system. Some components appeared correctly soldered and passed visual inspection but showed no continuity when checked with a multimeter. Debugging these issues was difficult, and required node-by-node analysis to isolate component-specific faults rather than relying on a single system-level test.

The final product is a functioning current sensing system built around STM32G051 calibration firmware that maps ADC readings to load current through a lookup table, achieving R² = 0.999 linearity across the full 0 to 3.5 A range. A rotary encoder sets the target output, and an LCD displays real-time voltage and current. Oscilloscope measurements under step-load conditions confirmed the expected 35 dB attenuation at 5 kHz and under 250 mV of output noise.

The biggest learning from this project was the sheer difference between physical hardware and simulation. Once the PCB came back from manufacturing, small issues surfaced constantly, and resolving them required extensive, precise, step-by-step debugging to narrow down root causes. That debugging methodology is what I carry forward into every project since.`,
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
