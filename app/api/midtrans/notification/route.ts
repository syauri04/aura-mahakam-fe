import crypto from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRAPI_API_URL = process.env.STRAPI_API_URL!;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN!;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY!;

export async function POST(request: Request) {
  const notification = await request.json();

  const signature = crypto
    .createHash("sha512")
    .update(
      `${notification.order_id}${notification.status_code}${notification.gross_amount}${MIDTRANS_SERVER_KEY}`,
    )
    .digest("hex");

  if (signature !== notification.signature_key) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 403 });
  }

  const findRes = await fetch(
    `${STRAPI_API_URL}/api/donations?filters[order_id][$eq]=${notification.order_id}`,
    {
      cache: "no-store",
    },
  );

  const found = await findRes.json();
  const donation = found.data?.[0];

  if (!donation) {
    return NextResponse.json(
      { message: "Donation not found" },
      { status: 404 },
    );
  }

  await fetch(`${STRAPI_API_URL}/api/donations/${donation.documentId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        status: notification.transaction_status,
        payment_type: notification.payment_type,
        midtrans_transaction_id: notification.transaction_id,
        raw_notification: notification,
      },
    }),
  });

  return NextResponse.json({ received: true });
}
