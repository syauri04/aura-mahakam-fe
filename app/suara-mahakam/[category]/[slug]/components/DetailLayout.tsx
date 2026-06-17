"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

interface DetailLayoutProps {
  title: string;
  author: string;
  date: string;
  content: string; // markdown
  slug: string;
}

function OrnamentDraw({
  side,
  top,
  color,
  pathD,
  viewBox,
  width,
  height,
  duration = 2000,
}: {
  side: "left" | "right";
  top: string;
  color: string;
  pathD: string;
  viewBox: string;
  width: number;
  height: number;
  duration?: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    // Tunggu setelah mount supaya getTotalLength() akurat
    const len = el.getTotalLength();
    el.style.strokeDasharray = String(len);
    el.style.strokeDashoffset = String(len);

    // Langsung animate tanpa tunggu scroll — karena ornamen biasanya
    // sudah visible saat halaman dibuka
    const timer = setTimeout(() => {
      el.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      el.style.strokeDashoffset = "0";
    }, 300); // delay 300ms biar page sudah settle

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div
      style={{
        position: "absolute",
        top,
        [side]: 0,
        transform: "translateY(-50%)",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "visible",
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
      >
        <path
          ref={pathRef}
          d={pathD}
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

// path constants
const GREEN_PATH = `M1475.92 1493.49C1497.26 1508.47 1505.12 1495.96 1497.86 1472.6C1487.44 1438.13 1467.37 1416.39 1472.56 1392.11C1476.11 1375.64 1478.84 1362.45 1479.3 1351.03C1480.33 1328.96 1472.69 1313.41 1445.85 1293.83C1405.32 1264.43 1431.57 1221.95 1412.77 1201.54C1393.49 1181.31 1373.54 1195.43 1312.66 1069.18C1278.88 1000.48 1250 950.521 1226.27 911.884C1205.99 879.063 1189.01 854.49 1174.7 833.942C1144.09 787.896 1046.19 719.966 990.725 658.349C961.195 624.7 913.237 579.434 870.793 533.348C831.202 490.621 793.793 450.092 775.388 422.49C735.997 363.579 715.116 384.713 664.187 357.397C613.346 330.148 633.057 247.267 580.754 208.072C574.03 203.003 567.655 198.921 561.54 195.519C522.379 174.345 489.945 180.54 454.004 125.03C412.972 61.0982 345.675 16.3765 337.367 -20.7205C331.083 -48.7846 306.739 -40.4565 285.753 -54.5381C279.455 -58.4265 273.506 -64.884 268.945 -75.7092C250.402 -120.206 229.416 -140.818 193.969 -167.634C182.1 -176.629 163.563 -196.112 149.336 -216.138C122.28 -257.252 97.8198 -313.054 95.4661 -347.517C95.24 -350.615 95.1828 -353.547 95.3039 -356.282C97.6422 -406.209 50.7564 -447.527 33.947 -477.125C28.7391 -486.244 23.2877 -493.05 18.2272 -498.012C16.0831 -500.111 12.7745 -500.41 9.84022 -499.549L9.83457 -499.547C6.18163 -498.474 3.10994 -495.604 3.57874 -492.232C5.88148 -475.811 6.70092 -450.623 2.00771 -418.592C-4.83446 -369.958 13.0451 -362.436 26.833 -321.85C30.1129 -312.383 33.2549 -301.131 36.097 -287.073C44.9184 -243.978 47.1933 -208.579 58.9929 -171.325C71.1389 -138.644 85.466 -115.494 111.71 -87.6291C152.069 -45.9576 145.514 -8.6727 168.963 37.1639C179.635 58.9361 198.289 83.0957 235.591 108.137C342.548 179.187 289.287 235.382 366.587 339.173C372.955 347.448 380.076 355.901 387.612 364.127C469.073 452.556 587.656 518.056 631.534 567.624C658.876 598.028 690.324 635.459 726.336 674.548C754.947 705.575 787.33 736.617 822.876 764.556C907.782 830.589 973.267 925.437 1052.26 999.237C1061.23 1007.36 1070.63 1016.11 1080.38 1025.46C1157.68 1098.99 1246.76 1197.17 1292.53 1245.15C1344.17 1298.99 1356.37 1312.97 1384.76 1378.73C1387.82 1385.89 1391.7 1393.72 1395.95 1401.36C1414.16 1433.96 1441.9 1468.99 1475.92 1493.49Z`;
const YELLOW_PATH = `M-467.462 3.81817C-478.349 -3.82039 -482.357 2.56029 -478.655 14.4734C-473.338 32.052 -463.104 43.1406 -465.753 55.5252C-467.559 63.9252 -468.952 70.6492 -469.19 76.4747C-469.714 87.7297 -465.815 95.6587 -452.129 105.645C-431.46 120.641 -444.845 142.305 -435.258 152.715C-425.426 163.032 -415.251 155.831 -384.203 220.216C-366.972 255.257 -352.243 280.734 -340.142 300.439C-329.799 317.177 -321.14 329.71 -313.841 340.189C-298.229 363.673 -248.301 398.317 -220.015 429.741C-204.955 446.903 -180.496 469.988 -158.849 493.492C-138.658 515.283 -119.579 535.953 -110.193 550.03C-90.1035 580.074 -79.4541 569.296 -53.4802 583.227C-27.5517 597.124 -37.604 639.393 -10.9296 659.383C-7.5001 661.968 -4.2491 664.05 -1.13022 665.785C18.8419 676.584 35.3831 673.424 53.7128 701.734C74.6393 734.34 108.961 757.148 113.198 776.067C116.403 790.38 128.818 786.132 139.521 793.314C142.733 795.297 145.767 798.591 148.093 804.111C157.55 826.804 168.253 837.317 186.331 850.993C192.384 855.58 201.838 865.517 209.094 875.73C222.892 896.698 235.367 925.157 236.567 942.733C236.683 944.313 236.712 945.809 236.65 947.204C235.457 972.666 259.369 993.739 267.942 1008.83C270.598 1013.48 273.378 1016.95 275.959 1019.49C277.053 1020.56 278.74 1020.71 280.236 1020.27L280.239 1020.27C282.102 1019.72 283.669 1018.26 283.43 1016.54C282.255 1008.16 281.838 995.318 284.231 978.982C287.721 954.179 278.602 950.342 271.57 929.643C269.897 924.815 268.295 919.077 266.846 911.907C262.347 889.928 261.186 871.875 255.169 852.876C248.974 836.208 241.667 824.402 228.283 810.19C207.7 788.938 211.043 769.923 199.084 746.546C193.641 735.442 184.128 723.121 165.103 710.35C110.556 674.114 137.718 645.455 98.2958 592.521C95.0478 588.301 91.4165 583.99 87.573 579.795C46.028 534.696 -14.4495 501.291 -36.8276 476.011C-50.7716 460.505 -66.8103 441.416 -85.1762 421.48C-99.7678 405.656 -116.283 389.825 -134.412 375.576C-177.714 341.899 -211.111 293.527 -251.396 255.889C-255.974 251.746 -260.766 247.283 -265.737 242.513C-305.164 205.016 -350.59 154.945 -373.935 130.473C-400.27 103.015 -406.495 95.8831 -420.973 62.3495C-422.534 58.6936 -424.51 54.7042 -426.677 50.807C-435.969 34.1814 -450.116 16.3124 -467.462 3.81817Z`;

export default function DetailLayout({
  title,
  author,
  date,
  content,
  slug,
}: DetailLayoutProps) {
  return (
    <section className="bg-white py-20 relative overflow-auto ">
      <OrnamentDraw
        side="right"
        top="10%"
        color="#00C2BA"
        pathD={GREEN_PATH}
        viewBox="0 0 1040 1200"
        width={900}
        height={1158}
        duration={2200}
      />

      <OrnamentDraw
        side="left"
        top="30%"
        color="#F8C260"
        pathD={YELLOW_PATH}
        viewBox="0 0 800 1030"
        width={765}
        height={1020}
        duration={1800}
      />
      <div className="max-w-[775px] mx-auto">
        {/* Category */}
        <div className="px-6">
          <h1 className="text-[32px] md:text-[56px] leading-[40px] md:leading-[64px] font-bold font-jakarta text-pink-neon ">
            {title}
          </h1>
          <div className="flex items-center gap-6 py-12">
            <p className="text-base leading-6 uppercase font-jakarta font-bold text-black">
              {date}
            </p>

            <div className=" font-jakarta text-black/40">Oleh: {author}</div>
          </div>

          {/* Title */}
        </div>

        {/* Content */}
        <div className="space-y-6 text-base leading-6 font-jakarta prose max-w-none text-black px-6">
          <ReactMarkdown>{content}</ReactMarkdown>
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
