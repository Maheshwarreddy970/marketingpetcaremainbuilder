"use client";

import { useEffect } from "react";

export default function TrackClientView({ slug }: { slug: string }) {
  useEffect(() => {
    if (!slug) return;

    // Skip when you preview a site yourself via ?admin=1
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "1") return;

    const storageKey = `client_viewed_${slug}`;
    if (sessionStorage.getItem(storageKey)) return;

    const timer = setTimeout(() => {
      if (document.visibilityState !== "visible") return;

      sessionStorage.setItem(storageKey, "1");

      fetch("/api/track-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        keepalive: true,
      }).catch(() => {
        sessionStorage.removeItem(storageKey);
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [slug]);

  return null;
}