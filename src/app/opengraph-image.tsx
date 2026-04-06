import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MFD Creative Staging — Premium Home Staging Melbourne";
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

      {/* Eyebrow */}
      <p
        style={{
          fontSize: "13px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "20px",
          fontWeight: 500,
        }}
      >
        Melbourne, Australia
      </p>

      {/* Heading */}
      <h1
        style={{
          fontSize: "72px",
          fontWeight: 700,
          color: "#ffffff",
          lineHeight: 1.05,
          marginBottom: "24px",
          fontFamily: "Playfair Display, serif",
          maxWidth: "820px",
        }}
      >
        MFD Creative Staging
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: "22px",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "600px",
          lineHeight: 1.5,
          marginBottom: "40px",
        }}
      >
        Premium home staging that sells faster and achieves higher prices.
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
