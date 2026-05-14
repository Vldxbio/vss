import { NextResponse } from "next/server";

interface CreateInvoiceBody {
  amount: number; // в копейках (1 грн = 100 копеек)
  reference: string; // ID заказа
  destination: string;
  redirectUrl: string;
  webHookUrl?: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, reference, destination, redirectUrl, items } = body;

    const token = process.env.MONOBANK_TOKEN;

    if (!token) {
      // Mock-режим (для тестов без ключа)
      return NextResponse.json({
        invoiceId: `mock-${Date.now()}`,
        pageUrl: `/success?mock=true&order=${reference}`,
      });
    }

    const monoBody = {
      amount: Math.round(amount * 100), // в копейках
      ccy: 980, // UAH
      merchantPaymInfo: {
        reference,
        destination,
        basketOrder: items?.map((item: any) => ({
          name: item.name,
          qty: item.quantity,
          sum: Math.round(item.price * 100),
          icon: "",
          unit: "шт.",
        })) || [],
      },
      redirectUrl,
      webHookUrl: process.env.MONOBANK_WEBHOOK_URL,
      validity: 3600, // 1 час
    };

    const res = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monoBody),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("MonoPay error:", err);
      return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({
      invoiceId: data.invoiceId,
      pageUrl: data.pageUrl,
    });
  } catch (e) {
    console.error("MonoPay route error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}