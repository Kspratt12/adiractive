"use client";

import { motion } from "framer-motion";

const petals = [
  { x: "2%", delay: 0, dur: 3.2, size: 22, endY: 65, rot: [-30, 50, -10], sway: 18 },
  { x: "8%", delay: 0.4, dur: 3.8, size: 16, endY: 80, rot: [25, -40, 35], sway: -22 },
  { x: "14%", delay: 0.1, dur: 3.5, size: 26, endY: 55, rot: [-55, 20, -30], sway: 14 },
  { x: "20%", delay: 0.7, dur: 4.0, size: 14, endY: 85, rot: [40, -20, 55], sway: -16 },
  { x: "26%", delay: 0.2, dur: 3.3, size: 20, endY: 70, rot: [-15, 60, -25], sway: 20 },
  { x: "32%", delay: 0.9, dur: 3.6, size: 18, endY: 60, rot: [50, -30, 45], sway: -12 },
  { x: "38%", delay: 0.3, dur: 4.1, size: 24, endY: 75, rot: [-45, 35, -50], sway: 16 },
  { x: "44%", delay: 1.0, dur: 3.4, size: 15, endY: 82, rot: [30, -55, 20], sway: -20 },
  { x: "50%", delay: 0.15, dur: 3.7, size: 28, endY: 58, rot: [-25, 45, -10], sway: 22 },
  { x: "56%", delay: 0.6, dur: 3.9, size: 17, endY: 78, rot: [55, -15, 60], sway: -14 },
  { x: "62%", delay: 0.05, dur: 3.2, size: 21, endY: 68, rot: [-60, 25, -40], sway: 18 },
  { x: "68%", delay: 0.8, dur: 4.2, size: 13, endY: 88, rot: [15, -45, 35], sway: -16 },
  { x: "74%", delay: 0.35, dur: 3.5, size: 25, endY: 62, rot: [35, -60, 25], sway: 12 },
  { x: "80%", delay: 0.55, dur: 3.8, size: 19, endY: 72, rot: [-20, 50, -30], sway: -20 },
  { x: "86%", delay: 0.25, dur: 3.4, size: 23, endY: 55, rot: [45, -25, 55], sway: 18 },
  { x: "92%", delay: 0.75, dur: 4.0, size: 16, endY: 85, rot: [-35, 40, -15], sway: -14 },
  { x: "5%", delay: 1.2, dur: 3.6, size: 20, endY: 70, rot: [20, -50, 30], sway: 16 },
  { x: "35%", delay: 1.1, dur: 3.3, size: 22, endY: 65, rot: [-40, 30, -55], sway: -18 },
  { x: "65%", delay: 0.95, dur: 3.7, size: 18, endY: 75, rot: [50, -35, 40], sway: 14 },
  { x: "95%", delay: 0.45, dur: 3.9, size: 14, endY: 82, rot: [-25, 55, -20], sway: -12 },
];

const pinkShades = [
  "rgba(232, 68, 122, 0.25)",
  "rgba(240, 166, 176, 0.32)",
  "rgba(249, 198, 211, 0.35)",
  "rgba(212, 99, 122, 0.22)",
  "rgba(199, 56, 102, 0.20)",
];

function PetalShape({ variant }: { variant: number }) {
  const paths = [
    "M12 2C7 2 3 7 2 12c-.8 4.5 1.5 8 9 10 2.5-.5 5-2 6.5-4.5 2.5-4 2-10-5.5-15.5z",
    "M14 1C9 2 4 7 3 13c-1 5 2.5 8 9 9.5 5-1.5 8-5 8-10C20 7 18 2 14 1z",
    "M11 2C6.5 3 2.5 8.5 2 14c-.4 4 2 7 8 8.5 4-1 7-4 8-8 1.5-5 0-10-7-12.5z",
    "M13 1.5C8 2 3.5 6.5 2.5 12c-1 5 1 8.5 8.5 10 6-1 9.5-5.5 9-11-.5-5-3-8.5-7-9.5z",
    "M12 2C7.5 2.5 3 8 2 13.5c-.7 4 2 7.5 9 9 3-1 5.5-3 7-6 2-4.5 1-10-6-14.5z",
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-sm">
      <path d={paths[variant % paths.length]} fill="currentColor" />
    </svg>
  );
}

export default function PetalDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`relative w-full h-24 sm:h-28 lg:h-32 overflow-hidden pointer-events-none select-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{
            y: -20,
            x: 0,
            rotate: petal.rot[0],
            opacity: 0,
          }}
          whileInView={{
            y: petal.endY,
            x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.3, 0],
            rotate: petal.rot,
            opacity: [0, 1, 1, 0.8, 0.4],
          }}
          transition={{
            duration: petal.dur,
            delay: petal.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          viewport={{ once: false, margin: "100px" }}
          className="absolute"
          style={{
            left: petal.x,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            color: pinkShades[i % pinkShades.length],
          }}
        >
          <PetalShape variant={i} />
        </motion.div>
      ))}
    </div>
  );
}
