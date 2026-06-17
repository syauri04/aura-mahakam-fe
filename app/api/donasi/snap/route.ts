import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_API_URL = process.env.STRAPI_API_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

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

  const amount = Number(body.amount);

  if (!amount || amount < 1000) {
    return NextResponse.json(
      { message: "Nominal donasi tidak valid." },
      { status: 400 },
    );
  }

  const orderId = `AURA-${Date.now()}-${user.id}`;

  const createDonationRes = await fetch(`${STRAPI_API_URL}/api/donations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        order_id: orderId,
        amount,
        donor_name: body.name || user.username,
        donor_email: body.email || user.email,
        donor_phone: body.phone || "",
        message: body.message || "",
        pay_status: "pending",
        user: {
          connect: [{ documentId: user.documentId }],
        },

        // Sementara jangan kirim relasi user dulu.
        // user: user.id,
      },
    }),
  });

  if (!createDonationRes.ok) {
    const detail = await createDonationRes.json().catch(async () => {
      return { raw: await createDonationRes.text() };
    });

    return NextResponse.json(
      {
        message: "Gagal menyimpan data donasi.",
        status: createDonationRes.status,
        detail,
      },
      { status: 500 },
    );
  }

  const donation = await createDonationRes.json();

  const snapUrl = MIDTRANS_IS_PRODUCTION
    ? "https://app.midtrans.com/snap/v1/transactions"
    : "https://app.sandbox.midtrans.com/snap/v1/transactions";

  const midtransRes = await fetch(snapUrl, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(`${MIDTRANS_SERVER_KEY}:`).toString("base64"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: body.name || user.username,
        email: body.email || user.email,
        phone: body.phone || "",
      },
      custom_field1: String(user.id),
    }),
  });

  const midtrans = await midtransRes.json();

  if (!midtransRes.ok) {
    return NextResponse.json(
      { message: "Gagal membuat transaksi Midtrans.", detail: midtrans },
      { status: 500 },
    );
  }

  const updateDonationRes = await fetch(
    `${STRAPI_API_URL}/api/donations/${donation.data.documentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          midtrans_token: midtrans.token,
          midtrans_redirect_url: midtrans.redirect_url,
        },
      }),
    },
  );

  if (!updateDonationRes.ok) {
    const detail = await updateDonationRes.json().catch(async () => {
      return { raw: await updateDonationRes.text() };
    });

    return NextResponse.json(
      {
        message:
          "Transaksi dibuat, tapi gagal update token Midtrans ke Strapi.",
        status: updateDonationRes.status,
        detail,
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    orderId,
    token: midtrans.token,
    redirectUrl: midtrans.redirect_url,
  });
}
