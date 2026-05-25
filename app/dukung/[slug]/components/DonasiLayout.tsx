import FormDonasi from "./FormDonasi";
import LanskapSection from "./LanskapSection";
import SectionContent from "./SectionContent";

const BODY_TEXT =
  'Dari populasi Pesut Mahakam yang nyaris punah, hanya tersisa 62 ekor, hingga krisis air bersih yang melanda ratusan desa, ancaman terhadap lanskap ini nyata dan mendesak. Data menunjukkan bahwa 97% deforestasi di Kalimantan Timur terjadi secara "legal", sebuah paradoks di mana hukum justru menjadi alat perusak. Namun, kita tidak boleh menyerah pada kondisi ini, Lanskap Mahakam butuh dukungan kita semua bersama-sama untuk begerak dan beraksi agar tidak hanya menjadi saksi.';

const NOTE_TEXT =
  "Aura Mahakam hadir sebagai suara bagi mereka yang tak terdengar. Kami adalah platform independen yang berkomitmen untuk mengungkap fakta, menyuarakan keadilan bagi Masyarakat Adat, dan mengadvokasi pemulihan ekosistem yang telah terluka. Kami percaya bahwa masa depan Mahakam tidak ditentukan oleh konsesi tambang atau megaproyek semata, tetapi oleh keberanian kita untuk memilih jalan keberlanjutan.";

const FEATURES = [
  {
    title: "Edukasi Publik",
    summary:
      "Membantu lebih banyak orang memahami pentingnya menjaga Lanskap Mahakam.",
  },
  {
    title: "Kampanye & Advokasi",
    summary:
      "Menguatkan suara publik untuk perlindungan hutan, sungai, dan ruang hidup masyarakat.",
  },
  {
    title: "Dukungan Komunitas",
    summary:
      "Mendorong keterlibatan masyarakat dan para penjaga lanskap di lapangan.",
  },
  {
    title: "Masa Depan Mahakam",
    summary:
      "Menjaga harapan agar Lanskap Mahakam tetap hidup untuk generasi berikutnya.",
  },
];

export default function DonasiLayout() {
  return (
    <>
      <SectionContent>
        <FormDonasi />
      </SectionContent>
      <LanskapSection
        title="Lanskap Mahakam Bukan Sekadar Tempat"
        bodyText={BODY_TEXT}
        noteText={NOTE_TEXT}
        noteBoldPrefix="Aura Mahakam"
        title2="Dukunganmu Merubah Segalanya!"
        features={FEATURES}
      />
    </>
  );
}
