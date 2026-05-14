"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let rafId: number;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    const ease = 0.1;

    const onScroll = () => {
      targetScroll = window.scrollY;
    };

    const updateScroll = () => {
      currentScroll += (targetScroll - currentScroll) * ease;
      if (Math.abs(targetScroll - currentScroll) > 0.1) {
        rafId = requestAnimationFrame(updateScroll);
      }
    };

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}