import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const res = await fetch(url);
    const html = await res.text();

    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "Untitled";

    const faviconMatch = html.match(
      /<link[^>]+rel=["']icon["'][^>]+href=["']([^"']+)["']/
    );

    let favicon = faviconMatch ? faviconMatch[1] : "/favicon.ico";

    if (favicon && !favicon.startsWith("http")) {
      const parsed = new URL(url);
      favicon = parsed.origin + favicon;
    }

    return NextResponse.json({ title, favicon });
  } catch {
    return NextResponse.json({ title: "Untitled", favicon: "" });
  }
}