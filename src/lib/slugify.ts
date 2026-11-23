export function getServiceSlug(service: { slug?: string; title?: string; name?: string }): string {
  const raw = service?.slug || service?.title || service?.name || "";
  return raw
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}