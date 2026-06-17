import Image from "next/image";
import Link from "next/link";

interface AlertCardProps {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  summary: string;
  petisiHref?: string;
  actionHref: string;
  actionLabel?: string;
}

export default function AlertCard({
  imageSrc,
  imageAlt = "alert image",
  title,
  summary,
  petisiHref = "#",
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
      {/* Image — link ke detail */}
      <Link
        href={petisiHref}
        className="relative w-full h-[220px] sm:w-[325px] sm:h-auto sm:aspect-square shrink-0 block overflow-hidden group"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover rounded-[10px] transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 325px"
        />
      </Link>

      {/* Text Content */}
      <div className="flex flex-col justify-between gap-4 p-5 sm:p-6 flex-1">
        <div className="flex flex-col gap-3">
          {/* Title — link ke detail dengan underline on hover */}
          <Link
            href={petisiHref}
            className="font-jakarta font-bold text-black hover:underline underline-offset-2 no-underline transition-all"
            style={{ fontSize: "24px", lineHeight: "32px" }}
          >
            {title}
          </Link>

          <p className="font-jakarta text-base leading-6 text-black">
            {summary}
          </p>
        </div>

        {/* CTA Button — link ke link_petisi external */}
        <div>
          <Link
            href={actionHref}
            target="_blank"
            rel="noopener noreferrer"
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
