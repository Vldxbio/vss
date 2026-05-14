import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("MonoPay webhook:", body);

    // body содержит: invoiceId, status, amount, reference, etc.
    // status: "created" | "processing" | "hold" | "success" | "failure" | "reversed" | "expired"

    if (body.status === "success") {
      // TODO: тут можно сохранить заказ в БД, отправить email, telegram-уведомление
      console.log(`✓ Order ${body.reference} paid: ${body.amount / 100} UAH`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Webhook error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "MonoPay webhook is alive" });
}