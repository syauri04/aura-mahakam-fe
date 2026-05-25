"use client";

export default function HeroContentPages({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-[2] w-full max-w-[1400px]  mx-auto px-6 flex flex-col pt-27 pb-20  gap-10">
      {children}
    </div>
  );
}
