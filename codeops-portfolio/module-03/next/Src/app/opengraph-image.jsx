import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Addis Eats Ethiopian food delivery";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#5b251b",
          color: "#fff7e8",
        }}
      >
        <div style={{ fontSize: 32 }}>BOLE · ADDIS ABABA</div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            marginTop: 24,
          }}
        >
          Addis Eats
        </div>
        <div style={{ fontSize: 36, marginTop: 20 }}>
          Ethiopian favorites, delivered.
        </div>
        <div style={{ fontSize: 25, marginTop: 45 }}>
          Discover your next favorite dish.
        </div>
      </div>
    ),
    size
  );
}