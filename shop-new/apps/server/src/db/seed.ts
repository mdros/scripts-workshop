import type Database from "better-sqlite3";
import { categories } from "./schema/categories";
import { products } from "./schema/products";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function seed(db: BetterSQLite3Database<any>) {
	for (let i = 0; i < 4; i++) {
		const categoriesReturned = await db
			.insert(categories)
			.values({
				name: `Category ${i}`,
			})
			.returning();

		const categoryId = categoriesReturned[0]?.id;

		for (let j = 0; j < 2; j++) {
			await db.insert(products).values({
				name: `${categoryId} - Product ${j}`,
				categoryId: categoryId,
			});
		}
	}
}
