import Script from "next/script";
import FormDonasi from "./FormDonasi";
import LanskapSection from "./LanskapSection";
import SectionContent from "./SectionContent";
import { AnyDukungContent, DukungDonasi } from "@/services/types/dukung";

export default function DonasiLayout({ data }: { data: AnyDukungContent }) {
  const d = data as DukungDonasi;

  return (
    <>
      <SectionContent>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />
        <FormDonasi
          title={d.title}
          features={d.blok_dukung.map((b) => ({
            title: b.title,
            summary: b.summary,
          }))}
        />
      </SectionContent>
      <LanskapSection
        title={d.title_section_1}
        bodyText={d.description}
        noteText={d.summary}
        title2={d.title_section_2}
        features={d.block_section.map((b) => ({
          title: b.title,
          summary: b.summary,
        }))}
      />
    </>
  );
}
