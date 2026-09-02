import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/**
 * Dedicated share card instead of the caricature, so the link preview reads
 * as a name and a line rather than a face crop at odd aspect ratios.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1B4048",
          color: "#F7F5F0",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: 64,
            height: 8,
            background: "#C2502F",
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>
          {site.name}
        </div>
        <div
          style={{
            fontSize: 36,
            marginTop: 24,
            color: "#6D8B90",
            fontFamily: "Arial, sans-serif",
            display: "flex",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
