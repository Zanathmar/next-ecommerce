import { notFound } from "next/navigation";
import Config from "@/core/config";
import ProductCard from "@/components/ProductCard";

export default async function CategoryProducts({ category }) {
  const response = await fetch(`${Config.baseApiUrl()}products/category/${category}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  if (!response.ok) return notFound();

  const data = await response.json();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {data.data.length > 0 ? (
        data.data.map((product) => (
          <ProductCard
            key={product._id}
            href={`/product/${product._id}`}
            image={`${Config.baseUrl()}${product.image_url}`}
            category={product.category}
            name={product.name}
            rating={product.rating}
            price={product.price}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No products found in this category.</p>
      )}
    </div>
  );
}