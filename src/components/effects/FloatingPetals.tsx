"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: string;
}

export default function FloatingPetals() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ["#A8B8A5", "#D9A5A5", "#D8B46A", "#E2DBD0"];
    const generated: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 14 + 8,
      duration: Math.random() * 18 + 12,
      delay: Math.random() * 5,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: "-10vh",
            rotate: p.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 8 : -8)}vw`, `${p.x}vw`],
            rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
            backgroundColor: p.color,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
