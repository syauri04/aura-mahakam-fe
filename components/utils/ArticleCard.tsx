import Image from "next/image";

interface ArticleCardProps {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  date?: string;
  summary?: string;
  href?: string;
}

export default function ArticleCard({
  imageSrc,
  imageAlt = "article image",
  title,
  date,
  summary,
  href = "#",
}: ArticleCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col h-full bg-transparent cursor-pointer"
    >
      {/* Image */}
      <div className="relative w-full rounded-[10px] overflow-hidden aspect-square">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 50vw, 325px"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 pt-3">
        {/* Title */}
        {title && (
          <h3 className="font-jakarta font-bold text-2xl text-black leading-snug line-clamp-3 min-h-[64px] group-hover:underline">
            {title}
          </h3>
        )}

        {/* Date */}
        <div className="min-h-[18px] mt-2">
          {date && (
            <p className="font-jakarta text-black font-bold text-sm uppercase tracking-wide">
              {date}
            </p>
          )}
        </div>

        {/* Summary */}
        <p className="font-jakarta text-base leading-6 text-black line-clamp-3 mt-3 flex-1">
          {summary}
        </p>
      </div>
    </a>
  );
}
