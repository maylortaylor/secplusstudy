import { z } from 'zod';

export const UserPreferencesSchema = z.object({
  theme: z.enum(['light', 'dark']).default('dark'),
  uiSize: z.enum(['cozy', 'normal', 'large']).default('normal'),
  lastStudiedDomain: z.number().min(1).max(5).nullable().default(null),
});

export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
export type Theme = UserPreferences['theme'];
export type UiSize = UserPreferences['uiSize'];
