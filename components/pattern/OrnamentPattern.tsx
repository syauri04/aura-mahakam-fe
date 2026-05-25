import Image from "next/image";

/* ── Ornament pattern (top / bottom) ── */
export default function OrnamentPattern({
  flip = false,
  width = "max-w-[1400px]",
}: {
  flip?: boolean;
  width?: string;
}) {
  return (
    <div
      className={[
        `w-full ${width} mx-auto px-6 flex gap-6 py-10`,
        flip ? "scale-y-[-1]" : "",
      ].join(" ")}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className=" flex-1 ">
          <Image
            src="/assets/ornament-badge.png"
            alt=""
            width={320}
            height={87}
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}
