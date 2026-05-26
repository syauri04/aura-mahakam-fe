import Image from "next/image";

export default function DetailLayout() {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <div
        style={{ top: "20%" }}
        className={[
          "absolute -translate-y-1/2 pointer-events-none",
          "left-0",
        ].join(" ")}
      >
        <Image
          src="/assets/ornament-line-yellow.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto"
        />
      </div>

      <div
        style={{ top: "10%" }}
        className={[
          "absolute -translate-y-1/2 pointer-events-none",
          "right-0",
        ].join(" ")}
      >
        <Image
          src="/assets/ornament-line-green.png"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-auto h-auto"
        />
      </div>
      <div className="max-w-[775px] mx-auto">
        {/* Category */}
        <div className="px-6">
          <h1 className="text-[56px] leading-[64px] font-bold font-jakarta text-pink-neon ">
            Mahakam di Persimpangan: Ketika Sungai yang Hidup Berjuang untuk
            Bernapas
          </h1>
          <div className="flex items-center gap-6 py-12">
            <p className="text-base leading-6 uppercase font-jakarta font-bold text-black">
              26 APRIL 2026
            </p>

            <div className=" font-jakarta text-black/40">
              Oleh: Ridho Pratama (WALHI Kaltim)
            </div>
          </div>

          {/* Title */}
        </div>
        {/* Featured Image */}
        <div className="rounded-[10px] overflow-hidden mb-8">
          <Image
            src="/assets/cerita1.jpg"
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
        {/* <div className="flex justify-center mt-16">
          <button className="bg-purple-light hover:opacity-90 transition-all duration-300 text-white text-base font-bold  font-jakarta px-8 py-3 rounded-full uppercase">
            Siaran Pers
          </button>
        </div> */}
      </div>
    </section>
  );
}
