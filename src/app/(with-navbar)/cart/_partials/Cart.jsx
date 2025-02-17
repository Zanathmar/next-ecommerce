"use client";
import { Fragment, useEffect, useState } from "react";
import { Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Config from "@/core/config";
import { useAuth } from "@/core/useAuth";
import { formatCurrency } from "@/core/helpers";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setLoading(true);
        const res = await fetch(Config.baseApiUrl() + "cart", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        // console.log(result.data);
        setCartData(result.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const updateQuantity = async (cartId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(Config.baseApiUrl() + `cart/${cartId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        
        // Optimistically update the UI
        setCartData(prevData => 
          prevData.map(item => 
            item.id === cartId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        
        toast.success("Quantity updated");
      } catch (error) {
        toast.error(error.message);
        // Revert changes on error
        fetchCart();
      }
    }
  };

  const deleteCart = async (cartId) => {
    if (isDeleting) return;
    
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setIsDeleting(true);
        const res = await fetch(Config.baseApiUrl() + `cart`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cartId: cartId }),
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);
        console.log(result);
        // Optimistically remove item from UI
        setCartData(prevData => prevData.filter(item => item.id !== cartId));
        toast.success("Item removed from cart");
      } catch (error) {
        toast.error(error.message);
        fetchCart();
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    // Add your checkout logic here
  };

  const calculateTotal = () => {
    return cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const user = useAuth();
  if (!user) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        {cartData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/products">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6">
                  {cartData.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b last:border-b-0">
                      <div className="w-24 h-24 relative flex-shrink-0">
                        <Image
                          src={Config.baseUrl() + item.img_urls[0]}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <Link href={`/product/${item.slug}`}>
                          <h3 className="font-medium hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-semibold mt-1 text-gray-900">
                          {formatCurrency(item.price)}
                        </p>
                        
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border rounded-lg">
                            <button 
                              className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-50"
                              onClick={() => updateQuantity(item.id, item.quantity, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <button 
                              className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity, 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button 
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            onClick={() => deleteCart(item.cart_id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md sticky top-4">
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;