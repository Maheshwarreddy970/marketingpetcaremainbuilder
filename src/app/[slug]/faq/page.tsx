import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";
import FAQPageView from "@/components/landingpageone/FAQPageView";

export const revalidate = 31536000;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildTenantMetadata(slug, { pageTitle: "FAQ", canonicalPath: "/faq" });
}

export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  return (
    <TenantShell data={ctx.templateData} settings={ctx.settings} isSubPage={false}>
      <FAQPageView data={ctx.templateData} settings={ctx.settings} />
    </TenantShell>
  );
}