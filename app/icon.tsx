import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#030303",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(184,134,11,0.4)",
        }}
      >
        {/* Eye / void symbol */}
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "radial-gradient(circle, #dc2626 0%, #7a0000 50%, #1a0000 100%)",
            border: "1.5px solid rgba(184,134,11,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#030303",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
