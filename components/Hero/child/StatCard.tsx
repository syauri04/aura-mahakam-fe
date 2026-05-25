"use client";

import { useEffect, useRef } from "react";
import { useInView, animate } from "framer-motion";

interface StatCardProps {
  /** Nilai numerik akhir animasi, e.g. 100, 1000, 10200 */
  targetValue: number;
  /** Label di bawah angka */
  label: string;
  /**
   * Fungsi format tampilan selama animasi.
   * Menerima nilai saat ini (float) dan mengembalikan string.
   */
  format: (value: number) => string;
  /** Durasi animasi count-up dalam detik (default: 2) */
  duration?: number;
}

export default function StatCard({
  targetValue,
  label,
  format,
  duration = 2,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || !numberRef.current) return;

    const el = numberRef.current;

    const controls = animate(0, targetValue, {
      duration,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      onUpdate(value) {
        el.textContent = format(value);
      },
    });

    return () => controls.stop();
  }, [isInView, targetValue, duration, format]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-4 bg-white rounded-[10px] px-6 py-10 md:py-12"
    >
      {/* Number */}
      <span
        ref={numberRef}
        className="font-staatliches font-black text-black text-center block"
        style={{ fontSize: "clamp(56px, 8vw, 96px)", lineHeight: 1 }}
      >
        {format(0)}
      </span>

      {/* Label */}
      <span
        className="font-staatliches font-bold text-black text-center uppercase tracking-wider block"
        style={{ fontSize: "clamp(20px, 3vw, 32px)", lineHeight: 1 }}
      >
        {label}
      </span>
    </div>
  );
}
