import Image from "next/image";
import Link from "next/link";

interface AlertCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  summary: string;
  /** URL untuk tombol "Ikut Beraksi" */
  actionHref: string;
  /** Label tombol (default: "Ikut Beraksi") */
  actionLabel?: string;
}

export default function AlertCard({
  imageSrc,
  imageAlt = "alert image",
  title,
  summary,
  actionHref,
  actionLabel = "Ikut Beraksi",
}: AlertCardProps) {
  return (
    <div
      className="flex flex-col sm:flex-row items-stretch rounded-[10px] overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* ── Image ────────────────────────────────
          Mobile  : full width, fixed height 220px
          sm+     : fixed square 325×325, shrink-0
      ─────────────────────────────────────────── */}
      <div className="relative w-full h-[220px] sm:w-[325px] sm:h-auto sm:aspect-square shrink-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 325px"
        />
      </div>

      {/* ── Text Content ─────────────────────── */}
      <div className="flex flex-col justify-between gap-4 p-5 sm:p-6 flex-1">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <h3
            className="font-jakarta font-bold text-black"
            style={{ fontSize: "24px", lineHeight: "32px" }}
          >
            {title}
          </h3>

          {/* Summary */}
          <p className="font-jakarta text-base leading-6 text-black">
            {summary}
          </p>
        </div>

        {/* CTA Button */}
        <div>
          <Link
            href={actionHref}
            className="inline-block font-jakarta text-base leading-none text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-200 hover:opacity-85"
            style={{ backgroundColor: "#00C4B4" }}
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
