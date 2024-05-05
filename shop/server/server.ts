import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors"

const app = express();
const jsonParser = bodyParser.json();
const port = 8080;

const prisma = new PrismaClient();

app.use(cors())

app.get("/products", async (req, res) => {
	const posts = await prisma.product.findMany();
	res.json(posts);
});

app.post("/products", jsonParser, async (req, res) => {
	const { name, categoryId } = req.body;
	const data = {
		name,
		category: categoryId ? { connect: { id: categoryId } } : undefined,
	};
	const product = await prisma.product.create({
		data,
	});
	res.json(product);
});

app.delete("/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await prisma.product.delete({
		where: {
			id: +id,
		},
	});
	res.json(product);
});

app.get("/categories", async (req, res) => {
	const posts = await prisma.category.findMany();
	res.json(posts);
});

app.post("/categories", jsonParser, async (req, res) => {
	const { name } = req.body;
	const product = await prisma.category.create({
		data: {
			name,
		},
	});
	res.json(product);
});

app.delete("/categories/:id", async (req, res) => {
	const { id } = req.params;
	const product = await prisma.category.delete({
		where: {
			id: +id,
		},
	});
	res.json(product);
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
