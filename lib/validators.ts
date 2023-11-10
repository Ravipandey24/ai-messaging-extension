import { z } from 'zod'

export const messageValidator = z.object({
    prompt: z.string()
})