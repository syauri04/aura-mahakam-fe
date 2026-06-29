import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_API_URL = process.env.STRAPI_API_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Silakan login terlebih dahulu." },
      { status: 401 },
    );
  }

  const userRes = await fetch(`${STRAPI_API_URL}/api/users/me`, {
    headers: { Authorization: authHeader },
    cache: "no-store",
  });

  if (!userRes.ok) {
    return NextResponse.json(
      { message: "Session login tidak valid. Silakan login ulang." },
      { status: 401 },
    );
  }

  const user = await userRes.json();
  const body = await request.json();
  console.log("body", body);

  const createAksiKaryaRes = await fetch(`${STRAPI_API_URL}/api/aksi-karyas`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        aksi_name: body.name || user.username,
        aksi_email: body.email || user.email,
        aksi_phone: body.phone || "",
        link_karya: body.link_karya || "",
        user: {
          connect: [{ documentId: user.documentId }],
        },
      },
    }),
  });

  if (!createAksiKaryaRes.ok) {
    return NextResponse.json(
      {
        message: "Gagal menyimpan data donasi.",
        status: createAksiKaryaRes.status,
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "Berhasil menyimpan karya",
    },
    { status: 201 },
  );
}
