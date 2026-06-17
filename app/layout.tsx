import type { Metadata } from "next";
import { Staatliches, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
const staatliches = Staatliches({
  variable: "--font-staatliches",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Mahakam",
  description:
    "Menjaga Lanskap Mahakam sebagai ruas tulang punggung terakhir keanekaragaman hayati Kalimantan, ruang hidup Masyarakat Adat yang berdaulat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${staatliches.variable} ${plusJakartaSans.variable}`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
