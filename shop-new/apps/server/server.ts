import express from "express";

import "./src/db/drizzle";

import productRouter from "./src/api/productsApi";

const app = express();
const port = 3000;

app.use("/products", productRouter);

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
