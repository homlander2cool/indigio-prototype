import { ImageResponse } from "next/og";

export const alt = "RBC Indigio — Global Wealth Reimagined";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", background: "linear-gradient(135deg, #071a2b, #0b2340 65%, #17395f)", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 28, letterSpacing: 8, color: "#f2d686" }}>RBC INDIGIO</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Global Wealth<br />Reimagined</div>
        <div style={{ display: "flex", fontSize: 28, color: "#d8e3f3" }}>Tokenized real estate and private-market opportunities.</div>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#e9c992" }}>Institutional access. Transparent reporting. Verified onboarding.</div>
    </div>,
    size,
  );
}
