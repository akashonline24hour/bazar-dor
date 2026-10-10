"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PriceRisersSection from "@/components/PriceRisersSection";
import PriceFallersSection from "@/components/PriceFallersSection";
import AllProductsSection from "@/components/AllProductsSection";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen pb-12">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-44 bg-white rounded-2xl animate-pulse border border-gray-100"
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <PriceRisersSection products={products} />
            <PriceFallersSection products={products} />
            <AllProductsSection products={products} />
          </>
        )}
      </main>
    </div>
  );
}
