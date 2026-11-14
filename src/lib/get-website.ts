import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getWebsiteData = async (slug: string) => {
  if (!slug || typeof slug !== "string") return null;

  try {
    const snap = await getDoc(doc(db, "websites", slug));
    return snap.exists() ? snap.data() : null;
  } catch (error) {
    console.error("Error fetching website:", error);
    return null;
  }
};