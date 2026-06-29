"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getToken, loginWithGoogle, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const VP = { once: true, margin: "-60px" };

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

interface FormErrors {
  nama?: string;
  email?: string;
  noTelp?: string;
  customNominal?: string;
}

// ─── RadioOption ──────────────────────────────────────────────────────────────
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
      <span
        className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors duration-200 ${checked ? "border-[#00C4B4]" : "border-[#AAAAAA] group-hover:border-[#00C4B4]"}`}
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

// ─── FormField ────────────────────────────────────────────────────────────────
function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-jakarta text-base leading-6 text-black font-medium"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-[#F2F2F2] rounded-[8px] px-4 py-3.5 font-jakarta text-base leading-6 text-black placeholder:text-[#AAAAAA] outline-none transition-shadow duration-200 ${
          error ? "ring-2 ring-red-400" : "focus:ring-2 focus:ring-[#00C4B4]/40"
        }`}
      />
      {error && <p className="font-jakarta text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FeatureItem {
  title: string;
  summary: string;
}

interface FormDonasiProps {
  title?: string;
  features: FeatureItem[];
  onSubmit?: (data: { nama: string; email: string; noTelp: string }) => void;
}

declare global {
  interface Window {
    snap?: { pay: (token: string, options?: Record<string, unknown>) => void };
  }
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FormDonasi({
  title,
  features,
  onSubmit,
}: FormDonasiProps) {
  const [selectedNominal, setSelectedNominal] = useState<NominalId>("50k");
  const [form, setForm] = useState<FormState>({
    nama: "",
    email: "",
    noTelp: "",
    customNominal: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const router = useRouter();
  const isCustom = selectedNominal === "custom";

  // ── Auto-fill dari user yang sudah login ──────────────────────────────────
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.id) {
          setForm((prev) => ({
            ...prev,
            nama: data.username ?? prev.nama,
            email: data.email ?? prev.email,
          }));
          setUserLoaded(true);
        }
      })
      .catch(() => {});
  }, []);

  function setField<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error saat user mulai isi
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  // ── Validasi ─────────────────────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!form.nama.trim()) {
      newErrors.nama = "Nama tidak boleh kosong";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email tidak boleh kosong";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!form.noTelp.trim()) {
      newErrors.noTelp = "Nomor telepon tidak boleh kosong";
    } else if (!/^[0-9+\-\s]{8,15}$/.test(form.noTelp)) {
      newErrors.noTelp = "Format nomor telepon tidak valid";
    }

    if (isCustom) {
      if (!form.customNominal.trim()) {
        newErrors.customNominal = "Nominal donasi tidak boleh kosong";
      } else if (Number(form.customNominal) < 1000) {
        newErrors.customNominal = "Nominal minimal Rp1.000";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validate()) return;

    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    const selectedOption = NOMINAL_OPTIONS.find(
      (o) => o.id === selectedNominal,
    );
    const amount = isCustom
      ? Number(form.customNominal)
      : selectedOption?.value;

    if (!amount || amount < 1000) {
      setErrors((prev) => ({ ...prev, customNominal: "Nominal tidak valid" }));
      return;
    }

    setLoading(true);
    try {
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
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        alert(
          `${data.message}\n\nStatus: ${data.status ?? "-"}\nDetail: ${data.detail ?? "-"}`,
        );
        return;
      }

      window.snap?.pay(data.token, {
        onSuccess: () => alert("Pembayaran berhasil. Terima kasih!"),
        onPending: () => alert("Pembayaran menunggu penyelesaian."),
        onError: () => alert("Pembayaran gagal."),
        onClose: () => alert("Kamu menutup popup pembayaran."),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto z-0 relative px-6">
        <div className="bg-white rounded-[30px] px-6 py-12 md:px-10 md:py-16 lg:px-16 lg:py-20 flex flex-col gap-10">
          <h2
            className="font-staatliches text-black max-w-[700px] whitespace-pre-line"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
          >
            {title}
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
          >
            {features.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex flex-col gap-3"
              >
                <h3 className="font-jakarta font-bold text-black text-2xl leading-8">
                  {item.title}
                </h3>
                <p className="font-jakarta text-base leading-6 text-black">
                  {item.summary}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-6">
            <h2
              className="font-staatliches text-black py-6"
              style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1 }}
            >
              DONASI
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 lg:w-[50%]"
              noValidate
            >
              {/* Nominal */}
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

              {/* Data Diri */}
              <div className="flex flex-col gap-8">
                <p className="font-jakarta text-base leading-6 text-black font-bold uppercase">
                  Data diri
                </p>

                <FormField
                  id="nama"
                  label="Nama"
                  placeholder="Nama lengkap"
                  value={form.nama}
                  onChange={(v) => setField("nama", v)}
                  error={errors.nama}
                  required
                />
                <FormField
                  id="email"
                  label="E-mail"
                  type="email"
                  placeholder="Alamat e-mail"
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                  error={errors.email}
                  required
                />
                <FormField
                  id="notelp"
                  label="Nomor Telp"
                  type="tel"
                  placeholder="08xx"
                  value={form.noTelp}
                  onChange={(v) => setField("noTelp", v)}
                  error={errors.noTelp}
                  required
                />

                <AnimatePresence>
                  {isCustom && (
                    <motion.div
                      key="custom-nominal"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
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
                        error={errors.customNominal}
                        required
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-start gap-3">
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02, opacity: 0.92 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-jakarta font-semibold text-base text-white px-8 py-4 rounded-full cursor-pointer disabled:opacity-60"
                  style={{ backgroundColor: "#00C4B4" }}
                >
                  {loading ? "Memproses..." : "Dukung Sekarang"}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
