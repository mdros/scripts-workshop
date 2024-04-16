import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { categories } from "./categories";

export const products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").unique().notNull(),
	categoryId: integer("category_id").references(() => categories.id),
});

export type SelectProduct = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
