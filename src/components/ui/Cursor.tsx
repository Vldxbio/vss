"use client";

import { useEffect, useState, useRef } from "react";

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-vss-paper rounded-full pointer-events-none z-[200] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 border border-vss-paper/40 rounded-full pointer-events-none z-[199] mix-blend-difference hidden md:block transition-[width,height] duration-300 ${
          isHovering ? "w-12 h-12" : "w-8 h-8"
        }`}
      />
    </>
  );
}