import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

/**
 * Replaces the default Next.js favicon. Wordmark initial on the Pacifica
 * dusk ocean, not the caricature, so it stays legible at 16px in a tab.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B4048",
          borderRadius: 6,
          color: "#F7F5F0",
          fontFamily: "Georgia, serif",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
