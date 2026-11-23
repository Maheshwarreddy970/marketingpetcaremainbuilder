export function getServicesList(templateData: any): any[] {
  const s = templateData?.services;
  if (!s) return [];
  if (Array.isArray(s)) return s;
  return s.items || s.services || s.cards || [];
}

export function getServiceSlug(service: any, fallbackIndex = 0): string {
  const raw = service?.slug || service?.title || service?.name || `service-${fallbackIndex + 1}`;
  return String(raw)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findServiceBySlug(services: any[], targetSlug: string) {
  const normalized = targetSlug.toLowerCase().trim();
  const index = services.findIndex((item, idx) => getServiceSlug(item, idx) === normalized);
  if (index === -1) return null;
  return { service: services[index], index };
}

export function getOtherServices(services: any[], activeIndex: number) {
  return services
    .map((item, idx) => ({ ...item, _slug: getServiceSlug(item, idx) }))
    .filter((_, idx) => idx !== activeIndex);
}