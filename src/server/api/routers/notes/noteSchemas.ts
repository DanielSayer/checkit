import { z } from 'zod'
export const noteSchema = z.object({
  id: z.string(),
  title: z.string().min(3).max(128).optional(),
  content: z.any().optional(),
})
