const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  jwt: string;
}

export interface AuthError {
  message: string;
}

export async function login(
  email: string,
  password: string,
): Promise<AuthUser> {
  const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? "Login gagal");
  return { ...json.user, jwt: json.jwt };
}

export async function register(
  username: string,
  email: string,
  password: string,
): Promise<AuthUser> {
  const res = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.error?.message ?? "Registrasi gagal");
  return { ...json.user, jwt: json.jwt };
}
