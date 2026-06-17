"use client";
import SideOrnament from "@/components/pattern/SideOrnament";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

import { login } from "@/services/auth";
import { loginWithGoogle, saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-jakarta text-sm leading-6 text-black font-medium"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full  border border-[#F2F2F2] rounded-[8px]
          px-4 py-3.5
          font-jakarta text-sm leading-6 text-black
          placeholder:text-[#AAAAAA]
          outline-none
          focus:ring-2 focus:ring-[#00C4B4]/40
          transition-shadow duration-200
        "
      />
    </div>
  );
}
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(email, password);

      saveToken(user.jwt);

      window.location.href = "/"; // ganti router.push dengan hard refresh
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const setField = (field: string, value: string) => {
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <>
      {/* Top gradient bar */}
      <div className="relative top-0 left-0 right-0">
        <div className="h-[20px] bg-gradient-to-l from-gold-light to-teal" />
      </div>

      <section className="bg-[#F2F2F2] min-h-screen relative overflow-hidden">
        <SideOrnament side="left" top="80%" />
        <SideOrnament side="right" top="80%" />

        {/* Logo */}
        <div className="w-full max-w-[1400px] px-6 pt-6 mx-auto flex items-center">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/assets/logo.png"
              alt="Aura Mahakam Logo"
              width={96}
              height={96}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        {/* Ornament badge */}
        <div className="w-full max-w-[1400px] mx-auto flex justify-center py-16 px-6 items-center">
          <Image
            src="/assets/onrmanet-aurapg.png"
            alt="Aura Mahakam Badge"
            width={174}
            height={64}
            className="object-contain"
          />
        </div>
        <div className="max-w-[670px] mx-auto bg-white p-8 rounded-[16px] ">
          <h2
            className="font-staatliches  text-black py-6"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
          >
            MASUK
          </h2>
          <p className="font-jakarta text-base leading-6 text-black font-bold py-6">
            Masuk ke akun Anda untuk melanjutkan
          </p>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <FormField
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FormField
              label="Kata Sandi"
              id="password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {error && (
              <p className="font-jakarta text-sm text-red-500">{error}</p>
            )}

            <div className="flex flex-col items-start gap-6 pb-6">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, opacity: 0.92 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-jakarta font-semibold text-base text-white px-8 py-4 rounded-full cursor-pointer disabled:opacity-60"
                style={{ backgroundColor: "#BA32A0" }}
              >
                {loading ? "Memproses..." : "Masuk"}
              </motion.button>

              <p className="font-jakarta text-base leading-4 text-[#AAAAAA]">
                Belum punya akun?{" "}
                <Link href="/register" className="text-[#BA32A0] font-medium">
                  Daftar di sini
                </Link>
              </p>

              <div className="w-full flex items-center gap-4 mt-8">
                <div className="flex-1 h-px bg-[#E5E5E5]" />
                <span className="text-base text-[#AAAAAA] font-jakarta">
                  atau
                </span>
                <div className="flex-1 h-px bg-[#E5E5E5]" />
              </div>

              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center gap-3 border border-[#E5E5E5] rounded-full py-4 px-6 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <FcGoogle size={24} />
                <span className="font-jakarta font-medium text-black">
                  Masuk dengan Google
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="w-full max-w-[1400px] mx-auto flex justify-center py-16 px-6 items-center">
          <Image
            src="/assets/logo-footer.png"
            alt="Aura Mahakam Badge"
            width={104}
            height={154}
            className="object-contain"
          />
        </div>
        <div className="w-full   py-6 px-6 text-center">
          <p className="text-black text-xs font-jakarta">
            © 2024 AURA MAHAKAM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </section>
    </>
  );
}
