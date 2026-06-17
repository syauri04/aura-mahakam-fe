import Cookies from "js-cookie";

const TOKEN_KEY = "aura_token";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function loginWithGoogle() {
  // Redirect ke Strapi Google OAuth
  window.location.href = `${STRAPI_URL}/api/connect/google`;
}

export function saveToken(jwt: string) {
  // cek token sebelum disimpan
  Cookies.set(TOKEN_KEY, jwt, { expires: 7 });
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}
