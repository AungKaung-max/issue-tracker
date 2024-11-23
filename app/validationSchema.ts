import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255),
    description: z.string().min(1, "description is required")
})

export const patchIssueSchema = z.object({
    title: z.string().min(1, "title is required").max(255).optional(),
    description: z.string().min(1, "description is required").max(55555).optional(),
    assignToUserId: z.string().min(1, "assignToUserId is required").max(255).optional().nullable()
})