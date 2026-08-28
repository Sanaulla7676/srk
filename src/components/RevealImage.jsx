import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Masked image reveal for large editorial fashion imagery: clip-path
 * sweeps up from the bottom while the image settles from a soft blur
 * and a slight over-scale into full focus. The wrapping element keeps
 * its border radius throughout since the mask is applied to the image,
 * not the container.
 */
export default function RevealImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  duration = 0.9,
  delay = 0,
  once = true,
  amount = 0.2,
  children
}) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion
    ? { opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)' }
    : { opacity: 0, scale: 1.04, clipPath: 'inset(100% 0 0 0)', filter: 'blur(14px)' };

  const target = { opacity: 1, scale: 1, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)' };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        initial={initial}
        whileInView={target}
        viewport={{ once, amount }}
        transition={{ duration, delay, ease: EASE }}
      />
      {children}
    </div>
  );
}
