import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Generic scroll/entrance reveal: fade + upward translate.
 * Use `mode="load"` for above-the-fold content that should animate on
 * mount instead of waiting for scroll (e.g. hero copy).
 */
export default function Reveal({
  as: Tag = 'div',
  children,
  className = '',
  delay = 0,
  y = 24,
  duration = 0.7,
  mode = 'scroll',
  once = true,
  amount = 0.3
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const initial = { opacity: 0, y };
  const target = { opacity: 1, y: 0 };
  const transition = { duration, delay, ease: EASE };

  if (mode === 'load') {
    return (
      <MotionTag className={className} initial={initial} animate={target} transition={transition}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={initial}
      whileInView={target}
      viewport={{ once, amount }}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
