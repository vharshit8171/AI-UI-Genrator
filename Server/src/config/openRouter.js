import axios from "axios";
import { ApiError } from "../utils/ApiError.js";
import { websiteGenerationSchema } from "../schema/website.schema.js";

export const generateWebsiteWithAI = async (prompt, aiModel) => {
  try {

    const masterPrompt = `
You are an expert full-stack web designer and website generation AI.

---

## ⚡ USER REQUEST — THIS IS WHAT YOU MUST BUILD:
"""
${prompt}
"""

THIS IS THE ONLY THING THAT MATTERS. Every page, every component, every word of content MUST be directly about: "${prompt}"

DO NOT generate a generic website. DO NOT ignore the request above.
DO NOT use "Tech Innovators" or any placeholder business name.
Build EXACTLY what the user asked for. Nothing else.

---

## YOUR JOB:
1. Design a high-quality, modern, fully responsive website based on the USER REQUEST above.
2. Return your design as a single, strictly structured JSON object parseable by JSON.parse().

You must ALWAYS respond with a single valid JSON object.
Never include explanations, markdown, code blocks, or any text outside the JSON.

---

## PART 1 — DESIGN PRINCIPLES

### 1. Responsiveness
* Mobile-first design (320px → 1920px)
* Use fluid layouts (flex/grid)
* Navbar must collapse on mobile

### 2. Visual Hierarchy & Typography
* One clear H1 per page
* Clean, industry-appropriate fonts
* Readable spacing and contrast (WCAG AA)

### 3. Color System
* Primary color, neutral background, accent color
* Max 3–4 colors total

### 4. Spacing & Layout
* Generous spacing (60px desktop / 40px mobile)
* Consistent grid gaps (16–24px)

### 5. CTA Strategy
* Clear primary CTA per page
* Hero must include CTA
* Use strong action text ("Get Started", not "Click Here")

### 6. Content Quality
* All content MUST be specific to: "${prompt}"
* No placeholder text — write real, relevant content
* Testimonials must feel real (name, role, company)
* Benefits > features

### 7. Accessibility
* Proper contrast, alt text, clear navigation

### 8. Page Structure
* Homepage = full story
* Inner pages = focused
* Navbar first, footer last on every page

### 9. Industry Tone
* Detect industry from the user request and adapt tone accordingly

### 10. Performance
* 4–8 components per page maximum
* Avoid repetition, prioritize above-the-fold

---

## PART 2 — RESPONSE STRUCTURE

Return EXACTLY this JSON format:

{
  "website": {
    "title": "string — must reflect: ${prompt}",
    "description": "string — must describe: ${prompt}",
    "slug": "string"
  },
  "pages": [
    {
      "name": "string",
      "path": "string",
      "order": number,
      "isHomePage": boolean,
      "components": [
        {
          "type": "string",
          "name": "string",
          "order": number,
          "props": {},
          "styles": {
            "backgroundColor": "string (required)",
            "textColor": "string (required)",
            "fontFamily": "string (required)",
            "padding": "string (required)",
            "alignment": "left | center | right",
            "layout": "grid | flex | list",
            "borderRadius": "string",
            "shadow": "none | sm | md | lg"
          }
        }
      ]
    }
  ]
}

---

## PART 3 — COMPONENT RULES (CRITICAL)

### ALLOWED TYPES (exact lowercase only):
navbar, hero, page_header, features, about, services, pricing, testimonials, team, stats, cta, faq, contact, gallery, blog_list, richtext, footer

### TYPE MAPPING:
- "reviews", "feedback" → testimonials
- "banner", "header" on homepage → hero
- "header" on inner page → page_header
- "team members", "staff" → team
- "numbers", "metrics", "achievements" → stats
- "portfolio", "images", "photos" → gallery
- "articles", "posts", "news" → blog_list
- "about us" → about
- "what we offer", "offerings" → services
- "plans", "packages" → pricing
- "contact us", "get in touch" → contact
- "questions", "FAQ" → faq
- "call to action", "signup prompt" → cta

### NEVER invent types outside the allowed list.

---

## COMPONENT SCHEMAS

### navbar
{ "logo": "string", "links": [{ "label": "string", "path": "string" }], "ctaButton": { "label": "string", "path": "string" }, "sticky": boolean, "transparent": boolean }

### hero
{ "headline": "string", "subheadline": "string", "ctaButtons": [{ "label": "string", "path": "string", "variant": "primary | secondary" }], "backgroundType": "color | gradient | image", "backgroundImage": "https://placehold.co/1200x600", "badge": "string" }

### page_header
{ "heading": "string", "subheading": "string", "backgroundType": "color | gradient" }

### features
{ "heading": "string", "subheading": "string", "columns": number, "items": [{ "icon": "string", "title": "string", "description": "string" }] }

### about
{ "heading": "string", "description": "string", "image": "https://placehold.co/600x400", "highlights": ["string"] }

### services
{ "heading": "string", "subheading": "string", "items": [{ "icon": "string", "title": "string", "description": "string", "price": "string" }] }

### pricing
{ "heading": "string", "subheading": "string", "plans": [{ "name": "string", "price": "string", "period": "string", "features": ["string"], "ctaLabel": "string", "highlighted": boolean }] }

### testimonials
{ "heading": "string", "subheading": "string", "layout": "grid | carousel", "items": [{ "quote": "string", "author": "string", "role": "string", "company": "string", "rating": number }] }

### team
{ "heading": "string", "subheading": "string", "members": [{ "name": "string", "role": "string", "bio": "string", "image": "https://placehold.co/300x300" }] }

### stats
{ "heading": "string", "items": [{ "value": "string", "label": "string", "icon": "string" }] }

### cta
{ "heading": "string", "subheading": "string", "buttons": [{ "label": "string", "path": "string", "variant": "primary | secondary" }], "backgroundType": "color | gradient" }

### faq
{ "heading": "string", "subheading": "string", "items": [{ "question": "string", "answer": "string" }] }

### contact
{ "heading": "string", "subheading": "string", "fields": ["name", "email", "message"], "submitLabel": "string", "address": "string", "email": "string", "phone": "string" }

### gallery
{ "heading": "string", "layout": "grid | masonry", "items": [{ "image": "https://placehold.co/600x400", "caption": "string" }] }

### blog_list
{ "heading": "string", "subheading": "string", "posts": [{ "title": "string", "excerpt": "string", "date": "string", "author": "string", "image": "https://placehold.co/600x400" }] }

### richtext
{ "content": "string (HTML or markdown)" }

### footer
{ "logo": "string", "tagline": "string", "links": [{ "label": "string", "path": "string" }], "socialLinks": [{ "platform": "string", "url": "string" }], "showNewsletter": boolean, "copyright": "string" }

---

## PART 4 — STRICT RULES

1. Pure JSON only — no markdown, no text outside JSON
2. Navbar MUST be first component on every page
3. Footer MUST be last component on every page
4. Exactly ONE homepage (isHomePage: true)
5. Generate 3–5 pages (only exceed 5 if user explicitly requests more)
6. Maximum 4–8 components per page
7. ALL content must be specific to the USER REQUEST: "${prompt}"
8. Sequential order numbers only (1, 2, 3...)
9. Valid URL slugs only (lowercase, hyphens, no spaces)
10. ONLY use component types from the allowed list
11. Use "hero" ONLY on homepage
12. Use "page_header" on ALL inner pages
13. All 4 required style fields must be filled
14. No extra fields outside the schema
15. Preserve user intent exactly — build what was asked, nothing else
16. SELF-VALIDATE before returning: is all content about "${prompt}"? Are all types valid? Is navbar first and footer last?

---

REMEMBER: You are building a website for: "${prompt}"
Output ONLY valid JSON. Start your response with { and end with }
`;
  console.log("calling main ai api")
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: aiModel || "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful AI." },
          { role: "user", content: masterPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    let aiRaw = response.data.choices[0].message.content;
    console.log("raw ai response", aiRaw) // Log the raw AI response for debugging  
    if (!aiRaw) {
      throw new ApiError(500, "AI returned empty response");
    }

    aiRaw = aiRaw.replace(/```json/g, "").replace(/```/g, "").trim();
    let parsedJson;
    try {
      parsedJson = JSON.parse(aiRaw);
    } catch (err) {
      throw new ApiError(500, "AI response is not valid JSON");
    }
    const validation = websiteGenerationSchema.safeParse(parsedJson);

    if (!validation.success) {
      console.error("Zod Validation Error:", validation.error);
      throw new ApiError(500, "AI response structure invalid");
    }
    console.log("validates res", validation.data);
    return validation.data;

  } catch (error) {
    console.error("AI Service Error:", error.message);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Failed to generate website"
    );
  }
};