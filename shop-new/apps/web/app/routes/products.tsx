import { type ActionFunction, json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";


import { type MouseEvent, useState } from "react";
import { z } from "zod";
import { GetProductListSchema } from "~/schema/products.schema";

export const loader = async () => {
	const res = await fetch("http://localhost:3000/products");
	const result = GetProductListSchema.safeParse(await res.json());

	if (!result.success) {
		throw new Error("Invalid response schema");
	}

	return json(result.data);
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const data = {
		name: formData.get("name"),
		categoryId: formData.get("categoryId")
			? Number(formData.get("categoryId"))
			: null,
	};
	console.log(data);
	const result = AddProductSchema.safeParse(data);

	if (!result.success) {
		throw new Error("Invalid form body");
	}

	const res = await fetch("http://localhost:3000/products", {
		method: "POST",
		body: JSON.stringify(data),
	});
};

export default function ProductsPage() {
	const fetcher = useFetcher();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const products = useLoaderData<typeof loader>();

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open: boolean) => setIsDialogOpen(open)}
		>
			{products.map(({ id, name, categoryId }) => (
				<li key={id}>
					{name} - {categoryId}
				</li>
			))}
			<DialogTrigger asChild>
				<Button>Add product</Button>
			</DialogTrigger>
			<DialogContent>
				<Form method="post">
					<DialogHeader>Add product</DialogHeader>
					<DialogDescription>
						<Input type="text" placeholder="Name" name="name" />
						<Input type="text" placeholder="Category id" name="categoryId" />
					</DialogDescription>
					<DialogFooter>
						<Button
							onClick={(e: MouseEvent<HTMLButtonElement>) =>
								fetcher.submit(e.currentTarget)
							}
						>
							Save
						</Button>
					</DialogFooter>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
