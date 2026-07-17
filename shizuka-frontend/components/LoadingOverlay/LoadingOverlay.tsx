'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SakuraIcon } from '@/components/SakuraIcon';

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* blur backdrop */}
          <div className="absolute inset-0 bg-sakura-50/30 backdrop-blur-md" />

          {/* loading card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="glass-card relative flex flex-col items-center gap-5 rounded-3xl border border-white/70 px-12 py-10 shadow-2xl shadow-sakura-300/40"
          >
            {/* rotating sakura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="h-16 w-16"
            >
              <SakuraIcon className="h-16 w-16" />
            </motion.div>

            {/* floating petals around icon */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute text-sakura-300"
                style={{ top: '50%', left: '50%' }}
                animate={{
                  x: [0, Math.cos((i * 2 * Math.PI) / 3) * 50],
                  y: [0, Math.sin((i * 2 * Math.PI) / 3) * 50],
                  opacity: [0.8, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeOut',
                }}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path
                    d="M12 2c2 3 5 4 5 8 0 2-2 4-5 4s-5-2-5-4c0-4 3-5 5-8z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
            ))}

            <div className="text-center">
              <p className="font-jp text-lg font-semibold text-sakura-700">
                生成中…
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Crafting your perfect reply
              </p>
            </div>

            {/* progress dots */}
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-sakura-400"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
