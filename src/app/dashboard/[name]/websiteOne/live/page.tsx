import { notFound } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import WebsiteOne from "@/components/templates/WebsiteOne";

// 🔥 Force Next.js to NEVER cache this secret preview page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function LivePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  // Direct Firebase fetch to bypass any caching layers
  const docRef = doc(db, "websites", name);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const dbData = docSnap.data();

  if (!dbData || !dbData.websiteOneData) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen relative">
      {/* 
        🚀 CRITICAL FIX: This script forces Tailwind to scan your database classes 
        (like mt-96, text-8xl) and generate the CSS for them instantly in the browser. 
      */}
      <script src="https://cdn.tailwindcss.com"></script>

      <WebsiteOne data={dbData.websiteOneData} />
    </main>
  );
}