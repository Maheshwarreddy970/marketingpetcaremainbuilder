import { notFound } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";
import ClientDashboard from "./ClientDashboard";

export default async function ClientPage({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;

    // Fetch data from Firebase via the slug
    const dbData = await getWebsiteData(name);
    // If no client exists under this slug, throw 404
    if (!dbData) {
        notFound();
    }
    // Pass data to the interactive dashboard
    return <ClientDashboard name={name} dbData={dbData} />;
}