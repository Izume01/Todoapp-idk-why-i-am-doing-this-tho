import { z } from "zod";

export const todoSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"), 
    description: z.string().optional(),
    completed: z.boolean()
})

export type Todo = z.infer<typeof todoSchema>

export const todoUpdateSchema = todoSchema.partial();
