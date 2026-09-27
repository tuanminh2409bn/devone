'use client';

import { motion } from 'motion/react';
import { useMotionPreference } from './motion-controls';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { reduced, paused } = useMotionPreference();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced || paused ? undefined : { y: [24, 0], rotateX: [4, 0], opacity: [0.65, 1] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
