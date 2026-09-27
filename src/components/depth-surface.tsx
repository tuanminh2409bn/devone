'use client';

import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useMotionPreference } from './motion-controls';

/** Perspective stays outside the transformed layer so hit targets remain stable. */
export function DepthSurface({
  children,
  className = '',
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const visible = useInView(host, { margin: '40px' });
  const { paused, reduced } = useMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 150, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 150, damping: 24 });
  const enabled = !paused && !reduced;
  function reset() {
    x.set(0);
    y.set(0);
  }
  return (
    <div
      ref={host}
      className={`depth-surface ${className}`}
      data-in-view={visible}
      onPointerMove={(event) => {
        if (!enabled || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((0.5 - (event.clientY - rect.top) / rect.height) * strength * 2);
        y.set(((event.clientX - rect.left) / rect.width - 0.5) * strength * 2);
      }}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
    >
      <motion.div
        className="depth-surface-inner"
        style={{ rotateX: enabled ? rotateX : 0, rotateY: enabled ? rotateY : 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
