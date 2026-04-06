import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Staging Packages — MFD Creative Staging";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const playfair = await fetch(
    "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQ.woff",
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundColor: "#0a0a0a",
        padding: "72px 80px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
      }}
    >
      {/* Subtle top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 80,
          right: 80,
          height: "2px",
          backgroundColor: "rgba(255,255,255,0.12)",
        }}
      />

      {/* Package tier pills */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {["Essential", "Signature", "Luxury"].map((tier) => (
          <span
            key={tier}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "5px 14px",
              fontWeight: 500,
            }}
          >
            {tier}
          </span>
        ))}
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "68px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.05,
          marginBottom: "24px",
          fontFamily: "Playfair Display, serif",
          maxWidth: "800px",
        }}
      >
        Staging Packages
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: "22px",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "640px",
          lineHeight: 1.5,
          marginBottom: "40px",
        }}
      >
        Tailored staging solutions for every property and budget — with premium
        furniture, full installation, and dedicated support.
      </p>

      {/* Bottom rule */}
      <div
        style={{
          width: "48px",
          height: "2px",
          backgroundColor: "rgba(255,255,255,0.25)",
        }}
      />
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfair,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
