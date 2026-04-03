"use client";

import { motion } from "framer-motion";

// Each petal is a unique SVG shape with slight variations
const petals = [
  { x: "5%", y: "20%", rot: -25, scale: 0.7, delay: 0 },
  { x: "15%", y: "60%", rot: 45, scale: 0.5, delay: 0.1 },
  { x: "25%", y: "10%", rot: -60, scale: 0.85, delay: 0.05 },
  { x: "35%", y: "50%", rot: 30, scale: 0.6, delay: 0.15 },
  { x: "45%", y: "25%", rot: -10, scale: 0.9, delay: 0.02 },
  { x: "55%", y: "65%", rot: 70, scale: 0.55, delay: 0.12 },
  { x: "65%", y: "15%", rot: -45, scale: 0.75, delay: 0.08 },
  { x: "75%", y: "55%", rot: 20, scale: 0.65, delay: 0.18 },
  { x: "85%", y: "30%", rot: -35, scale: 0.8, delay: 0.04 },
  { x: "92%", y: "70%", rot: 55, scale: 0.5, delay: 0.14 },
  { x: "10%", y: "80%", rot: 15, scale: 0.45, delay: 0.2 },
  { x: "50%", y: "75%", rot: -50, scale: 0.6, delay: 0.06 },
];

function PetalSVG({ variant = 0 }: { variant?: number }) {
  const shapes = [
    // Rounded petal
    <path
      key="a"
      d="M12 2C6.5 2 2 8 2 14c0 4 3 8 10 8s10-4 10-8c0-6-4.5-12-10-12z"
      fill="currentColor"
    />,
    // Elongated petal
    <path
      key="b"
      d="M12 1C8 1 4 6 3 12c-1 5 2 9 9 11 7-2 10-6 9-11C20 6 16 1 12 1z"
      fill="currentColor"
    />,
    // Curled petal
    <path
      key="c"
      d="M14 2C8 3 3 8 2 13c-1 4 2 7 8 9 3-1 6-3 7-6 2-4 1-9-3-14z"
      fill="currentColor"
    />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      {shapes[variant % 3]}
    </svg>
  );
}

interface PetalDividerProps {
  flip?: boolean;
}

export default function PetalDivider({ flip = false }: PetalDividerProps) {
  return (
    <div
      className={`relative w-full h-16 sm:h-20 lg:h-24 overflow-hidden pointer-events-none select-none ${
        flip ? "rotate-180" : ""
      }`}
    >
      {petals.map((petal, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -10, rotate: petal.rot - 20 }}
          whileInView={{ opacity: 1, y: 0, rotate: petal.rot }}
          transition={{
            duration: 0.8,
            delay: petal.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, margin: "-20px" }}
          className="absolute"
          style={{
            left: petal.x,
            top: petal.y,
            width: `${petal.scale * 28}px`,
            height: `${petal.scale * 28}px`,
            transform: `rotate(${petal.rot}deg)`,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              color: i % 3 === 0
                ? "rgba(232, 68, 122, 0.18)"   // pink-hot
                : i % 3 === 1
                ? "rgba(240, 166, 176, 0.22)"   // blush
                : "rgba(249, 198, 211, 0.25)",  // pink-light
            }}
          >
            <PetalSVG variant={i} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
