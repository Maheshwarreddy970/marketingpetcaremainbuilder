"use client";
import { useState } from "react";
import ShirtRecolor from "./ShirtRecolor";

const PRESETS = ["#F8C2E4", "#1E3A8A", "#16A34A", "#F59E0B", "#7C3AED", "#0F766E", "#DC2626"];

export default function Page() {
  const [color, setColor] = useState("#F8C2E4");
  return (
    <main className="min-h-screen bg-[#f4f3f1] p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-10 w-14 cursor-pointer" />
        <input value={color} onChange={(e) => setColor(e.target.value)} className="w-28 rounded border px-2 py-1 font-mono" />
        {PRESETS.map((c) => (
          <button key={c} onClick={() => setColor(c)} title={c}
            className="h-8 w-8 rounded-full border" style={{ background: c }} />
        ))}
      </div>
      <ShirtRecolor color={color} />
    </main>
  );
}