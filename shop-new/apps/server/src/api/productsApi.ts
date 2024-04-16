import express from "express";
import { z } from "zod";
import { addProduct, getAllProducts } from "../actions/productsActions";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
	const products = await getAllProducts();
	res.send(products);
});

export const AddProductSchema = z.object({
	name: z.string(),
	categoryId: z.number().optional(),
});

productRouter.post("/", async (req, res) => {
	const result = AddProductSchema.safeParse(req.body);
	if (!result.success) {
		return res.status(400).send("Invalid request body");
	}

	const insertedProduct = await addProduct(result.data);
	res.status(200).send(insertedProduct);
});

export default productRouter;
