'use client';

import { useEffect, useRef } from 'react';

const SIZE = 400; // logical canvas size in px
const SEGMENT = 60; // length of each arm segment
const JOINTS = 5;

// Per-joint oscillation config: frequency (Hz), amplitude (rad), phase, base angle.
const JOINT_CONFIG = [
  { freq: 0.4, amp: 0.5, phase: 0.0, base: -Math.PI / 2 },
  { freq: 0.7, amp: 0.6, phase: 1.0, base: 0.4 },
  { freq: 1.1, amp: 0.7, phase: 2.1, base: -0.5 },
  { freq: 0.9, amp: 0.8, phase: 0.6, base: 0.6 },
  { freq: 1.3, amp: 0.6, phase: 3.0, base: -0.3 },
];

const GREEN = '#00c896';

export default function KinematicArm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI displays.
    const dpr = window.devicePixelRatio || 1;
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const baseX = SIZE / 2;
    const baseY = SIZE - 40; // center-bottom

    const draw = (timeSec: number) => {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.globalAlpha = 0.6;

      let x = baseX;
      let y = baseY;
      let cumulativeAngle = 0;

      // Base joint
      drawJoint(ctx, x, y);

      for (let i = 0; i < JOINTS; i++) {
        const c = JOINT_CONFIG[i];
        const angle =
          c.base + c.amp * Math.sin(2 * Math.PI * c.freq * timeSec + c.phase);
        cumulativeAngle += angle;

        const nx = x + SEGMENT * Math.cos(cumulativeAngle);
        const ny = y + SEGMENT * Math.sin(cumulativeAngle);

        // Segment
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = GREEN;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Joint at the new endpoint
        drawJoint(ctx, nx, ny);

        x = nx;
        y = ny;
      }

      ctx.globalAlpha = 1;
    };

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      // Draw a single static pose.
      draw(0);
      return;
    }

    let rafId: number;
    let start: number | null = null;

    const loop = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = (ts - start) / 1000;
      draw(elapsed);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{ width: SIZE, height: SIZE }}
    />
  );
}

function drawJoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fillStyle = GREEN;
  ctx.fill();
}
