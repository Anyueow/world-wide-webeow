import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Same mark as `icon.tsx`, scaled up for the iOS home screen tile. */
export default function AppleIcon() {
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
          color: "#F7F5F0",
          fontFamily: "Georgia, serif",
          fontSize: 100,
          fontWeight: 700,
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
