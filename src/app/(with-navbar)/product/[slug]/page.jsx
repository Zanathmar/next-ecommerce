import ProductDetail from './components/ProductDetail.jsx';

async function getData(productId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // Include API key if required
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch product data: ${res.statusText}`);
    }

    const { data: product } = await res.json(); // Assuming API response has a 'data' field
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function Page({ params }) {
  const product = await getData(params.id);

  if (!product) {
    return <div className="text-red-500 text-center mt-10">Error loading product details.</div>;
  }

  return <ProductDetail product={product} />;
}