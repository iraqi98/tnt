"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

function getPrefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger index — delays the reveal by index * staggerMs, for cascading siblings. */
  index?: number;
  /** Delay step in ms applied per index. */
  staggerMs?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ScrollReveal({
  children,
  index = 0,
  staggerMs = 70,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(getPrefersReducedMotion);
  const [revealed, setRevealed] = useState(getPrefersReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setRevealed(true);
    };
    mq.addEventListener("change", handleChange);

    if (mq.matches) {
      return () => mq.removeEventListener("change", handleChange);
    }

    const el = ref.current;
    if (!el) {
      return () => mq.removeEventListener("change", handleChange);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  const revealStyle: CSSProperties = reducedMotion
    ? {}
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
        transitionDelay: revealed ? `${index * staggerMs}ms` : "0ms",
      };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...revealStyle, ...style }}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
