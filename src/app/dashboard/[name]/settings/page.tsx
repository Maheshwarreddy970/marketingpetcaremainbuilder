import { notFound } from "next/navigation";
import { getWebsiteData } from "@/lib/get-website";
import ClientSettings from "./ClientSettings";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data = await getWebsiteData(name);

  if (!data) {
    return notFound();
  }

  return <ClientSettings slug={name} initialData={data.websiteOneData} />;
}