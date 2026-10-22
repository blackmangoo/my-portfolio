import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ammar Akbar — AI/ML Engineer Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0E1110",
          color: "#F3F4F6",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          border: "2px solid #232D27",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#10B981",
              fontWeight: 600,
            }}
          >
            Ammar Akbar • Portfolio
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            AI/ML Engineer
          </h1>
          <p
            style={{
              fontSize: "28px",
              color: "#9CA3AF",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: "960px",
            }}
          >
            Specializing in LLM Orchestration, Retrieval-Augmented Generation (RAG), and Applied NLP.
          </p>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          {["FAST-NUCES Graduate", "LoRA / QLoRA", "pgvector (HNSW)", "YOLO11", "FastAPI"].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  backgroundColor: "#161B18",
                  border: "1px solid #232D27",
                  fontSize: "18px",
                  color: "#D1D5DB",
                  fontWeight: 500,
                }}
              >
                {badge}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
