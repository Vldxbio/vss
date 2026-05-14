import { NextResponse } from "next/server";

const NP_API_KEY = "b20a8e7b20bb89fb5a649d370091f0fb"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: NP_API_KEY,
        ...body,
      }),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ success: false, errors: ["Proxy error"] }, { status: 500 });
  }
}