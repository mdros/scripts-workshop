import { z } from "zod";

export const GetProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	categoryId: z.number().optional(),
});

export const AddProductSchema = z.object({
	name: z.string(),
	categoryId: z.number().nullable(),
});

export const GetProductListSchema = z.array(GetProductSchema);

export type GetProduct = z.infer<typeof GetProductSchema>;
