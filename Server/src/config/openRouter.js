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
    const masterPrompt = `You are an expert frontend UI generator.

Generate ONLY ONE modern responsive webpage UI for:
"${prompt}"

Return ONLY valid JSON.
No markdown.
No explanations.
No comments.
No extra text.

The webpage must:
- look modern and clean
- be mobile responsive
- use good visual hierarchy
- contain realistic content related to the prompt
- focus only on frontend UI structure

Return JSON in this exact format:

{
  "title": "string",
  "description": "string",
  "path": "string",
  "components": []
}

Allowed component types:
navbar
hero
features
about
services
pricing
testimonials
stats
cta
faq
contact
gallery
footer
richtext

Each component must follow this format:

{
  "type": "component_type",
  "order": 1,
  "props": {},
  "styles": {
    "bg": "string",
    "text": "string"
  }
}

Component props rules:

navbar:
{
  "logo": "string",
  "links": [
    {
      "label": "string",
      "path": "string"
    }
  ]
}

hero:
{
  "headline": "string",
  "subheadline": "string",
  "buttons": [
    {
      "label": "string",
      "path": "string"
    }
  ]
}

features:
{
  "title": "string",
  "items": [
    {
      "title": "string",
      "description": "string"
    }
  ]
}

services:
{
  "title": "string",
  "items": [
    {
      "title": "string",
      "description": "string"
    }
  ]
}

testimonials:
{
  "title": "string",
  "items": [
    {
      "name": "string",
      "review": "string"
    }
  ]
}

faq:
{
  "title": "string",
  "items": [
    {
      "question": "string",
      "answer": "string"
    }
  ]
}

contact:
{
  "title": "string",
  "email": "string",
  "phone": "string"
}

footer:
{
  "copyright": "string"
}

Rules:
- navbar must be first
- footer must be last
- use only allowed component types
- use 4-7 components only
- use hero only once
- all component order values must be unique
- path must start with "/"
- keep JSON small and clean
- avoid deeply nested objects
- output must be valid for JSON.parse()
`;

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