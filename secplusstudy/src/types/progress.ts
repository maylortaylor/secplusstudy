import { z } from 'zod';

export const UserProgressSchema = z.object({
  cardId: z.string(),
  timesCorrect: z.number().min(0).default(0),
  timesMissed: z.number().min(0).default(0),
  lastSeen: z.string().datetime().nullable().default(null),
  mastered: z.boolean().default(false),
  needsReview: z.boolean().default(false),
});

export const AllProgressSchema = z.record(z.string(), UserProgressSchema);

export type UserProgress = z.infer<typeof UserProgressSchema>;
export type AllProgress = z.infer<typeof AllProgressSchema>;
