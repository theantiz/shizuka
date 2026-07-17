'use client';

import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

export function SakuraIcon({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: [0, 8, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className={className}
    >
      <Flower2 className="h-full w-full text-sakura-500" strokeWidth={1.5} />
    </motion.div>
  );
}
