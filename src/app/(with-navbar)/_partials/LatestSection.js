import ProductCard from "@/components/ProductCard";
import Config from "@/core/config";

export default async function LatestSection() {
    const data = await fetch (Config.baseApiUrl() + "product?sortBy=created_at&order+desc", {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET",
    }).then((res) => res.json());
    console.log(data);

  return (
    <section className="p-10 bg-dark text-white">
      <h2 className="text-4x1 font-bold text-center uppercase mb-6">
        New Arrival
      </h2>
      <div className="flex gap-6 overflow-x-scroll">
        {data.data.map((product) => (
            <ProductCard
            key={product.name}
                href={`/product/${product.slug}`}
                image={Config.baseUrl() + product.img_urls[0]}
                name={product.name}
                category={product.category_name}
                rating={product.rating}
                price={product.price}
            />
        ))}

      </div>
    </section>
  );
}
