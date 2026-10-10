"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

export default function PriceRisersSection({ products = [] }) {
  const [sortBy, setSortBy] = useState("default");

  // Filter only products whose price increased
  const risers = products.filter((p) => p.change?.dir === "up");

  // Sort logic based on selected option
  const sortedRisers = [...risers].sort((a, b) => {
    if (sortBy === "pct-desc") {
      return (b.change?.pct || 0) - (a.change?.pct || 0);
    } else if (sortBy === "price-desc") {
      return (b.today || 0) - (a.today || 0);
    } else if (sortBy === "price-asc") {
      return (a.today || 0) - (b.today || 0);
    }
    return 0; // default order
  });

  // Limit to maximum 6 products (3x2 grid layout)
  const limitedRisers = sortedRisers.slice(0, 6);

  if (!risers.length) return null;

  return (
    <section className="mb-10">
      {/* Section Header with Title & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
          <h2 className="text-xl font-bold text-gray-900">আজ দাম বেড়েছে</h2>
          <span className="text-xs text-gray-500 font-medium bg-red-50 text-red-600 px-2 py-0.5 rounded-full border border-red-100">
            {risers.length}টি পণ্য
          </span>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs text-gray-500 font-medium">সাজান:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 font-medium focus:outline-none focus:border-[#008a45] transition-colors shadow-2xs"
          >
            <option value="default">ডিফল্ট</option>
            <option value="pct-desc">
              সর্বোচ্চ শতকরা বৃদ্ধি (High to Low)
            </option>
            <option value="price-desc">
              সর্বোচ্চ দাম (Price: High to Low)
            </option>
            <option value="price-asc">
              সর্বনিম্ন দাম (Price: Low to High)
            </option>
          </select>
        </div>
      </div>

      {/* Grid List (Max 6 Items - 3x2 Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {limitedRisers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
