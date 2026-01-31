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
  schema: ({ image }) => {
    const imageGroupArray = z.array(image()).refine((arr) => [1, 2, 3].includes(arr.length), {
      message: "Each sub-array must contain 1, 2, or 3 items",
    });

    const imageGroup = z.union([
      imageGroupArray,
      z.object({ images: imageGroupArray }),
    ]);

    const titleField = z.union([
      z.string(),
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    ]);

    return z.object({
      title: titleField.transform((value) => (typeof value === "string" ? value : value.name)),
      description: z.string(),
      heroImage: image(),
      clients: z.array(z.string()),
      location: z.string(),
      images: z
        .array(imageGroup)
        .transform((groups) => groups.map((group) => (Array.isArray(group) ? group : group.images))),
      date: z.coerce.date(),
      order: z.number(),
      draft: z.boolean().optional(),
      // i18n
      ...i18nFields,
    });
  },
});

// ──────────────────────────────────────────────────────────────────────────────
const testimonials = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/data/testimonials",
  }),
  schema: ({ image }) =>
    z.object({
      // i18n-friendly fields; either base or suffixed keys may be used
      title: z.string().optional(),
      testimonial: z.string().optional(),
      title_en: z.string().optional(),
      title_el: z.string().optional(),
      testimonial_en: z.string().optional(),
      testimonial_el: z.string().optional(),
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
