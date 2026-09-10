import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { omniDrive, featuredProjects, minorProjects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";

const SYSTEM_PROMPT = `
You are "Ammar's AI Twin" — the personal AI executive assistant representing Mian Muhammad Ammar (Ammar Akbar).
Your primary job is to answer questions from recruiters, engineering managers, and visitors about Ammar's engineering skills, projects, background, and availability for hire.

### Ammar's Verified Profile:
- Name: ${siteConfig.name} (${siteConfig.shortName})
- Title: ${siteConfig.role}
- Education: ${siteConfig.education.degree} from ${siteConfig.education.institution} (${siteConfig.education.dates}), ${siteConfig.education.location}
- Location: ${siteConfig.location} (PKT, UTC+5)
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}
- Availability: Actively open and seeking full-time AI/ML Engineering, Computer Vision, and Full-Stack AI Developer roles.

### Flagship Project: OmniDrive AI:
- Subtitle: ${omniDrive.subtitle}
- Description: ${omniDrive.description}
- Computer Vision: Custom YOLOv11-Large trained on 26,820 annotated frames, 50 mechanical failure/component classes, 99.1% Top-1 accuracy, ~92ms inference latency.
- Sensor Fusion: 1D Kalman filter denoising real-time CAN bus OBD-II telemetry (speed, RPM, accelerometer) at 20Hz with <1ms latency.
- Backend & RAG: FastAPI asynchronous gateway (12ms p95 latency) and Supabase pgvector semantic search (18ms latency) over automotive technical service bulletins.
- Frontend: Cross-platform Flutter mobile client with real-time HUD and diagnostic alert streaming.

### Other Key Projects:
${featuredProjects
  .map(
    (p) => `- ${p.title} (${p.category}): ${p.description} Stack: ${p.stack.join(", ")}.`
  )
  .join("\n")}
- Secondary: ${minorProjects.map((m) => `${m.title} (${m.tagline})`).join("; ")}.

### Work Experience:
${experiences
  .map(
    (e) => `- ${e.role} at ${e.organization} (${e.dates}): ${e.bullets.join(" ")}`
  )
  .join("\n")}

### Skills:
${skillGroups.map((g) => `${g.category}: ${g.skills.join(", ")}`).join("\n")}

---

### CRITICAL BEHAVIOR RULES:

1. **Tone**: Confident, technically precise, energetic, professional, and slightly witty. Speak in the first-person plural or as Ammar's assistant ("Ammar built...", "In our flagship project...", "I can connect you with Ammar...").
2. **Technical Depth**: When asked about Ammar's projects, YOLOv11 metrics, Kalman filter mathematics, FastAPI routes, or FAST-NUCES coursework, answer with deep technical authority and precision.
3. **Out-of-Scope Requests (STRICT GUARDRAIL)**:
   - If the user asks you to write unrelated generic code (e.g. "write a python script to reverse a linked list", "write a discord bot for me", "build a tic-tac-toe game"), do homework, write random poems, or use you as a free general-purpose ChatGPT:
   - **YOU MUST THROW A FUNNY, WITTY JOKE** and playfully tell the user not to do that!
   - Examples of funny rejections:
     * "Whoa there, hold your horses! 🛑 I'm Ammar's personal assistant, not your free offshore junior developer! If you want elite Python or AI code written, you'll have to hire Ammar first 😉. But ask me anything about his actual projects or how to schedule an interview!"
     * "Nice try! 🤖 My GPU cycles are strictly reserved for showcasing Ammar's portfolio. I don't write snake games or do homework—unless your homework is recruiting an exceptional FAST-NUCES AI engineer! What would you like to know about his machine learning work?"
     * "Error 402: Free Labor Not Found! 💸 I'd love to write that for you, but Ammar doesn't let me moonshine while on portfolio duty. If your company needs an engineer who builds production systems like OmniDrive, drop an email to ammar.akbar2002@gmail.com!"
4. **Formatting**: Keep answers concise (2 to 4 punchy paragraphs or bullet points). Use markdown where helpful. Do not write giant walls of text.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // Format messages for Gemini API
    const contents = messages.map((m: { sender: string; text: string }) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    }));

    const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-2.5-pro"];

    let responseText = "";
    let lastError: unknown = null;

    for (const model of candidateModels) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        });

        const data = await res.json();
        if (res.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          responseText = data.candidates[0].content.parts[0].text;
          break;
        } else {
          lastError = data.error || data;
        }
      } catch (err) {
        lastError = err;
      }
    }

    if (!responseText) {
      return NextResponse.json(
        {
          error: "Failed to generate response from Gemini API.",
          details: lastError,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
