import Image from "next/image";

export default function FestivalLayout() {
  return (
    <section className="bg-[#F7F7F7] py-10 ">
      <div className="max-w-[775px] mx-auto">
        {/* Category */}
        <div className="px-6">
          <div className="mb-3">
            <p className="text-base leading-6 uppercase font-jakarta font-bold text-black">
              Artikel
            </p>

            <div className="mt-2 font-jakarta text-black/40">
              Sabtu, 10 Januari 2026
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[32px] leading-[40px] font-bold font-jakarta text-black my-10">
            Festival “Aura Mahakam” Dorong Peran Generasi Muda dalam
            Perlindungan Lanskap Mahakam
          </h1>
        </div>
        {/* Featured Image */}
        <div className="rounded-[10px] overflow-hidden mb-8">
          <Image
            src="/assets/aura-artikel.jpg"
            alt="Festival Aura Mahakam"
            className="w-full h-auto object-cover"
            width={775}
            height={425}
          />
        </div>

        {/* Content */}
        <div className="space-y-6 text-base leading-6 text-black px-10">
          <p>
            Festival Aura Mahakam menjadi ruang kolaborasi seni, musik, budaya,
            dan gerakan sosial yang melibatkan generasi muda untuk memperkuat
            kesadaran terhadap perlindungan lingkungan dan keberlanjutan
            ekosistem Mahakam.
          </p>

          <p>
            Dengan menghadirkan berbagai komunitas lokal, seniman, hingga
            masyarakat adat, festival ini menjadi momentum penting untuk
            mempertemukan narasi budaya dan aksi nyata dalam menjaga kelestarian
            alam Kalimantan Timur.
          </p>

          <p>
            Selain pertunjukan seni dan budaya, rangkaian acara juga
            menghadirkan diskusi publik, pameran komunitas, dan kampanye
            lingkungan yang mengajak masyarakat untuk terlibat langsung dalam
            gerakan menjaga sungai dan hutan Mahakam.
          </p>

          <p>
            Festival ini diharapkan menjadi ruang bersama yang mampu membangun
            solidaritas lintas generasi dalam menghadapi tantangan krisis iklim
            serta memperkuat peran anak muda sebagai penggerak perubahan sosial
            dan ekologis.
          </p>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-purple-light hover:opacity-90 transition-all duration-300 text-white text-base font-bold  font-jakarta px-8 py-3 rounded-full uppercase">
            Siaran Pers
          </button>
        </div>
      </div>
    </section>
  );
}
