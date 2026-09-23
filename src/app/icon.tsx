import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
          borderRadius: 14,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 72 72">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <g transform="translate(6,6)">
            <rect x="0" y="0" width="60" height="60" rx="14" fill="none" stroke="url(#g)" strokeWidth="4" />
            <rect x="14" y="10" width="8" height="40" rx="4" fill="#22d3ee" />
            <path d="M32 10 a15 15 0 1 0 0.1 0" fill="none" stroke="#3b82f6" strokeWidth="9" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
