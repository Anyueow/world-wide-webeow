type LoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Routes next/image through Netlify's Image CDN, which gives us resizing,
 * WebP/AVIF negotiation and caching even though the site is a static export.
 *
 * Locally there is no /.netlify endpoint, so we hand back the raw path and let
 * the browser load the original file.
 */
export default function netlifyImageLoader({ src, width, quality }: LoaderArgs): string {
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (process.env.NODE_ENV === "development") {
    return src;
  }

  const params = new URLSearchParams({
    url: src,
    w: String(width),
    q: String(quality ?? 74),
  });

  return `/.netlify/images?${params.toString()}`;
}
