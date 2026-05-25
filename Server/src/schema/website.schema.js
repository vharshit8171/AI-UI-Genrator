import { z } from "zod";

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
    styles: z.object({
        bg: z.string().optional(),
        text: z.string().optional(),
    }).default({}),
});

export const websiteGenerationSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().max(300).default(""),
    path: z.string().regex(/^\/([a-z0-9-]+)?$/).default("/"),
    components: z.array(componentSchema).min(1),
});