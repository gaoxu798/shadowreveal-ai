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
          background: "linear-gradient(135deg, #1a0000 0%, #030303 100%)",
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Eyelid top curve */}
        <div style={{
          position: "absolute",
          width: 28,
          height: 14,
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background: "transparent",
          border: "1.5px solid rgba(184,134,11,0.8)",
          borderBottom: "none",
          top: 8,
        }} />
        {/* Eyelid bottom curve */}
        <div style={{
          position: "absolute",
          width: 28,
          height: 9,
          borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          background: "transparent",
          border: "1px solid rgba(184,134,11,0.5)",
          borderTop: "none",
          top: 17,
        }} />
        {/* Iris */}
        <div style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "radial-gradient(circle at 40% 35%, #ff3300 0%, #cc0000 35%, #800000 65%, #2a0000 100%)",
          border: "1px solid rgba(184,134,11,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 0 6px rgba(220,38,38,0.8), 0 0 12px rgba(220,38,38,0.3)",
        }}>
          {/* Pupil */}
          <div style={{
            width: 6,
            height: 7,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #1a0000, #000)",
          }} />
          {/* Highlight */}
          <div style={{
            position: "absolute",
            width: 3,
            height: 2,
            borderRadius: "50%",
            background: "rgba(255,200,180,0.6)",
            top: 3,
            left: 2,
          }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
