import Image from "next/image";

interface SectionTitleProps {
  iconSrc: string;
  iconAlt?: string;
  title: string;
}

export default function SectionTitle({
  iconSrc,
  iconAlt = "section icon",
  title,
}: SectionTitleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[64px] h-[64px] shrink-0">
        <Image
          src={iconSrc}
          alt={iconAlt}
          fill
          className="object-contain"
          sizes="64px"
        />
      </div>
      <h2 className="font-staatliches uppercase text-[64px] leading-[64px] text-black">
        {title}
      </h2>
    </div>
  );
}
