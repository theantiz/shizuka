'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface PetalProps {
  left: number;
  delay: number;
  duration: number;
  size: number;
}

function Petal({ left, delay, duration, size }: PetalProps) {
  return (
    <div
      className="absolute top-0"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `float-petal ${duration}s linear ${delay}s infinite`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <path
          d="M12 2c2 3 5 4 5 8 0 2-2 4-5 4s-5-2-5-4c0-4 3-5 5-8z"
          fill="#ffb3c8"
          opacity="0.7"
        />
        <path
          d="M12 14c-1 3-3 4-3 6 0 1 1 2 3 2s3-1 3-2c0-2-2-3-3-6z"
          fill="#ff9ab5"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

export function CherryBlossomBackground() {
  const petals = useMemo<PetalProps[]>(
    () =>
      Array.from({ length: 18 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 12,
        size: 12 + Math.random() * 18,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-sakura-gradient">
      {/* soft gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/60 via-white/20 to-blue-50/50" />

      {/* glowing orbs */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sakura-200/40 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-blue-100/40 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-sakura-100/50 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* falling petals */}
      <div className="absolute inset-0">
        {petals.map((p, i) => (
          <Petal key={i} {...p} />
        ))}
      </div>
    </div>
  );
}
