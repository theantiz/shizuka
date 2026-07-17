'use client';

import { motion } from 'framer-motion';
import { SakuraIcon } from '@/components/SakuraIcon';

interface BrandingHeaderProps {
  compact?: boolean;
}

export function BrandingHeader({ compact = false }: BrandingHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-center gap-3">
        <SakuraIcon className={compact ? 'h-7 w-7' : 'h-10 w-10'} />
        <h1
          className={
            compact
              ? 'font-jp text-3xl font-bold tracking-tight text-sakura-700'
              : 'font-jp text-5xl font-bold tracking-tight text-sakura-700 sm:text-6xl'
          }
        >
          シズカ
        </h1>
        <SakuraIcon className={compact ? 'h-7 w-7' : 'h-10 w-10'} />
      </div>
      <p
        className={
          compact
            ? 'mt-1 text-sm font-medium text-sakura-600'
            : 'mt-2 text-lg font-medium text-sakura-600'
        }
      >
        Shizuka – AI Email Assistant
      </p>
      <p className="font-jp text-sm text-muted-foreground">AIメールアシスタント</p>
    </motion.div>
  );
}
