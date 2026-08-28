import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Very subtle scroll-linked drift for decorative shapes (circles, blobs,
 * large editorial images). `range` is the total travel in px (10-30px
 * per the brand's motion spec). Disabled entirely under
 * prefers-reduced-motion, returning a static 0 offset.
 */
export default function useParallax(range = 20) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-range / 2, range / 2]);
  return { ref, y };
}
