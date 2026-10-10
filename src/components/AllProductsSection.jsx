"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export default function AllProductsSection({ products = [] }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch categories for filter tabs
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (p) =>
            p.category === selectedCategory ||
            p.categorySlug === selectedCategory,
        );

  return (
    <section className="mb-12" id="all-products">
      {/* Section Header & Category Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">সকল পণ্যের তালিকা</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            বাজারের সকল পণ্যের হালনাগাদ দাম
          </p>
        </div>

        {/* Category Pills/Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#008a45] text-white shadow-2xs"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            সব পণ্য ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id || cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.slug
                  ? "bg-[#008a45] text-white shadow-2xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <span>{cat.icon || "📦"}</span>
              <span>{cat.nameBn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid (4 Columns) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-200/60">
          <p className="text-sm text-gray-500 font-medium">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
