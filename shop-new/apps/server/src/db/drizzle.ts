import Database from "better-sqlite3";
import {
	type BetterSQLite3Database,
	drizzle,
} from "drizzle-orm/better-sqlite3";

import { categories } from "./schema/categories";
import { products } from "./schema/products";
import seed from "./seed";

const sqlite = new Database("src/db/db.sqlite");

const schema = { ...products, ...categories };
export const db = drizzle(sqlite, {
	schema,
});

seed(db);

export default db;
