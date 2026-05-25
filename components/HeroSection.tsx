"use client";

export default function HeroSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative w-full min-h-[620px] flex items-center justify-center pt-28 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/banner-home.png')",
        }}
      />

      {/* Primary colour overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-dark to-purple-light opacity-60" />

      {/* Depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

      {/* ── Content ── */}
      {children}
    </section>
  );
}
