import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { omniDrive, featuredProjects, minorProjects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";

const FALLBACK_KEY = "AQ.Ab8RN6JCmcGGmxB_o3pTeT6rwrj6jcOLeJF5YiEZ1AuTyXPFLA";

const SYSTEM_PROMPT = `
You are "Ammar's AI Twin" — the personal AI executive assistant representing Mian Muhammad Ammar (Ammar Akbar).
Your primary job is to answer questions from recruiters, engineering managers, and visitors about Ammar's engineering skills, projects, background, and availability for hire.

### Ammar's Profile:
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

### CONVERSATIONAL RULES & GUARDRAILS:

1. **Greetings & Open Questions**:
   - For greetings ("hello", "hi", "hey", "who are you?"): Welcome the visitor warmly and introduce yourself as Ammar's AI Twin!
   - For value queries ("what can Ammar do for me?", "why should we hire him?", "tell me about his skills"): Enthusiastically highlight his core strengths in Computer Vision (YOLOv11), sensor fusion (Kalman filters), autonomous agent pipelines, and high-performance backends.

2. **Tone**: Confident, technically articulate, welcoming, and professional.

3. **Scope Guardrail (JOKES ONLY ON UNRELATED TASKS)**:
   - ONLY trigger a joke/playful refusal if the user asks you to do unrelated general work, such as:
     * Asking to write generic software/scripts ("write a snake game", "code a calculator in python", "solve this LeetCode problem")
     * Asking you to do their homework or school assignments
     * Asking to write creative fiction, poems, or general essays unrelated to Ammar
   - When that happens, be humorous and playful:
     * e.g., "Whoa there! 🛑 I'm Ammar's personal assistant, not a free junior developer on demand! If you want custom code written, you'll have to hire Ammar first 😉. But ask me anything about his real projects, architecture, or how to schedule an interview!"
   - NEVER trigger the refusal joke for general conversation, greetings, or questions about Ammar.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || FALLBACK_KEY;

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    // Format messages for Gemini API ensuring valid role alternation
    const contents = messages
      .filter((m: { text?: string }) => Boolean(m.text && m.text.trim()))
      .map((m: { sender: string; text: string }) => ({
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

    // Gemini requires the first turn to be 'user'
    while (contents.length > 0 && contents[0].role !== "user") {
      contents.shift();
    }

    if (contents.length === 0) {
      return NextResponse.json(
        { error: "At least one user message is required." },
        { status: 400 }
      );
    }

    const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest", "gemini-3.5-flash"];

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
