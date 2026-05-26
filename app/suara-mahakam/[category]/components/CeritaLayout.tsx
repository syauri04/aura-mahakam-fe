import ArtikelSection from "@/components/utils/ArtikelSection";
import KaryaSection from "@/components/utils/KaryaSection";

/* ─────────────────────────────────────────────
   Dummy data — replace with your CMS / API data
───────────────────────────────────────────── */

const ARTICLES = [
  {
    imageSrc: "/assets/cerita1.jpg",
    imageAlt: "Hasil Hutan Mahakam",
    title:
      "Benua Etam di Persimpangan: Menelusuri Dualisme Hulu dan Hilir Kalimantan Timur",

    summary:
      "Benua Etam di Persimpangan: Menelusuri Dualisme Hulu dan Hilir Kalimantan Timur",
    href: "cerita-mahakam-heroes/benua-etam-di-persimpangan",
  },
  {
    imageSrc: "/assets/cerita2.jpg",
    imageAlt: "Kerajinan Tangan Masyarakat Mahakam",
    title:
      "Mahakam di Persimpangan: Ketika Sungai yang Hidup Berjuang untuk Bernapas",

    summary:
      "Mahakam di Persimpangan: Ketika Sungai yang Hidup Berjuang untuk Bernapas",
    href: "cerita-mahakam-heroes/mahakam-di-persimpangan",
  },
];
const KARYA = [
  {
    imageSrc: "/assets/karya1.png",
    imageAlt: "Hasil Hutan Mahakam",

    href: "cerita-mahakam-heroes/benua-etam-di-persimpangan",
  },
  {
    imageSrc: "/assets/karya2.png",
    imageAlt: "Kerajinan Tangan Masyarakat Mahakam",

    href: "cerita-mahakam-heroes/mahakam-di-persimpangan",
  },
  {
    imageSrc: "/assets/karya3.png",
    imageAlt: "Kerajinan Tangan Masyarakat Mahakam",
    href: "cerita-mahakam-heroes/mahakam-di-persimpangan",
  },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function CeritaLayout() {
  return (
    <main>
      <ArtikelSection titleSection="Cerita Mahakam" articles={ARTICLES} />
      <KaryaSection titleSection="Karya Mahakam" karyas={KARYA} />
    </main>
  );
}
