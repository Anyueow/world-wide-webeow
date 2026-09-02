import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export. Every route is prerendered to HTML at build time, so
  // Netlify serves plain files from a CDN with no adapter and no server runtime
  // involved. This is the safest possible Netlify target and the fastest one.
  output: "export",

  // Static export cannot use the built-in Next image optimizer, so images route
  // through Netlify's Image CDN instead. See src/lib/image-loader.ts.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },

  // Emits /experiences/index.html rather than /experiences.html, which is what
  // Netlify's static file server expects for clean URLs.
  trailingSlash: true,
};

export default nextConfig;
