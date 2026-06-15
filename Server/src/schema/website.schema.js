import { z } from "zod";

const componentStylesSchema = z.object({
  bg: z.string().optional(),
  text: z.string().optional(),
  accent: z.string().optional(),
  layout: z.enum(["centered", "left", "split"]).optional(),
  density: z.enum(["compact", "normal", "spacious"]).optional(),
  pattern: z.enum(["none", "grid", "dots", "lines"]).optional(),
  glass: z.boolean().optional(),
  gradient: z.boolean().optional(),
}).default({});

const themeSchema = z.object({
    accent: z.string().default("#f97316"),
    bg: z.string().default("#0f172a"),
    surface: z.string().default("rgba(255,255,255,0.04)"),
    text: z.string().default("#ffffff"),
    mutedText: z.string().default("rgba(255,255,255,0.6)"),
    radius: z.enum(["sharp", "rounded", "pill"]).default("rounded"),
    fontStyle: z.enum(["modern", "elegant", "playful", "technical"]).default("modern"),
    mood: z.enum(["dark", "light", "glass"]).default("dark"),
});

const componentSchema = z.object({
    type: z.enum([
        "navbar",
        "hero",
        "features",
        "about",
        "services",
        "pricing",
        "testimonials",
        "stats",
        "cta",
        "faq",
        "contact",
        "gallery",
        "footer",
        "richtext",
    ]),
    order: z.number().min(1),
    props: z.object({}).passthrough().default({}),
    styles: componentStylesSchema,
});

export const websiteGenerationSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(300).default(""),
    path: z.string().regex(/^\/([a-z0-9-]+)?$/).default("/"),
    theme: themeSchema.default({}),
    components: z.array(componentSchema).min(1),
});