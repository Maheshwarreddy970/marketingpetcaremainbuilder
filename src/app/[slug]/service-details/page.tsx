import { notFound } from "next/navigation";
import TenantShell from "@/components/templates/TenantShell";
import { buildTenantMetadata, getTenantPageContext } from "@/lib/tenant-metadata";
import {
  getOtherServices,
  getServicesList,
  getServiceSlug,
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return {};

  const services = getServicesList(ctx.templateData);
  const firstService = services[0];
  if (!firstService) return {};

  const firstSlug = getServiceSlug(firstService, 0);

  return buildTenantMetadata(slug, {
    pageTitle: firstService.title || firstService.name || "Service Details",
    pageDescription: firstService.subheading || firstService.description,
    canonicalPath: `/services/${firstSlug}`,
  });
}

export default async function DefaultServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ctx = await getTenantPageContext(slug);
  if (!ctx) return notFound();

  const services = getServicesList(ctx.templateData);
  const firstService = services[0];
  if (!firstService) return notFound();

  const otherServices = getOtherServices(services, 0);

  return (
    <TenantShell data={ctx.templateData} settings={ctx.settings} isSubPage={false}>
      <ServiceDetailView
        data={ctx.templateData}
        settings={ctx.settings}
        service={firstService}
        otherServices={otherServices}
      />
    </TenantShell>
  );
}