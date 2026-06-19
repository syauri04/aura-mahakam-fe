const STRAPI_API = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FetchOptions {
  locale?: string;
  revalidate?: number;
}

export async function fetchFromStrapi<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { locale, revalidate = 0 } = options;

  const localeParam = locale ? `locale=${locale}` : "";
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${STRAPI_API}/api${endpoint}${localeParam ? separator + localeParam : ""}`;

  const res = await fetch(url, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
  }

  return res.json();
}

export function getStrapiImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${STRAPI_API}${url}`;
}

// services/strapi.ts — tambahkan helper ini

export async function fetchWithFallback<T extends { data: unknown }>(
  endpoint: string,
  locale: string,
  revalidate = 60,
): Promise<T> {
  // Jika bukan "id", coba locale dulu, kalau gagal/kosong fallback ke "id"
  if (locale !== "id") {
    try {
      const res = await fetchFromStrapi<T>(endpoint, { locale, revalidate });
      const isEmpty =
        !res.data || (Array.isArray(res.data) && res.data.length === 0);

      if (!isEmpty) return res;
    } catch {
      // locale tidak ada (404 dll), lanjut ke fallback
    }
  }

  // Fetch "id" sebagai default/fallback
  return fetchFromStrapi<T>(endpoint, { locale: "id", revalidate });
}
