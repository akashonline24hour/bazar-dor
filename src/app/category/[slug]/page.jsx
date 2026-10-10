"use client";

import { useEffect, useState, use } from "react";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowLeft, ArrowUpDown } from "lucide-react";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const categorySlug = resolvedParams.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState({
    nameBn: categorySlug,
    icon: "📦",
  });
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("https://api.api-store.workers.dev/api/bazardor/products"),
          fetch("https://api.api-store.workers.dev/api/bazardor/categories"),
        ]);

        if (prodRes.ok) {
          const allProducts = await prodRes.json();
          const matchedProducts = allProducts.filter(
            (p) =>
              String(p.category).toLowerCase() ===
                String(categorySlug).toLowerCase() ||
              String(p.categorySlug).toLowerCase() ===
                String(categorySlug).toLowerCase(),
          );

          setProducts(matchedProducts);

          if (matchedProducts.length > 0) {
            setCategoryInfo({
              nameBn: matchedProducts[0].categoryNameBn || categorySlug,
              icon: matchedProducts[0].categoryIcon || "📦",
            });
          }
        }

        if (catRes.ok) {
          const categories = await catRes.json();
          const currentCat = categories.find(
            (c) =>
              String(c.slug).toLowerCase() ===
              String(categorySlug).toLowerCase(),
          );
          if (currentCat) {
            setCategoryInfo({
              nameBn: currentCat.nameBn || currentCat.name || categorySlug,
              icon: currentCat.icon || "📦",
            });
          }
        }
      } catch (err) {
        console.error("Failed to fetch category data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categorySlug]);

  // Derived sorted products based on price only
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.today - b.today;
    if (sortBy === "price-high") return b.today - a.today;
    return 0;
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-40 bg-gray-200 rounded-xl"></div>
          <div className="h-24 bg-white rounded-3xl border border-gray-100"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F0] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#008a45] transition-colors bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>

        {/* Attractive Category Header & Sort Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Category Title with Icon */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-green-50/70 border border-green-100 flex items-center justify-center text-3xl sm:text-4xl shrink-0 shadow-xs">
              {categoryInfo.icon}
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                {categoryInfo.nameBn}
              </h1>
              <p className="text-xs text-gray-500">
                এই ক্যাটাগরিতে মোট{" "}
                <span className="font-semibold text-gray-800">
                  {products.length}
                </span>{" "}
                টি পণ্য রয়েছে
              </p>
            </div>
          </div>

          {/* Sort Dropdown Component */}
          <div className="w-full md:w-auto flex items-center gap-3 bg-[#F8FAF8] border border-gray-100 px-4 py-2.5 rounded-2xl">
            <ArrowUpDown className="w-4 h-4 text-gray-500 shrink-0" />
            <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
              সর্ট করুন:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-semibold text-gray-900 focus:outline-none cursor-pointer w-full md:w-auto"
            >
              <option value="default">ডিফল্ট</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-xs">
            <p className="text-gray-500 text-sm font-medium">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
