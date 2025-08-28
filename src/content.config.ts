// src/content.config.ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/** Keep this in sync with your i18n config */
const LOCALES = ["en", "el"] as const;
type Locale = typeof LOCALES[number];

/** A tiny shared piece for all content that needs i18n */
const i18nFields = {
  lang: z.enum(LOCALES).default("en"),
  /**
   * Use the same value across translations of the same entry.
   * Example: "project-olive-villa" in both EN and EL files.
   * Useful for grouping or cross-linking alternates.
   */
  translationKey: z.string().optional(),
};

// ──────────────────────────────────────────────────────────────────────────────
// Portfolios
// ──────────────────────────────────────────────────────────────────────────────
const portfolios = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/data/portfolios",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroImage: image(),
      clients: z.array(z.string()),
      location: z.string(),
      images: z.array(
        z.array(image()).refine((arr) => [1, 2, 3].includes(arr.length), {
          message: "Each sub-array must contain 1, 2, or 3 items",
        }),
      ),
      date: z.coerce.date(),
      order: z.number(),
      draft: z.boolean().optional(),
      // i18n
      ...i18nFields,
    }),
});

// ──────────────────────────────────────────────────────────────────────────────
const testimonials = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/data/testimonials",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      testimonial: z.string(),
      image: image(),
      order: z.number(),
      draft: z.boolean().optional(),
      // i18n
      ...i18nFields,
    }),
});

// ──────────────────────────────────────────────────────────────────────────────
const otherPages = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/data/otherPages",
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      draft: z.boolean().optional(),
      // i18n
      ...i18nFields,
    }),
});

export const collections = {
  portfolios,
  testimonials,
  otherPages,
};
