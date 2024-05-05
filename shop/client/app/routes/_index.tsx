import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect, type LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import ProductTile from "~/components/ProductTile";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader = async () => {
	const res = await fetch("http://localhost:8080/products", {
		headers: { connection: "keep-alive" },
	});

	if (!res.ok) {
		throw new Response("Oh no! Something went wrong!", {
			status: 500,
		});
	}

	const data = await res.json();

	const categoryRes = await fetch("http://localhost:8080/categories", {
		headers: { connection: "keep-alive" },
	});

	if (!categoryRes.ok) {
		throw new Response("Oh no! Something went wrong!", {
			status: 500,
		});
	}

	const categoryData = await categoryRes.json();

	const categoryMap = {};
	for (const category of categoryData) {
		categoryMap[category.id] = category.name;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const products: any[] = [];

	for (const product of data) {
		products.push({
			id: product.id,
			name: product.name,
			categoryName: categoryMap[product.categoryId] ?? null,
		});
	}

	const fullData = {
		products,
		categories: categoryData,
	};

	return json(fullData);
};

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData();

	const name = formData.get("name");
	const categoryId = formData.get("categoryId");

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const errors: any = {};

	if (name === "") {
		errors.name = "Name is empty";
	}

	if (Object.keys(errors).length > 0) {
		return json({ errors });
	}

	const product = await fetch("http://localhost:8080/products", {
		method: "POST",
		body: JSON.stringify({
			name: String(name),
			categoryId: categoryId !== "" ? Number(categoryId) : undefined,
		}),
		headers: {
			"Content-Type": "application/json",
			connection: "keep-alive",
		},
	});
	console.log(product);

	return redirect(".");
};

export default function Index() {
	const actionData = useLoaderData<typeof loader>();

	return (
		<>
			<h1>Products:</h1>

			{actionData?.products.map(({ id, name, categoryName }) => (
				<ProductTile key={id} id={id} name={name} categoryName={categoryName} />
			))}

			<div style={{ paddingTop: "24px" }}>
				<span>Add new product:</span>
				<Form method="post">
					<div style={{ display: "flex", flexDirection: "column" }}>
						<label>
							Name: <input name="name" />
						</label>

						<label>
							Category:
							<select name="categoryId">
								<option value={""}>None</option>
								{actionData?.categories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.name}
									</option>
								))}
							</select>
						</label>
					</div>

					<button type="submit">Create</button>
				</Form>
			</div>
		</>
	);
}
