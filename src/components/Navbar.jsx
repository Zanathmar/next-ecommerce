"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaChevronDown,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Config from "@/core/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef(null);

  // Handle clicks outside of category dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch (Config.baseApiUrl() + "category", {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  

  return (
    <header className="w-full bg-light shadow sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-2 md:py-3">
        {/* Left Side (Logo & Mobile Menu) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="Logo" width={100} height={100} className="w-8" />
            <span className="font-poppins text-xl font-bold text-primary">{Config.appName()}</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-xl absolute right-4">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Center (Search Bar) */}
        <div className="hidden md:flex flex-grow max-w-lg">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 outline-none bg-light"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="px-4 py-2 bg-primary rounded-r-lg mr-1 text-light hover:bg-black transition-colors">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Right Side (Icons) */}
        <div className="hidden md:flex items-center gap-6 text-text">
          <Link href="/cart" className="relative hover:text-primary transition">
            <FaShoppingCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Link>

          <Link href="/notifications" className="relative hover:text-primary transition">
            <FaBell className="text-2xl" />
          </Link>

          <button onClick={() => setOpen(!open)} className="hover:text-primary transition">
            <FaUser className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 py-2">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full">
          <input
            type="text"
            placeholder="Search products"
            className="w-full px-4 py-2 outline-none bg-light rounded-l-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-4 py-2 bg-primary mr-1 text-light hover:bg-black transition-colors rounded-r-lg">
            <FaSearch />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <div
        className={`md:hidden flex flex-col bg-light shadow-lg absolute top-full left-0 w-full transition-all duration-300 ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <Link href="/cart" className="flex items-center gap-2 px-4 py-3 border-b hover:bg-gray-100">
          <FaShoppingCart className="text-xl" />
          Cart
        </Link>

        <Link href="/notifications" className="flex items-center gap-2 px-4 py-3 border-b hover:bg-gray-100">
          <FaBell className="text-xl" />
          Notifications
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-3 border-b hover:bg-gray-100 w-full text-left"
        >
          <FaUser className="text-xl" />
          Account
        </button>
      </div>

      {/* Category Dropdown (Desktop) */}
      <div className="hidden md:flex items-center px-4 py-2 text-sm text-text border-t border-input">
        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 hover:text-primary transition"
          >
            <span>Category</span>
            <FaChevronDown className={`text-sm transition-transform duration-200 ${categoryOpen ? "rotate-180" : ""}`} />
          </button>

          {categoryOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 z-40">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/category/${category.name}`}
                  className="block px-4 py-2 hover:bg-gray-100 text-text transition"
                  onClick={() => setCategoryOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-6">
          <FaMapMarkerAlt />
          <span>Deliver to</span>
          <span className="font-semibold">Jakarta</span>
        </div>
      </div>

      {/* User Dropdown Menu */}
      <div
        className={`absolute flex flex-col bg-light shadow-lg top-16 right-4 py-2 min-w-48 rounded-lg transition-all duration-200 ease-in-out origin-top-right z-40 ${
          open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <Link href="/login" className="px-4 py-2 hover:bg-gray-100 text-text">
          Login
        </Link>
        <Link href="/register" className="px-4 py-2 hover:bg-gray-100 text-text">
          Register
        </Link>
        <div className="border-t border-gray-200 my-1"></div>
        <Link href="/profile" className="px-4 py-2 hover:bg-gray-100 text-text">
          Profile
        </Link>
        <Link href="/order" className="px-4 py-2 hover:bg-gray-100 text-text">
          My Orders
        </Link>
        <button className="px-4 py-2 text-left hover:bg-gray-100 text-red-500">
          Logout
        </button>
      </div>
    </header>
  );
}