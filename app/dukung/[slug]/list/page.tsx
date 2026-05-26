import TitleBreadcrumb from "@/components/Hero/child/TitleBreadcrumb";
import HeroContentPages from "@/components/Hero/HeroContentPages";
import HeroSection from "@/components/HeroSection";
import SectionListPetisi from "./components/SectionListPetisi";
const ALERT_GROUPS = [
  {
    groupLabel: "Ikut beraksi melalui petisi",
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
export default function ListPage() {
  return (
    <>
      <HeroSection>
        <HeroContentPages>
          <TitleBreadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tanda Tangan Petisi", href: "/dukung/petisi" },
              { label: "Semua Petisi" },
            ]}
            title="PETISI"
          />
        </HeroContentPages>
      </HeroSection>
      <SectionListPetisi
        titleSection="Mahakam Alert"
        subtitle="Petisi Aura Mahakam"
        groups={ALERT_GROUPS}
      />
    </>
  );
}
