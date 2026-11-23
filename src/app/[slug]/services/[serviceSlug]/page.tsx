import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";
import {
  findServiceBySlug,
  getOtherServices,
  getServicesList,
} from "@/lib/service-helpers";
import ServiceDetailView from "@/components/landingpageone/ServiceDetailView";

export const revalidate = 31536000;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; serviceSlug: string }>;
}) {
  const { slug, serviceSlug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return {};

  const services = getServicesList(ctx.templateData);
  const match = findServiceBySlug(services, serviceSlug);
  if (!match) return {};

  return buildTenantMetadata(slug, {
    pageTitle: match.service.title || match.service.name || "Service Details",
    pageDescription: match.service.subheading || match.service.description,
    canonicalPath: `/services/${serviceSlug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; serviceSlug: string }>;
}) {
  const { slug, serviceSlug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  const services = getServicesList(ctx.templateData);
  const match = findServiceBySlug(services, serviceSlug);
  if (!match) return notFound();

  const otherServices = getOtherServices(services, match.index);

  return (
    <TenantShell data={ctx.templateData} settings={ctx.settings} isSubPage={false}>
      <ServiceDetailView
        data={ctx.templateData}
        settings={ctx.settings}
        service={match.service}
        otherServices={otherServices}
      />
    </TenantShell>
  );
}