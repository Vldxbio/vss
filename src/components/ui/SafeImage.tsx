"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

interface SafeImageProps extends Omit<ImageProps, "onError" | "src"> {
  src: string;
  fallbackSrc?: string;
}

export function SafeImage({ src, alt, fallbackSrc, className, ...props }: SafeImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setError(false);
    setLoaded(false);
  }, [src]);

  if (error) {
    return (
      <div className={`relative w-full h-full bg-vss-graphite flex items-center justify-center overflow-hidden ${className || ""}`}>
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.02) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0.02) 75%, transparent 75%)`,
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative text-center">
          <div className="text-display text-3xl md:text-5xl font-bold text-vss-smoke tracking-tightest">
            VSS
          </div>
          <div className="text-[8px] font-mono tracking-widest text-vss-fog mt-1">
            NO IMAGE
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className={`absolute inset-0 bg-vss-graphite animate-pulse ${className || ""}`} />
      )}
      <Image
        {...props}
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`${className || ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      />
    </>
  );
}