import Image from "next/image";
import Link from "next/link";
import { getStrapiImageUrl } from "@/services/strapi";
import {
  PetisiItem,
  RichTextBlock,
  RichTextChild,
} from "@/services/types/petisi";

// ─── Rich Text renderer ───────────────────────────────────────────────────────
function renderChildren(children: RichTextChild[]): string {
  return children
    .map((child) => {
      if (child.type === "text") {
        const text = child.text ?? "";
        return child.bold ? `<strong>${text}</strong>` : text;
      }
      if (child.children) return renderChildren(child.children);
      return "";
    })
    .join("");
}

function renderRichText(blocks: RichTextBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === "paragraph") {
        const inner = renderChildren(block.children);
        return inner.trim() ? `<p>${inner}</p>` : "";
      }
      if (block.type === "heading") {
        const inner = renderChildren(block.children);
        const level = (block as { level?: number }).level ?? 2;
        return `<h${level}>${inner}</h${level}>`;
      }
      if (block.type === "list") {
        const tag = block.format === "ordered" ? "ol" : "ul";
        return `<${tag}>${renderChildren(block.children)}</${tag}>`;
      }
      if (block.type === "list-item") {
        return `<li>${renderChildren(block.children)}</li>`;
      }
      return "";
    })
    .join("");
}

function formatDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function DetailPetisi({ data }: { data: PetisiItem }) {
  const imageUrl = getStrapiImageUrl(
    data.cover_image?.formats?.large?.url ?? data.cover_image?.url ?? null,
  );
  const contentHtml = renderRichText(data.content ?? []);

  return (
    <section className="bg-white py-20 relative overflow-auto">
      <div className="max-w-[775px] mx-auto">
        <div className="px-6">
          <h1 className="text-[32px] md:text-[56px] leading-[40px] md:leading-[64px] font-bold font-jakarta text-pink-neon">
            {data.title}
          </h1>

          <div className="flex items-center justify-between py-12">
            <div className="flex-row items-center space-y-3 gap-3">
              <p className="text-[32px] leading-[40px] uppercase font-jakarta font-bold text-black">
                {Number(data.jumlah_ttd).toLocaleString("id-ID")}
              </p>
              <div className="font-jakarta text-black text-sm leading-3.5">
                Tanda Tangan Terverifikasi
              </div>
            </div>
            <div>
              <Link
                href={data.link_petisi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-jakarta text-base leading-none text-white font-semibold px-6 py-3 rounded-full transition-opacity duration-200 hover:opacity-85"
                style={{ backgroundColor: "#00C4B4" }}
              >
                Ikut Beraksi
              </Link>
            </div>
          </div>
        </div>

        {imageUrl && (
          <div className="rounded-[10px] overflow-hidden mb-8">
            <Image
              src={imageUrl}
              alt={data.cover_image?.alternativeText ?? data.title}
              width={775}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        )}

        <div className="space-y-6 text-base leading-6 font-jakarta prose max-w-none text-black px-6">
          <p className="font-jakarta font-bold text-sm leading-4">
            {formatDate(data.datePetisi ?? data.createdAt)}
          </p>

          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </section>
  );
}
