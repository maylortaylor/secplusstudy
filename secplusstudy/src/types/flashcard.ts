import { z } from 'zod';

export const FlashcardBackSchema = z.object({
  level1: z.string(),
  level2: z.string(),
  level3: z.string(),
});

export const FlashcardMetadataSchema = z.object({
  difficulty: z.enum(['easy', 'medium', 'hard']),
  commonlyTested: z.boolean(),
  relatedTerms: z.array(z.string()).optional(),
});

export const FlashcardSchema = z.object({
  id: z.string(),
  domain: z.number().min(1).max(5),
  section: z.string(),
  type: z.enum(['acronym', 'concept', 'tool', 'process', 'attack', 'standard']),
  front: z.string(),
  back: FlashcardBackSchema,
  metadata: FlashcardMetadataSchema,
});

export type FlashcardBack = z.infer<typeof FlashcardBackSchema>;
export type FlashcardMetadata = z.infer<typeof FlashcardMetadataSchema>;
export type Flashcard = z.infer<typeof FlashcardSchema>;
export type FlashcardType = Flashcard['type'];
export type DisclosureLevel = 1 | 2 | 3;
