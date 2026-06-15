import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — the stacked O&CO mark on sand. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#d8cebf",
          color: "#14233b",
          fontFamily: "sans-serif",
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        <div style={{ display: "flex", fontSize: 66 }}>
          O<span style={{ color: "#b3764c" }}>&</span>
        </div>
        <div style={{ display: "flex", fontSize: 66 }}>
          CO<span style={{ color: "#b3764c" }}>.</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
