import { z } from 'zod'
export const createNoteSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must have at least 3 characters')
    .max(128, 'Title must have less than 128 characters')
    .optional(),
  content: z.any().optional(),
})
