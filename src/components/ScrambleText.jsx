import React, { useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Decodes `text` from random glyphs into the final string, left to right.
 * Mirrors the "scramble reveal" headline effect from the reference video.
 */
export default function ScrambleText({
  text,
  as: Tag = 'span',
  className = '',
  play = true,
  duration = 900,
  delay = 0,
  onDone
}) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!play) {
      setDisplay(text);
      return;
    }

    let cancelled = false;
    const timeoutId = setTimeout(() => {
      startRef.current = null;

      const tick = (now) => {
        if (cancelled) return;
        if (startRef.current === null) startRef.current = now;
        const elapsed = now - startRef.current;
        const progress = Math.min(1, elapsed / duration);
        const revealCount = Math.floor(progress * text.length);

        let next = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === ' ') {
            next += ' ';
          } else if (i < revealCount) {
            next += ch;
          } else {
            next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(next);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
          onDone && onDone();
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, play]);

  return <Tag className={className}>{display}</Tag>;
}
