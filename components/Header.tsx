"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME", href: "/", active: true },
  { label: "TENTANG AURA MAHAKAM", href: "/tentang" },
  {
    label: "KEGIATAN",
    href: "#",
    children: [
      { label: "Festival Aura Mahakam", href: "/kegiatan/festival" },
      { label: "Mahakam Heroes", href: "/kegiatan/mahakam-heroes" },
    ],
  },
  {
    label: "SUARA MAHAKAM",
    href: "#",
    children: [
      {
        label: "Cerita Mahakam Heroes",
        href: "/suara-mahakam/cerita-mahakam-heroes",
      },
      { label: "Kabar Mahakam", href: "/suara-mahakam/kabar-mahakam" },
    ],
  },
  {
    label: "DUKUNG",
    href: "#",
    children: [
      { label: "Tanda Tangan Petisi", href: "/dukung/petisi" },
      { label: "Daftar Aksi Kamu", href: "/dukung/aksi" },
      { label: "Donasi", href: "/dukung/donasi" },
    ],
  },
];

const languages = [
  { code: "ID", flag: "https://flagcdn.com/w40/id.png", label: "Indonesia" },
  { code: "EN", flag: "https://flagcdn.com/w40/gb.png", label: "English" },
];

export default function Header() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(languages[0]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 50 || currentY < lastScrollY) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileOpen(false);
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -200 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[1000]"
    >
      {/* ── Top gradient accent line ── */}
      <div className="h-5 bg-gradient-to-l from-gold-light to-teal" />

      {/* ── Main bar ── */}
      <div className="bg-transparent">
        <div className="w-full max-w-[1400px] px-6 py-4 mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Aura Mahakam Logo"
              width={96}
              height={96}
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    item.children?.some((child) => pathname === child.href);

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setOpenDropdown(item.label)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={[
                      "flex items-center gap-3 px-4 py-2 rounded-[10px]",
                      "font-staatliches text-2xl leading-8 text-white whitespace-nowrap no-underline",
                      "transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-teal to-gold"
                        : "gradient-border",
                    ].join(" ")}
                  >
                    {item.label}

                    {item.children && (
                      <ChevronDown
                        size={32}
                        className={[
                          "transition-transform duration-200",
                          openDropdown === item.label
                            ? "rotate-180"
                            : "rotate-0",
                        ].join(" ")}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.95,
                        }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 min-w-[220px] bg-white rounded-xl p-2 z-[100] border gradient-border backdrop-blur-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                      >
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={[
                                "block px-4 py-2.5 rounded-lg whitespace-nowrap no-underline transition-colors duration-200",
                                "font-staatliches text-2xl leading-8",
                                isChildActive
                                  ? "bg-gold text-white"
                                  : "text-black hover:bg-gold/15 hover:text-gold",
                              ].join(" ")}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ── Right: search + lang + hamburger ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search — desktop only */}
            <button className="hidden lg:flex items-center bg-transparent border-none cursor-pointer text-white p-1.5 rounded-lg">
              <Search size={24} />
            </button>

            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2.5 bg-transparent  px-2.5 py-1.5 cursor-pointer text-white font-staatliches text-2xl"
              >
                <img
                  src={activeLang.flag}
                  alt={activeLang.code}
                  width={32}
                  height={12}
                  className="rounded-sm object-cover"
                />
                <span>{activeLang.code}</span>
                <ChevronDown
                  size={32}
                  className={[
                    "transition-transform duration-200",
                    langOpen ? "rotate-180" : "rotate-0",
                  ].join(" ")}
                />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-[calc(100%+6px)] right-0 min-w-[120px] bg-white gradient-border rounded-[10px] p-1.5 z-[200] backdrop-blur-[12px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setActiveLang(lang);
                          setLangOpen(false);
                        }}
                        className={[
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg border-none cursor-pointer text-black font-staatliches text-2xl ",
                          activeLang.code === lang.code
                            ? "bg-gold/15"
                            : "bg-transparent hover:bg-white/10",
                        ].join(" ")}
                      >
                        <img
                          src={lang.flag}
                          alt={lang.code}
                          width={20}
                          height={15}
                          className="rounded-sm object-cover"
                        />
                        <span>{lang.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex lg:hidden items-center bg-transparent border-none cursor-pointer text-white p-1.5"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-gold/15"
            >
              <div className="px-6 pt-3 pb-5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <button
                      onClick={() =>
                        item.children
                          ? setMobileDropdown(
                              mobileDropdown === item.label ? null : item.label,
                            )
                          : setMobileOpen(false)
                      }
                      className={[
                        "flex items-center justify-between w-full py-3 bg-transparent border-none border-b border-gold/10",
                        "font-staatliches text-[22px] cursor-pointer text-left",
                        item.active ? "text-gold" : "text-white",
                      ].join(" ")}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={[
                            "transition-transform duration-200",
                            mobileDropdown === item.label
                              ? "rotate-180"
                              : "rotate-0",
                          ].join(" ")}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {item.children && mobileDropdown === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2.5 text-white/75 font-jakarta text-sm no-underline border-b border-gold/[0.06]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
