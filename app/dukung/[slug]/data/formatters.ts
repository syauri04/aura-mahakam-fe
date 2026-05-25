/**
 * Format angka biasa tanpa suffix.
 * e.g. 100 → "100"
 */
export function formatPlain(value: number): string {
  return Math.round(value).toString();
}

/**
 * Format ribuan dengan titik (locale Indonesia).
 * e.g. 1000 → "1.000", 500 → "500"
 */
export function formatThousands(value: number): string {
  return Math.round(value).toLocaleString("id-ID");
}

/**
 * Format dengan suffix K dan 1 desimal.
 * e.g. 10200 → "10.2K", 1500 → "1.5K", 900 → "900"
 * Selama animasi: nilai intermediate juga diformat K agar smooth.
 */
export function formatK(value: number): string {
  if (value >= 1000) {
    const k = value / 1000;
    // tampilkan 1 desimal, hilangkan trailing .0 jika bulat
    const formatted = k % 1 === 0 ? k.toFixed(0) : k.toFixed(1);
    return `${formatted}K`;
  }
  return Math.round(value).toString();
}
