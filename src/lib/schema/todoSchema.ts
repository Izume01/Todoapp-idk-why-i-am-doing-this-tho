import { z } from "zod";

export const todoSchema = z.object({
    title : z.string().min(3), 
    description : z.string().optional(),
    completed  : z.boolean()
})

export type Todo = z.infer<typeof todoSchema>

export const todoUpdateSchema = todoSchema.partial();
