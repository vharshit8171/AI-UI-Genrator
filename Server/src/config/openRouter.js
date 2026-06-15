import Groq from "groq-sdk";
import { ApiError } from "../utils/ApiError.js";
import { websiteGenerationSchema } from "../schema/website.schema.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateWebsiteWithAI = async (
  prompt,
  aiModel = "llama-3.3-70b-versatile"
) => {
  try {
    const masterPrompt = `You are a JSON API. Output only raw JSON. No markdown, no code blocks, no comments.

Task: Generate a modern responsive webpage UI for: "${prompt}"

OUTPUT FORMAT:
{
  "title": "string",
  "description": "string",
  "path": "/lowercase-hyphenated",
  "theme": {
    "accent": "#hex",
    "bg": "#hex",
    "surface": "rgba(r,g,b,a)",
    "text": "#hex",
    "mutedText": "rgba(r,g,b,a)",
    "radius": "sharp|rounded|pill",
    "fontStyle": "modern|elegant|playful|technical",
    "mood": "dark" | "light" | "glass"
  },
  "components": [{
    "type": "string",
    "order": 1,
    "props": {},
    "styles": {
      "bg": "#hex",
      "text": "#hex",
      "accent": "#hex",
      "layout": "centered|left|split",
      "density": "compact|normal|spacious",
      "pattern": "none|grid|dots|lines",
      "glass": true,
      "gradient": true
    }
  }]
}

THEME RULES:
- accent: brand color for buttons/highlights, must contrast on dark bg
- bg: very dark hex (#0a0a0f #0f172a #111827)
- surface: slightly lighter than bg for cards
- radius: sharp=fintech/crypto, rounded=SaaS, pill=consumer/playful
- fontStyle: modern=SaaS, elegant=luxury, playful=kids, technical=devtools
- Match personality to page type
- dark  → bg very dark, text white
- light → bg very light, text dark
- glass → semi-transparent surfaces with blur

STYLES RULES:
- hero: gradient:true, density:spacious, layout:centered or split
- features/services: glass:true, pattern:grid or dots
- stats/cta: gradient:true, layout:centered
- testimonials: glass:true, pattern:dots
- about: layout:split
- navbar/footer: density:compact, no pattern, no glass
- Only set accent in styles if different from theme
- bg must match theme palette

CONTENT DEPTH RULES (IMPORTANT):
- features/services: MIN 6 items
- testimonials: MIN 4 items
- pricing: MIN 3 plans
- stats: MIN 3 items
- faq: MIN 4 items
- gallery: MIN 6 items
- navbar links: MIN 3 links
- Descriptions and reviews must be specific, non-generic, 15–40 words.
- Never generate fewer than required minimums.

ALLOWED TYPES (4-5 total):
navbar(required), hero, features, about, services, pricing, testimonials, stats, cta, faq, contact, gallery, richtext, footer(required)

PROPS SCHEMA:
navbar: { logo:string, links:[{label, path}] }
hero: { headline, subheadline, buttons:[{label, path}] }
features: { title, items:[{title, description}] }
about: { title, description }
services: { title, items:[{title, description}] }
pricing: { title, plans:[{name, price, features:[string]}] }
testimonials: { title, items:[{name, review}] }
stats: { title, items:[{label, value}] }
cta: { headline, subheadline, button:{label, path} }
faq: { title, items:[{question, answer}] }
contact: { title, email, phone }
gallery: { title, items:[{caption}] }
richtext: { title, body }
footer: { copyright }

STRICT RULES:
1. navbar order:1, footer order:last
2. order starts at 1, no gaps or duplicates
3. path: lowercase, hyphenated, starts with /
4. hero used at most once
5. Only use defined keys, no extras
6. All arrays must respect CONTENT DEPTH RULES
7. Output valid JSON only`;

    const response = await groq.chat.completions.create({
      model: aiModel,
      messages: [{
        role: "system",
        content:
          "You are an expert full-stack web designer and website generation AI. You ALWAYS respond with valid JSON only. Never include markdown, comments, or explanations.",
      },
      {
        role: "user",
        content: masterPrompt,
      },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      top_p: 1,
      stream: false,
    });

    const aiRaw = response.choices[0]?.message?.content;

    if (!aiRaw) {
      throw new ApiError(500, "AI returned empty response");
    }
    const cleanedResponse = aiRaw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedJson;
    try {
      parsedJson = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError.message);
      console.error(
        "🔍 Raw response (first 500 chars):",
        cleanedResponse.substring(0, 500)
      );
      throw new ApiError(500, "AI response is not valid JSON");
    }

    if (parsedJson.path) {
      parsedJson.path = parsedJson.path
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-/]/g, "");

      if (!parsedJson.path.startsWith("/")) {
        parsedJson.path = `/${parsedJson.path}`;
      }
    }
    const validation = websiteGenerationSchema.safeParse(parsedJson);

    if (!validation.success) {
      console.error("❌ Zod Validation Error:");
      console.error(JSON.stringify(validation.error.format(), null, 2));
      throw new ApiError(500, "AI response structure invalid");
    }

    validation.data.components.sort((a, b) => a.order - b.order);
    return validation.data;

  } catch (error) {
    console.error("❌ AI Service Error:", error.message);

    if (error.status === 429) {
      throw new ApiError(429, "Rate limit exceeded. Please try again later.");
    }
    if (error.status === 401) {
      throw new ApiError(401, "Invalid Groq API key");
    }
    if (error.status === 400) {
      throw new ApiError(400, "Invalid request to Groq API");
    }

    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to generate website"
    );
  }
};