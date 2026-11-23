/**
 * Optimizes Cloudinary image URLs with on-the-fly resizing, format negotiation (AVIF/WebP),
 * and automatic quality compression while safely handling edge cases and non-Cloudinary URLs.
 */
export function optimizeCloudinaryImage(
  url: string | undefined | null,
  width: number = 800
): string {
  if (!url || typeof url !== "string") return "";

  const trimmed = url.trim();
  if (!trimmed) return "";

  // Leave non-Cloudinary URLs, data URIs, and SVGs untouched
  if (
    !trimmed.includes("res.cloudinary.com") ||
    trimmed.startsWith("data:") ||
    /\.svg(\?|$)/i.test(trimmed)
  ) {
    return trimmed;
  }

  const uploadMarker = "/upload/";
  const uploadIndex = trimmed.indexOf(uploadMarker);
  if (uploadIndex === -1) return trimmed;

  const safeWidth = Number.isFinite(width) && width > 0 ? Math.round(width) : 800;
  const prefix = trimmed.slice(0, uploadIndex + uploadMarker.length);
  const rest = trimmed.slice(uploadIndex + uploadMarker.length);

  // c_limit: shrinks oversized images without ever upscaling (saves bandwidth)
  // f_auto: serves AVIF/WebP automatically based on browser support
  // q_auto: optimal compression without visible quality loss
  const transforms = `c_limit,w_${safeWidth},f_auto,q_auto`;

  // Case 1: URL contains a version segment (e.g., v1785604722/folder/img.jpg)
  // Strip any existing transformation segments before the version marker
  const versionMatch = rest.match(/(?:^|\/)(v\d+\/.*)$/);
  if (versionMatch) {
    return `${prefix}${transforms}/${versionMatch[1]}`;
  }

  // Case 2: Unversioned URL (e.g., gos_q5rxld.avif or f_auto,q_auto/gos_q5rxld.avif)
  // Drop leading transformation segments so parameters never stack or duplicate
  const segments = rest.split("/");
  const isTransformSegment = (seg: string) =>
    /^(?:[a-z]{1,2}_[^/]+)(?:,[a-z]{1,2}_[^/]+)*$/i.test(seg);

  while (segments.length > 1 && isTransformSegment(segments[0])) {
    segments.shift();
  }

  return `${prefix}${transforms}/${segments.join("/")}`;
}