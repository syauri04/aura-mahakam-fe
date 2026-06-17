"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/lib/auth";
import Link from "next/link";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!access_token) return;

    fetch(`${STRAPI_URL}/api/auth/google/callback?access_token=${access_token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.jwt) {
          saveToken(data.jwt);
          window.location.href = "/";
        } else {
          const msg = data?.error?.message ?? "Login gagal";
          if (msg.includes("Email is already taken")) {
            setErrorMsg(
              "Email ini sudah terdaftar via form. Silakan login dengan email & password.",
            );
          } else {
            setErrorMsg(msg);
          }
        }
      })
      .catch(() => setErrorMsg("Terjadi kesalahan, coba lagi."));
  }, [access_token]);

  // Cek di luar useEffect — tidak trigger setState sync
  if (!access_token && !errorMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 font-jakarta px-6">
        <p className="text-red-500 text-center">Token tidak ditemukan</p>
        <Link
          href="/login"
          className="bg-purple-light text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
        >
          Kembali ke Login
        </Link>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 font-jakarta px-6">
        <p className="text-red-500 text-center max-w-[400px]">{errorMsg}</p>
        <Link
          href="/login"
          className="bg-purple-light text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-all"
        >
          Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-jakarta">
      <p className="text-black">Memproses login...</p>
    </div>
  );
}
