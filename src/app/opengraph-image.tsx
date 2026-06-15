import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — Architectural Home Builders in Australia`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph / social share card (1200×630). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #14233b 0%, #1d3052 60%, #14233b 100%)",
          color: "#f4f0e8",
          fontFamily: "sans-serif",
        }}
      >
        {/* Inset frame */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            border: "1px solid rgba(244,240,232,0.18)",
            borderRadius: 10,
            display: "flex",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>
            O<span style={{ color: "#b3764c" }}>&</span>CO
            <span style={{ color: "#b3764c" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 19,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(244,240,232,0.7)",
            }}
          >
            Based in Australia
          </div>
        </div>

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, fontWeight: 800, lineHeight: 1 }}>
            O<span style={{ color: "#b3764c" }}>&</span>CO
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 110,
              fontWeight: 300,
              lineHeight: 1,
              letterSpacing: 6,
              color: "rgba(244,240,232,0.82)",
            }}
          >
            HOMES
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            maxWidth: 880,
            fontSize: 27,
            lineHeight: 1.35,
            color: "rgba(244,240,232,0.8)",
          }}
        >
          Architectural homes designed &amp; built across Australia — since {siteConfig.foundingYear}.
        </div>
      </div>
    ),
    { ...size },
  );
}
