import { z } from "zod";

const componentSchema = z.object({
    type: z.string().min(1),
    name: z.string().optional(),
    order: z.number().optional(),
    props: z.object({}).catchall(z.any()).default({}),
    styles: z.object({}).catchall(z.any()).default({}),
});

const pageSchema = z.object({
    name: z.string().min(1),
    path: z.string().min(1),
    order: z.number(),
    isHomePage: z.boolean(),
    components: z.array(componentSchema).min(1),
});

const websiteSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    slug: z.string().min(1),
});

export const websiteGenerationSchema = z.object({
    website: websiteSchema,
    pages: z.array(pageSchema).min(1),
});