import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";
import ContactPageView from "@/components/landingpageone/ContactPageView";

export const revalidate = 31536000;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildTenantMetadata(slug, { pageTitle: "Contact Us", canonicalPath: "/contact" });
}

export default async function ContactPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  return (
    <TenantShell data={ctx.templateData} settings={ctx.settings} isSubPage={false}>
      <ContactPageView data={ctx.templateData} settings={ctx.settings} slug={slug} />
    </TenantShell>
  );
}