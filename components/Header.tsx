"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import { getToken, removeToken } from "@/lib/auth";

function decodeJWT(
  token: string,
): { username?: string; email?: string } | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

const navItems = {
  id: [
    { label: "HOME", href: "/" },
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
  ],
  en: [
    { label: "HOME", href: "/" },
    { label: "ABOUT AURA MAHAKAM", href: "/tentang" },
    {
      label: "ACTIVITIES",
      href: "#",
      children: [
        { label: "Aura Mahakam Festival", href: "/kegiatan/festival" },
        { label: "Mahakam Heroes", href: "/kegiatan/mahakam-heroes" },
      ],
    },
    {
      label: "MAHAKAM VOICE",
      href: "#",
      children: [
        {
          label: "Mahakam Heroes Stories",
          href: "/suara-mahakam/cerita-mahakam-heroes",
        },
        { label: "Mahakam News", href: "/suara-mahakam/kabar-mahakam" },
      ],
    },
    {
      label: "SUPPORT",
      href: "#",
      children: [
        { label: "Sign the Petition", href: "/dukung/petisi" },
        { label: "Register Your Action", href: "/dukung/aksi" },
        { label: "Donate", href: "/dukung/donasi" },
      ],
    },
  ],
};

const languages = [
  { code: "id", flag: "https://flagcdn.com/w40/id.png", label: "Indonesia" },
  { code: "en", flag: "https://flagcdn.com/w40/gb.png", label: "English" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    username?: string;
    email?: string;
  } | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          removeToken();
          return null;
        }
        return res.json();
      })
      .then((data) => {
        // cek response user

        if (data?.username) {
          setUser({ username: data.username, email: data.email });
        }
      })
      .catch(() => removeToken());
  }, []);

  function handleLogout() {
    removeToken();
    setUser(null);
    setUserDropdownOpen(false);
    window.location.href = "/";
  }

  // sync activeLang dari URL
  const activeLang = useMemo(() => {
    const lang = searchParams.get("lang");
    return languages.find((l) => l.code === lang) ?? languages[0];
  }, [searchParams]);

  const activeNavItems = navItems[activeLang.code as keyof typeof navItems];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      setShrunk(currentY > 80);
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

  function handleSelectLang(lang: (typeof languages)[0]) {
    setLangOpen(false);
    const params = new URLSearchParams(window.location.search);
    params.set("lang", lang.code);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -200 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-[1000]"
    >
      <motion.div
        animate={{ height: shrunk ? 0 : 20, opacity: shrunk ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gradient-to-l from-gold-light to-teal overflow-hidden"
      />

      <div
        className={[
          "transition-all duration-300",
          scrolled
            ? "bg-purple-light/80 backdrop-blur-md shadow-lg"
            : "bg-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "w-full max-w-[1400px] px-6 mx-auto flex items-center justify-between gap-4",
            "transition-all duration-300 ease-in-out",
            shrunk ? "py-2" : "py-4",
          ].join(" ")}
        >
          <Link href="/" className="flex items-center shrink-0">
            <motion.div
              animate={{ width: shrunk ? 60 : 96, height: shrunk ? 60 : 96 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/assets/logo.png"
                alt="Aura Mahakam Logo"
                width="96"
                height="96"
                priority
                className="object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {activeNavItems.map((item) => {
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
                      "font-staatliches whitespace-nowrap no-underline leading-8 text-white",
                      "transition-all duration-300",
                      shrunk ? "text-xl" : "text-2xl",
                      isActive
                        ? "bg-gradient-to-r from-teal to-gold"
                        : "gradient-border",
                    ].join(" ")}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={shrunk ? 20 : 32}
                        className={[
                          "transition-transform duration-200",
                          openDropdown === item.label
                            ? "rotate-180"
                            : "rotate-0",
                        ].join(" ")}
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
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

          {/* Right: search + lang + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-white font-staatliches text-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm">
                    {user.username?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span className={shrunk ? "text-xl" : "text-2xl"}>
                    {user.username ?? "User"}
                  </span>
                  <ChevronDown
                    size={shrunk ? 16 : 20}
                    className={[
                      "transition-transform duration-200",
                      userDropdownOpen ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-[calc(100%+8px)] right-0 min-w-[180px] bg-white rounded-xl p-2 z-[200] shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-jakarta text-base text-black hover:bg-gold/10 transition-colors no-underline"
                      >
                        Dashboard
                      </Link>
                      <div className="h-px bg-gray-100 my-1" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg font-jakarta text-base text-red-500 hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer text-left"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:flex items-center bg-transparent border-none cursor-pointer text-white p-1.5 rounded-lg"
              >
                <FiLogIn
                  size={shrunk ? 24 : 32}
                  className="transition-all duration-300"
                />
              </Link>
            )}

            {/* Language picker */}
            <div className="relative">
              {/* ← fix: onClick hanya toggle dropdown, bukan set lang */}
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={[
                  "flex items-center gap-2.5 bg-transparent px-2.5 py-1.5 cursor-pointer text-white font-staatliches",
                  "transition-all duration-300",
                  shrunk ? "text-xl" : "text-2xl",
                ].join(" ")}
              >
                <img
                  src={activeLang.flag}
                  alt={activeLang.code}
                  width={shrunk ? 24 : 32}
                  height={12}
                  className="rounded-sm object-cover transition-all duration-300"
                />
                <span>{activeLang.code.toUpperCase()}</span>
                <ChevronDown
                  size={shrunk ? 20 : 32}
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
                        onClick={() => handleSelectLang(lang)}
                        className={[
                          "flex items-center gap-2 w-full px-3 py-2 rounded-lg border-none cursor-pointer text-black font-staatliches text-2xl",
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
                        <span>{lang.code.toUpperCase()}</span>
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

        {/* Mobile menu */}
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
                {activeNavItems.map((item) => (
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
                        pathname === item.href ||
                        item.children?.some((child) => pathname === child.href)
                          ? "text-gold"
                          : "text-white",
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

                {user ? (
                  <div className="border-t border-gold/20 pt-3 mt-2">
                    <p className="font-staatliches text-gold text-xl pb-2">
                      {user.username}
                    </p>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-white font-jakarta text-sm no-underline border-b border-gold/10"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-3 text-red-400 font-jakarta text-sm bg-transparent border-none cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 text-white font-jakarta text-sm no-underline border-t border-gold/20 mt-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
