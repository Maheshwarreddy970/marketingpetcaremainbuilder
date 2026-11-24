import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

const BOT_PATTERN =
  /bot|crawler|spider|lighthouse|pagespeed|headless|preview|facebookexternalhit|slackbot|whatsapp|discordbot/i;

export async function POST(req: Request) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    if (BOT_PATTERN.test(userAgent)) {
      return NextResponse.json({ skipped: true });
    }

    const body = await req.json().catch(() => null);
    const slug = typeof body?.slug === "string" ? body.slug.trim() : "";

    if (!slug || !/^[a-z0-9._-]+$/i.test(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
    }

    await updateDoc(doc(db, "websites", slug), {
      clientViewed: true,
      lastViewedAt: serverTimestamp(),
      viewCount: increment(1),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Track view error:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}