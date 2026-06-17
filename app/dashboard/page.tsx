"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface User {
  id: number;
  username: string;
  email: string;
}

interface Donation {
  id: number;
  documentId: string;
  order_id: string;
  amount: number;
  donor_name: string;
  message: string;
  pay_status: string;
  payment_type: string;
  createdAt: string;
}

function getRank(total: number): {
  label: string;
  color: string;
  badge: string;
} {
  if (total >= 2000000)
    return { label: "Platinum", color: "#00C2BA", badge: "🏆" };
  if (total >= 1000000) return { label: "Gold", color: "#F8C260", badge: "🥇" };
  return { label: "Silver", color: "#AAAAAA", badge: "🥈" };
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; bg: string; text: string }> = {
    settlement: {
      label: "Berhasil",
      bg: "bg-green-100",
      text: "text-green-700",
    },
    capture: { label: "Berhasil", bg: "bg-green-100", text: "text-green-700" },
    pending: {
      label: "Menunggu",
      bg: "bg-yellow-100",
      text: "text-yellow-700",
    },
    deny: { label: "Ditolak", bg: "bg-red-100", text: "text-red-700" },
    cancel: { label: "Dibatalkan", bg: "bg-red-100", text: "text-red-700" },
    expire: { label: "Kadaluarsa", bg: "bg-gray-100", text: "text-gray-600" },
    failure: { label: "Gagal", bg: "bg-red-100", text: "text-red-700" },
  };

  const s = map[status] ?? {
    label: status,
    bg: "bg-gray-100",
    text: "text-gray-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-jakarta font-semibold ${s.bg} ${s.text}`}
    >
      {s.label}
    </span>
  );
}

function handleLogout() {
  removeToken();
  window.location.href = "/";
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch user + donations paralel
    Promise.all([
      fetch(`${STRAPI_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    ])
      .then(([userData]) => {
        if (!userData?.id) {
          removeToken();
          router.push("/login");
          return;
        }
        setUser(userData);

        // Fetch donations setelah dapat user ID
        return fetch(
          `${STRAPI_URL}/api/donations?filters[user][id][$eq]=${userData.id}&sort=createdAt:desc&populate=*`,
          { headers: { Authorization: `Bearer ${token}` } },
        ).then((r) => r.json());
      })
      .then((donationData) => {
        if (donationData) setDonations(donationData?.data ?? []);
      })
      .catch(() => {
        removeToken();
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const totalDonasi = donations
    .filter((d) => d.pay_status === "settlement" || d.pay_status === "capture")
    .reduce((sum, d) => sum + d.amount, 0);

  const rank = getRank(totalDonasi);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-jakarta">
        <p className="text-black">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative top-0 left-0 right-0">
        <div className="h-[20px] bg-gradient-to-l from-gold-light to-teal" />
      </div>

      <section className="bg-[#F2F2F2] min-h-screen relative overflow-hidden">
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

        <div className="w-full max-w-[1400px] mx-auto flex justify-center py-16 px-6 items-center">
          <Image
            src="/assets/onrmanet-aurapg.png"
            alt="Aura Mahakam Badge"
            width={174}
            height={64}
            className="object-contain"
          />
        </div>

        <div className="max-w-[980px] mx-auto bg-white p-8 rounded-[16px]">
          <h2
            className="font-staatliches text-black py-6"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
          >
            Dashboard
          </h2>

          <Link
            href="/"
            className="uppercase font-staatliches text-2xl leading-8 underline text-black mb-8 inline-block"
          >
            Kembali
          </Link>

          {/* ── User Info ── */}
          <div className="flex items-center justify-between gap-4 p-6 bg-[#F7F7F7] rounded-[12px] mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-2xl font-jakarta shrink-0"
                style={{ backgroundColor: "#BA32A0" }}
              >
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <p className="font-jakarta font-bold text-black text-lg leading-6">
                  {user?.username}
                </p>
                <p className="font-jakarta text-sm text-black/50 leading-6">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="font-jakarta text-sm font-semibold text-red-500 border border-red-200 px-5 py-2 rounded-full hover:bg-red-50 transition-all duration-200 cursor-pointer bg-transparent shrink-0"
            >
              Logout
            </button>
          </div>

          {/* ── 2 Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Card Peringkat */}
            <div className="bg-[#F7F7F7] rounded-[12px] p-6 flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: `${rank.color}20` }}
              >
                {rank.badge}
              </div>
              <div>
                <p className="font-jakarta text-sm text-black/50 mb-1">
                  Peringkat Donatur
                </p>
                <p
                  className="font-staatliches text-[32px] leading-none font-bold"
                  style={{ color: rank.color }}
                >
                  {rank.label}
                </p>
                <p className="font-jakarta text-xs text-black/40 mt-1">
                  {rank.label === "Silver" && "Donasi < Rp500.000"}
                  {rank.label === "Gold" && "Donasi Rp500.000 – Rp2.000.000"}
                  {rank.label === "Platinum" && "Donasi > Rp2.000.000"}
                </p>
              </div>
            </div>

            {/* Card Total Donasi */}
            <div className="bg-[#F7F7F7] rounded-[12px] p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 bg-teal/10">
                💚
              </div>
              <div>
                <p className="font-jakarta text-sm text-black/50 mb-1">
                  Total Donasi
                </p>
                <p className="font-staatliches text-[32px] leading-none text-black">
                  {formatRupiah(totalDonasi)}
                </p>
                <p className="font-jakarta text-xs text-black/40 mt-1">
                  {
                    donations.filter(
                      (d) =>
                        d.pay_status === "settlement" ||
                        d.pay_status === "capture",
                    ).length
                  }{" "}
                  transaksi berhasil
                </p>
              </div>
            </div>
          </div>

          {/* ── History Donasi ── */}
          <div>
            <h3 className="font-staatliches text-black text-[32px] leading-none mb-4">
              Riwayat Donasi
            </h3>

            {donations.length === 0 ? (
              <p className="font-jakarta text-sm text-black/40 py-8 text-center">
                Belum ada riwayat donasi.
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {donations.map((d) => (
                  <div
                    key={d.documentId}
                    className="flex items-center justify-between gap-4 p-4 border border-[#F2F2F2] rounded-[10px]"
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="font-jakarta font-semibold text-black text-sm truncate">
                        {d.order_id}
                      </p>
                      <p className="font-jakarta text-xs text-black/40">
                        {formatDate(d.createdAt)}
                        {d.payment_type && ` · ${d.payment_type}`}
                      </p>
                      {d.message && (
                        <p className="font-jakarta text-xs text-black/60 italic truncate">
                          &ldquo{d.message}&ldquo
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="font-jakarta font-bold text-black text-sm">
                        {formatRupiah(d.amount)}
                      </p>
                      <StatusBadge status={d.pay_status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
        <div className="w-full py-6 px-6 text-center">
          <p className="text-black text-xs font-jakarta">
            © 2024 AURA MAHAKAM. ALL RIGHTS RESERVED.
          </p>
        </div>
      </section>
    </>
  );
}
