import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";
import LegalPageView from "@/components/landingpageone/LegalPageView";

export const revalidate = 31536000;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return buildTenantMetadata(slug, {
    pageTitle: "Privacy Policy",
    canonicalPath: "/privacy-policy",
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  return (
    <TenantShell data={ctx.templateData} settings={ctx.settings} isSubPage={false}>
      <LegalPageView
        type="privacy"
        data={ctx.templateData}
        settings={ctx.settings}
        domain={ctx.domain}
      />
    </TenantShell>
  );
}