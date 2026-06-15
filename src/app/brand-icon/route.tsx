import { ImageResponse } from "next/og";

// Cache the generated PWA icon as a static asset.
export const dynamic = "force-static";

/**
 * 512×512 app icon for the web manifest. The stacked O&CO mark sits centered on
 * sand with generous padding, so it reads well as both an "any" and a
 * "maskable" icon.
 */
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d8cebf",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#14233b",
            fontFamily: "sans-serif",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          <div style={{ display: "flex", fontSize: 150 }}>
            O<span style={{ color: "#b3764c" }}>&</span>
          </div>
          <div style={{ display: "flex", fontSize: 150 }}>
            CO<span style={{ color: "#b3764c" }}>.</span>
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
