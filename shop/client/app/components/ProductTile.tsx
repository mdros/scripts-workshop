import { Link, useRevalidator } from "@remix-run/react";

type ProductTileProps = {
	id: string;
	name: string;
	categoryName?: string;
};

export default function ProductTile({
	id,
	name,
	categoryName,
}: ProductTileProps) {
	const revalidator = useRevalidator();

	const deleteProduct = async () => {
		await fetch(`http://localhost:8080/products/${id}`, { method: "delete" });
		revalidator.revalidate();
	};

	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<span>--------------------</span>
			<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
				<strong>
					<span>Name: {name}</span>
				</strong>
				<span>-</span>
				<Link to={`/products/${id}`}>
					<button type="button">Edit</button>
				</Link>
				<button type="button" onClick={() => deleteProduct()}>Delete</button>
			</div>
			<span>Category: {categoryName ?? "none"}</span>
			<span>--------------------</span>
		</div>
	);
}
