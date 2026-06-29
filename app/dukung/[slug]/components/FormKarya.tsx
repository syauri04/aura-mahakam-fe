"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getToken, removeToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const VP = { once: true, margin: "-60px" };

interface FormState {
  nama: string;
  email: string;
  noTelp: string;
  link_karya: string;
}

interface FormErrors {
  nama?: string;
  email?: string;
  noTelp?: string;
  link_karya?: string;
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FormKarya() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    nama: "",
    email: "",
    noTelp: "",
    link_karya: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [success, setSuccess] = useState(false);

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
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
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

    if (!form.link_karya.trim()) {
      newErrors.link_karya = "Link karya tidak boleh kosong";
    } else if (!/^https?:\/\/.+/.test(form.link_karya)) {
      newErrors.link_karya = "Link karya harus berupa URL valid (https://...)";
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

    setLoading(true);
    try {
      const res = await fetch("/api/karya/snap", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.nama,
          email: form.email,
          phone: form.noTelp,
          link_karya: form.link_karya,
        }),
      });

      if (res.status === 401) {
        removeToken();
        router.push("/login");
        return;
      }

      if (!res.ok) {
        const data = await res.json();

        alert(`Gagal submit: ${data?.error?.message ?? "Terjadi kesalahan"}`);
        return;
      }

      // Reset form setelah berhasil
      setSuccess(true);
      setForm({ nama: "", email: "", noTelp: "", link_karya: "" });

      // Hide success message after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      alert("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Success message */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-green-50 border border-green-200 rounded-[12px] px-6 py-4"
        >
          <p className="font-jakarta text-green-700 font-semibold text-base">
            ✓ Karya berhasil dikirim! Terima kasih atas kontribusimu.
          </p>
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 lg:w-[50%]"
        noValidate
      >
        <div className="flex flex-col gap-8">
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
          <FormField
            id="link_karya"
            label="Link Karya"
            type="url"
            placeholder="https://drive.google.com/..."
            value={form.link_karya}
            onChange={(v) => setField("link_karya", v)}
            error={errors.link_karya}
            required
          />
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
            {loading ? "Mengirim..." : "Submit"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
