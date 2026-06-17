import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { SubKegiatan, KegiatanThemeDefault } from "@/services/types/kegiatan";

interface FestivalLayoutProps {
  data: SubKegiatan;
}

export default function FestivalLayout({ data }: FestivalLayoutProps) {
  const d = data as KegiatanThemeDefault;
  const article = d.content_suara;

  if (!article) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="bg-[#F7F7F7] py-10">
      <div className="max-w-[775px] mx-auto">
        <div className="px-6">
          <div className="mb-3">
            <p className="text-base leading-6 uppercase font-jakarta font-bold text-black">
              {article.type}
            </p>
            <div className="mt-2 font-jakarta text-black/40">
              {formatDate(article.datePost ?? article.createdAt)}
            </div>
          </div>

          <h1 className="text-[32px] leading-[40px] font-bold font-jakarta text-black my-10">
            {article.title}
          </h1>
        </div>

        {/* Content — markdown */}
        <div className="prose prose-base max-w-none font-jakarta text-black px-6">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Button — link ke detail artikel */}
        <div className="flex justify-center mt-16 px-6">
          <Link
            href={`/suara-mahakam/${article.type}/${article.slug}`}
            className="bg-purple-light hover:opacity-90 transition-all duration-300 text-white text-base font-bold font-jakarta px-8 py-3 rounded-full uppercase"
          >
            Siaran Pers
          </Link>
        </div>
      </div>
    </section>
  );
}
