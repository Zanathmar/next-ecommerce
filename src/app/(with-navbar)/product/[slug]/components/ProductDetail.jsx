// components/ProductDetail.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Star, Heart, Share2, ShoppingCart, Minus, Plus } from "lucide-react";

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}products/`; // Ganti ID produk sesuai kebutuhan


const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Debugging: Cek format data
        console.log("Fetched Product:", data);

        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product data.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-10 text-red-500">{error || "Product not found."}</div>;
  }
  
  

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <img
              src={product.img_urls[selectedImage] || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.img_urls?.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-md overflow-hidden border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img src={img} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-text">{product.name}</h1>
            <p className="text-sm text-gray-500">Category: {product.category_name}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-current" />
                <span className="text-sm">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{product.stock} in stock</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-text">
                Rp {product.price.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Quantity</span>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 border rounded-md hover:bg-gray-100"
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button className="p-2 border rounded-md hover:bg-gray-100" onClick={() => handleQuantityChange("increment")}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Wishlist
              </button>
              <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {["description", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-white rounded-lg shadow p-6">
          {activeTab === "description" ? (
            <p className="text-gray-700">{product.description}</p>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;