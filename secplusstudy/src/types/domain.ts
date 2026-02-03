import { z } from 'zod';

export const DomainSchema = z.object({
  id: z.number().min(1).max(5),
  name: z.string(),
  examPercentage: z.number().min(0).max(100),
  description: z.string(),
  sections: z.array(z.string()),
});

export type Domain = z.infer<typeof DomainSchema>;
