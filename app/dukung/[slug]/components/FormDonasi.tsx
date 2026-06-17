"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getToken, loginWithGoogle, removeToken } from "@/lib/auth";

/* ─────────────────────────────────────────────
   Types & Constants
───────────────────────────────────────────── */
const NOMINAL_OPTIONS = [
  { id: "50k", label: "Rp50.000", value: 50000 },
  { id: "100k", label: "Rp100.000", value: 100000 },
  { id: "250k", label: "Rp250.000", value: 250000 },
  { id: "custom", label: "Nominal Lainnya", value: null },
] as const;

type NominalId = (typeof NOMINAL_OPTIONS)[number]["id"];

interface FormState {
  nama: string;
  email: string;
  noTelp: string;
  customNominal: string;
}

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function RadioOption({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex items-center gap-2 cursor-pointer select-none group"
    >
      {/* Custom radio circle */}
      <span
        className={`
          relative flex items-center justify-center
          w-5 h-5 rounded-full border-2 shrink-0
          transition-colors duration-200
          ${checked ? "border-[#00C4B4]" : "border-[#AAAAAA] group-hover:border-[#00C4B4]"}
        `}
      >
        {checked && (
          <motion.span
            layoutId={`radio-dot-${id}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-2.5 h-2.5 rounded-full bg-[#00C4B4] block"
          />
        )}
      </span>
      <input
        type="radio"
        id={id}
        name="nominal"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span className="font-jakarta text-base leading-6 text-black">
        {label}
      </span>
    </label>
  );
}

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
        className="font-jakarta text-base leading-6 text-black font-medium"
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
          w-full bg-[#F2F2F2] rounded-[8px]
          px-4 py-3.5
          font-jakarta text-base leading-6 text-black
          placeholder:text-[#AAAAAA]
          outline-none
          focus:ring-2 focus:ring-[#00C4B4]/40
          transition-shadow duration-200
        "
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
interface FormDonasiProps {
  /** Override teks judul besar (opsional) */
  headline?: string;
  /** Override kolom deskripsi kiri */
  leftTitle?: string;
  leftSummary?: string;
  /** Override kolom deskripsi kanan */
  rightTitle?: string;
  rightSummary?: string;
  /** Handler submit form */
  onSubmit?: (data: {
    nominal: number | null;
    customNominal: string;
    nama: string;
    email: string;
    noTelp: string;
  }) => void;
}

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: Record<string, unknown>) => void;
    };
  }
}

export default function FormDonasi({
  headline = "MASA DEPAN LANSKAP MAHAKAM\nBERGANTUNG PADA\nKITA SEMUA",
  leftTitle = "Jangan Biarkan Mahakam Menjadi Kenangan.",
  leftSummary = "Masa depan sungai ini ada di tangan kita. Apakah kita akan membiarkannya menjadi sekadar catatan sejarah tentang kehancuran, ataukah kita akan berjuang untuk memulihkannya? Pilihan ada di tangan Anda.",
  rightTitle = "Dukung Gerakan Aura Mahakam sekarang.",
  rightSummary = "Mari bersama-sama memastikan bahwa Mahakam tetap menjadi nadi kehidupan, bukan kuburan bagi keanekaragaman hayati dan keadilan sosial.",
  onSubmit,
}: FormDonasiProps) {
  const [selectedNominal, setSelectedNominal] = useState<NominalId>("50k");
  const [form, setForm] = useState<FormState>({
    nama: "",
    email: "",
    noTelp: "",
    customNominal: "",
  });

  const isCustom = selectedNominal === "custom";
  const selectedOption = NOMINAL_OPTIONS.find((o) => o.id === selectedNominal);

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const token = getToken();

    if (!token) {
      loginWithGoogle();
      return;
    }
    const selectedOption = NOMINAL_OPTIONS.find(
      (option) => option.id === selectedNominal,
    );

    const amount =
      selectedNominal === "custom"
        ? Number(form.customNominal)
        : selectedOption?.value;

    if (!amount || amount < 1000) {
      alert("Nominal donasi tidak valid.");
      return;
    }
    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/donasi/snap", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        name: form.nama,
        email: form.email,
        phone: form.noTelp,
        message: "",
      }),
    });

    if (res.status === 401) {
      removeToken();
      loginWithGoogle();
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      alert(
        `${data.message}\n\nStatus: ${data.status ?? "-"}\nDetail: ${
          data.detail ?? "-"
        }`,
      );
      return;
    }

    window.snap?.pay(data.token, {
      onSuccess: function () {
        alert("Pembayaran berhasil. Terima kasih!");
      },
      onPending: function () {
        alert("Pembayaran menunggu penyelesaian.");
      },
      onError: function () {
        alert("Pembayaran gagal.");
      },
      onClose: function () {
        alert("Kamu menutup popup pembayaran.");
      },
    });
  }

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto z-0 relative px-6">
        <div className="bg-white rounded-[30px] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 flex flex-col gap-10">
          {/* ── Headline ────────────────────── */}
          <h2
            className="font-staatliches  text-black max-w-[700px] whitespace-pre-line"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
          >
            {headline}
          </h2>

          {/* ── 2-column description ─────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left */}
            <div className="flex flex-col gap-3">
              <h3 className="font-jakarta font-bold text-2xl leading-8 text-black">
                {leftTitle}
              </h3>
              <p className="font-jakarta text-base leading-6 text-black">
                {leftSummary}
              </p>
            </div>
            {/* Right */}
            <div className="flex flex-col gap-3">
              <h3 className="font-jakarta font-bold text-2xl leading-8 text-black">
                {rightTitle}
              </h3>
              <p className="font-jakarta text-base leading-6 text-black">
                {rightSummary}
              </p>
            </div>
          </div>

          {/* ── Donasi Form ──────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Title DONASI */}
            <h2
              className="font-staatliches  text-black py-6"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
            >
              DONASI
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 lg:w-[50%]"
            >
              {/* ── Radio Nominal ─────────────── */}
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {NOMINAL_OPTIONS.map((opt) => (
                  <RadioOption
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    checked={selectedNominal === opt.id}
                    onChange={() => setSelectedNominal(opt.id)}
                  />
                ))}
              </div>

              {/* ── Data Diri ─────────────────── */}
              <div className="flex flex-col gap-8">
                <p className="font-jakarta text-base leading-6 text-black font-bold uppercase ">
                  Data diri
                </p>

                {/* Nama */}
                <FormField
                  id="nama"
                  label="Nama"
                  placeholder="Nama lengkap"
                  value={form.nama}
                  onChange={(v) => setField("nama", v)}
                />

                {/* Email */}
                <FormField
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="Alamat e-mail"
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                />

                {/* No Telp */}
                <FormField
                  id="notelp"
                  label="Nomor Telp"
                  type="tel"
                  placeholder="08xx"
                  value={form.noTelp}
                  onChange={(v) => setField("noTelp", v)}
                />

                {/* Conditional — Nominal Lainnya */}
                <AnimatePresence>
                  {isCustom && (
                    <motion.div
                      key="custom-nominal"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1] as [
                          number,
                          number,
                          number,
                          number,
                        ],
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <FormField
                        id="custom-nominal"
                        label="Nominal Donasi"
                        type="number"
                        placeholder="Masukkan nominal donasi"
                        value={form.customNominal}
                        onChange={(v) => setField("customNominal", v)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Submit ────────────────────── */}
              <div className="flex flex-col items-start gap-3">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, opacity: 0.92 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-jakarta font-semibold text-base text-white px-8 py-4 rounded-full cursor-pointer"
                  style={{ backgroundColor: "#00C4B4" }}
                >
                  Dukung Sekarang
                </motion.button>

                {/* <p className="font-jakarta text-xs leading-4 text-[#AAAAAA]">
                  Payment via Midtrans
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
