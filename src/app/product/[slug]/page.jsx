"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার ফাংশন
const toBengaliNum = (num) => {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(num).replace(/\d/g, (d) => bengaliDigits[d]);
};

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productSlug = resolvedParams.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (res.ok) {
          const allProducts = await res.json();
          const found = allProducts.find(
            (p) =>
              String(p.slug).toLowerCase() ===
                String(productSlug).toLowerCase() ||
              String(p.id) === String(productSlug),
          );
          setProduct(found || null);
        }
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProductDetail();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse space-y-6">
        <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
        <div className="h-40 bg-white rounded-3xl border border-gray-100"></div>
        <div className="h-32 bg-white rounded-3xl border border-gray-100"></div>
        <div className="h-64 bg-white rounded-3xl border border-gray-100"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-2xl shadow-xs">
          ❌
        </div>
        <h1 className="text-2xl font-bold text-gray-950">পণ্যটি পাওয়া যায়নি</h1>
        <p className="text-xs text-gray-500 max-w-sm">
          আপনি যে পণ্যটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা সঠিক ঠিকানায় নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008a45] text-white rounded-2xl text-xs font-semibold hover:bg-[#007038] transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const markets = product.markets || [];
  let minPrice = 0;
  let maxPrice = 0;
  let avgPrice = 0;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const totalAvg = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    avgPrice = Math.round(totalAvg / markets.length);
  } else {
    minPrice = product.today - 3;
    maxPrice = product.today + 3;
    avgPrice = product.today;
  }

  const changeDir = product.change?.dir;
  const changePct = product.change?.pct || 0;

  return (
    <div className="min-h-screen bg-[#F0F2F0] py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#008a45]">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category || "chal"}`}
            className="hover:text-[#008a45]"
          >
            {product.categoryNameBn || "ক্যাটাগরি"}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-semibold">{product.nameBn}</span>
        </div>

        {/* Top Product Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-center text-4xl shrink-0 shadow-xs">
              {product.image || product.categoryIcon || "📦"}
            </div>
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
                {product.nameBn}
              </h1>
              <p className="text-xs text-gray-500">
                প্রতি{" "}
                {product.unit === "kg" || product.unit === "কেজি"
                  ? "কেজি"
                  : product.unit}{" "}
                • {product.categoryNameBn || product.category}
              </p>
              <p className="text-xs font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-full inline-block border border-gray-100">
                গতকালের তুলনায় আজ বাজার দর{" "}
                {changeDir === "down"
                  ? "কমেছে"
                  : changeDir === "up"
                    ? "বেড়েছে"
                    : "পরিবর্তিত হয়নি"}{" "}
                {toBengaliNum(Math.abs(changePct))}%
              </p>
            </div>
          </div>

          {/* Today's Price Badge */}
          <div className="bg-[#F8FAF8] border border-green-100/60 rounded-2xl p-4 text-center min-w-35 shadow-xs">
            <span className="text-[11px] text-gray-500 font-medium block">
              আজকের দর
            </span>
            <span className="text-3xl font-black text-[#008a45]">
              ৳{toBengaliNum(product.today)}
            </span>
            <span className="text-xs text-gray-500 block mt-0.5">
              টাকা /{" "}
              {product.unit === "kg" || product.unit === "কেজি"
                ? "কেজি"
                : product.unit}
            </span>
            <span
              className={`text-[11px] font-bold mt-1 inline-block ${changeDir === "down" ? "text-green-600" : "text-red-600"}`}
            >
              {changeDir === "down" ? "▼" : "▲"} {toBengaliNum(changePct)}%
            </span>
          </div>
        </div>

        {/* Price Summary Section */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-1.5">
              <span className="text-xs text-gray-500 font-medium">
                সর্বনিম্ন দাম
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-[#008a45]">
                  {toBengaliNum(minPrice)} টাকা
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-1.5">
              <span className="text-xs text-gray-500 font-medium">
                সর্বাধিক দাম
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-red-600">
                  {toBengaliNum(maxPrice)} টাকা
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-xs space-y-1.5">
              <span className="text-xs text-gray-500 font-medium">গড় দাম</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-gray-900">
                  {toBengaliNum(avgPrice)} টাকা
                </span>
              </div>
              <p className="text-[11px] text-gray-400">প্রতি হিসাব</p>
            </div>
          </div>
        </div>

        {/* Market-wise Today's Price Table Section */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-[#F8FAF8] border-b border-gray-100 text-gray-600 font-semibold">
                  <tr>
                    <th className="py-3.5 px-6 text-left">বাজার</th>
                    <th className="py-3.5 px-6 text-left">বিভাগ</th>
                    <th className="py-3.5 px-6 text-center">সর্বনিম্ন</th>
                    <th className="py-3.5 px-6 text-center">সর্বাধিক</th>
                    <th className="py-3.5 px-6 text-right">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  {markets.length > 0 ? (
                    markets.map((m, idx) => {
                      // দশমিক সংখ্যা থাকলে দশমিকসহ দেখাবে, আর পূর্ণসংখ্যা হলে কোনো .০০ দেখাবে না
                      const rawAvg = (m.min + m.max) / 2;
                      const marketAvg = toBengaliNum(
                        Number.isInteger(rawAvg) ? rawAvg : rawAvg.toFixed(2),
                      );
                      return (
                        <tr
                          key={idx}
                          className="hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-3.5 px-6 font-semibold text-gray-900 text-left">
                            {m.market}
                          </td>
                          <td className="py-3.5 px-6 text-gray-500 text-left">
                            {m.division}
                          </td>
                          <td className="py-3.5 px-6 text-center">
                            {toBengaliNum(m.min)} টাকা
                          </td>
                          <td className="py-3.5 px-6 text-center">
                            {toBengaliNum(m.max)} টাকা
                          </td>
                          <td className="py-3.5 px-6 font-bold text-gray-900 text-right">
                            {toBengaliNum(marketAvg)} টাকা
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="py-8 text-center text-gray-400"
                      >
                        বাজারের কোনো তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
