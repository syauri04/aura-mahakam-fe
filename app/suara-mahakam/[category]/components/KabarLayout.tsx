import ArtikelSection from "@/components/utils/ArtikelSection";
import MahakamaAlertSection from "@/components/utils/MahakamaAlertSection";
import SiaranPersSection from "@/components/utils/SiaranPersSection";

/* ─────────────────────────────────────────────
   Dummy data — replace with your CMS / API data
───────────────────────────────────────────── */
const FEATURED_ARTICLE = {
  imageSrc: "/assets/suara/featured.jpg",
  imageAlt: "Petani kakao di Mahakam Ulu",
  title:
    "Kesaksian Benua Etam: Menelusuri Dualisme Hulu dan Hilir Kalimantan Timur",
  date: "10 April 2026",
  summary:
    "27.923 jiwa masyarakat adat di Mahakam Ulu bergantung pada hutan sebagai sumber mata pencaharian. Suku Dayak seperti Busang, Kenyah, Kayan, Bahau, Penihing, Aoheng, Modang, Laham, dan Long Kelat, tersebar di 5 Kecamatan dan 49 Kampung.",
  href: "kabar-mahakam/kesaksian-benua-etam",
};

const ARTICLES = [
  {
    imageSrc: "/assets/suara/siaran1.jpg",
    imageAlt: "Hasil Hutan Mahakam",
    title: "Hasil Hutan Mahakam",
    date: "9 April 2026",
    summary:
      "Di Mahakam Ulu, masyarakat adat mempertahankan tanah, hutan, dan cara hidup mereka.",
    href: "kabar-mahakam/hasil-hutan-mahakam",
  },
  {
    imageSrc: "/assets/suara/siaran2.jpg",
    imageAlt: "Kerajinan Tangan Masyarakat Mahakam",
    title: "Kerajinan Tangan Masyarakat Mahakam",
    date: "8 April 2026",
    summary: "Dalam prosesnya, mereka juga melindungi iklim global.",
    href: "kabar-mahakam/kerajinan-tangan-mahakam",
  },
  {
    imageSrc: "/assets/suara/siaran3.jpg",
    imageAlt: "Aktifitas Masyarakat Sungai Mahakam",
    title: "Aktifitas Masyarakat Sungai Mahakam",
    date: "7 April 2026",
    summary:
      "Di era krisis iklim dan kemunduran demokrasi, diam bukanlah pilihan.",
    href: "kabar-mahakam/aktifitas-sungai-mahakam",
  },
  {
    imageSrc: "/assets/suara/siaran4.png",
    imageAlt: "Masyarakat Adat di Mahakam Ulu",
    title: "Masyarakat Adat di Mahakam Ulu",
    date: "6 April 2026",
    summary:
      "Menghormati hak masyarakat adat dan melindungi pembela hutan adalah bagian dari solusi iklim.",
    href: "kabar-mahakam/masyarakat-adat-mahakam-ulu",
  },
];

const ALERT_GROUPS = [
  {
    groupLabel: "Bersuara melalui petisi",
    items: [
      {
        imageSrc: "/assets/kegiatan01.jpg",
        imageAlt: "Masyarakat adat Mahakam",
        title: "Dukung Gerakan Melindungi Lanskap Mahakam",
        summary:
          "Di Mahakam Ulu, masyarakat adat mempertahankan tanah, hutan, dan cara hidup mereka.",
        actionHref: "/mahakam-alert/petisi-1",
        actionLabel: "Ikut Beraksi",
      },
      {
        imageSrc: "/assets/kegiatan02.png",
        imageAlt: "Sungai Mahakam",
        title: "Dukung Gerakan Melindungi Lanskap Mahakam",
        summary:
          "Di Mahakam Ulu, masyarakat adat mempertahankan tanah, hutan, dan cara hidup mereka.",
        actionHref: "/mahakam-alert/petisi-2",
        actionLabel: "Ikut Beraksi",
      },
    ],
  },
  // tambahkan group lain jika ada, e.g.:
  // {
  //   groupLabel: "Aksi nyata di lapangan",
  //   items: [ ... ]
  // },
];

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function KabarLayout() {
  return (
    <main>
      <SiaranPersSection
        titleSection="Siaran Pers"
        featuredArticle={FEATURED_ARTICLE}
        articles={ARTICLES}
        archiveHref="#"
      />
      <ArtikelSection titleSection="Artikel" articles={ARTICLES} />
      <MahakamaAlertSection
        titleSection="Mahakam Alert"
        subtitle="Peranmu untuk melindungi Lanskap Mahakam"
        groups={ALERT_GROUPS}
      />
    </main>
  );
}
