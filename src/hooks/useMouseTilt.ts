"use client";

import { useState, useCallback, useRef } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  isHovered: boolean;
}

export function useMouseTilt(maxTilt: number = 12) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0, isHovered: false });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      setTilt({
        rotateX: -normY * maxTilt,
        rotateY: normX * maxTilt,
        isHovered: true,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, isHovered: false });
  }, []);

  return { containerRef, tilt, handleMouseMove, handleMouseLeave };
}
