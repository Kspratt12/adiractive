"use client";

import { motion } from "framer-motion";

const petals = [
  { x: "3%", delay: 0, duration: 3.5, size: 18, startY: -30, endY: 70, rot: [-30, 45, -15], sway: 15 },
  { x: "10%", delay: 0.3, duration: 4, size: 14, startY: -20, endY: 80, rot: [20, -40, 30], sway: -20 },
  { x: "18%", delay: 0.8, duration: 3.2, size: 20, startY: -40, endY: 65, rot: [-50, 20, -35], sway: 12 },
  { x: "26%", delay: 0.1, duration: 3.8, size: 12, startY: -15, endY: 85, rot: [40, -20, 55], sway: -18 },
  { x: "34%", delay: 0.6, duration: 3.4, size: 22, startY: -35, endY: 60, rot: [-15, 60, -25], sway: 22 },
  { x: "42%", delay: 1.0, duration: 4.2, size: 16, startY: -25, endY: 75, rot: [55, -30, 40], sway: -14 },
  { x: "50%", delay: 0.4, duration: 3.6, size: 19, startY: -30, endY: 70, rot: [-40, 35, -50], sway: 16 },
  { x: "58%", delay: 0.9, duration: 3.3, size: 13, startY: -20, endY: 80, rot: [30, -55, 20], sway: -20 },
  { x: "66%", delay: 0.2, duration: 4.1, size: 21, startY: -40, endY: 65, rot: [-25, 45, -10], sway: 18 },
  { x: "74%", delay: 0.7, duration: 3.5, size: 15, startY: -15, endY: 85, rot: [50, -15, 60], sway: -12 },
  { x: "82%", delay: 0.5, duration: 3.9, size: 17, startY: -35, endY: 70, rot: [-60, 25, -40], sway: 14 },
  { x: "90%", delay: 1.1, duration: 3.7, size: 11, startY: -25, endY: 90, rot: [15, -45, 35], sway: -16 },
  { x: "7%", delay: 1.3, duration: 4.0, size: 10, startY: -10, endY: 88, rot: [35, -60, 25], sway: 10 },
  { x: "45%", delay: 0.15, duration: 3.1, size: 23, startY: -45, endY: 55, rot: [-20, 50, -30], sway: -22 },
  { x: "78%", delay: 0.85, duration: 3.8, size: 14, startY: -28, endY: 78, rot: [45, -25, 55], sway: 20 },
];

const pinkShades = [
  "rgba(232, 68, 122, 0.22)",
  "rgba(240, 166, 176, 0.28)",
  "rgba(249, 198, 211, 0.30)",
  "rgba(212, 99, 122, 0.20)",
  "rgba(232, 68, 122, 0.16)",
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

interface PetalDividerProps {
  flip?: boolean;
}

export default function PetalDivider({ flip = false }: PetalDividerProps) {
  return (
    <div
      className={`relative w-full h-20 sm:h-24 lg:h-28 overflow-hidden pointer-events-none select-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{
            y: petal.startY,
            x: 0,
            rotate: petal.rot[0],
            opacity: 0,
          }}
          whileInView={{
            y: petal.endY,
            x: [0, petal.sway, -petal.sway * 0.5, petal.sway * 0.3, 0],
            rotate: petal.rot,
            opacity: [0, 0.8, 1, 1, 0.6],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1,
          }}
          viewport={{ once: false, margin: "50px" }}
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
