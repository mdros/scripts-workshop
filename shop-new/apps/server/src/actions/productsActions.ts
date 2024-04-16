import { eq } from "drizzle-orm";

import db from "../db/drizzle.js";
import { products } from "src/db/schema/products.js";

export const getAllProducts = async () => {
	return await db.select().from(products);
};

export const getProductsForCategory = async (categoryId: number) => {
	return await db
		.select()
		.from(products)
		.where(eq(products.categoryId, categoryId));
};

export const addProduct = async ({ name, categoryId }: InsertProduct) => {
	const [model] = await db
		.insert(products)
		.values({
			name,
			categoryId,
		})
		.returning();
	return model;
};
