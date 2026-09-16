"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createNewClient } from "@/actions/clientActions";

export default function AddClientPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState(""); // Optional: Add email field if needed
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await createNewClient(name, slug,email);
    
    if (result.success) {
      router.push(`/${result.slug}/edit`);
    } else {
      alert(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950 text-white">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-2xl w-[400px] flex flex-col gap-6 border border-zinc-800">
        <h1 className="text-2xl font-bold">Add New Client</h1>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Client Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-zinc-950 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g. Petocare Grooming" required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">URL Slug</label>
          <input type="text" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} className="bg-zinc-950 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g. petocare-grooming" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-zinc-400">Owner Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-zinc-950 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:border-blue-500" placeholder="e.g. owner@petocare.com" required />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-medium mt-4 flex justify-center items-center gap-2">
          {loading && <Loader2 size={18} className="animate-spin" />}
          {loading ? "Creating Database Entry..." : "Create Client"}
        </button>
      </form>
    </div>
  );
}