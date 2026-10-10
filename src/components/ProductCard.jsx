"use client";

import Link from "next/link";
import { toBanglaNumber } from "@/utils/convertNumber";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const unitText =
    product.unit === "kg" ? "প্রতি কেজি" : product.unit || "প্রতি কেজি";

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-2xl p-4 border border-gray-200/80 shadow-2xs hover:shadow-md hover:border-[#008a45]/40 transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Meta: Category & Change Badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
            <span>{product.categoryIcon || "📦"}</span>
            <span>{product.categoryNameBn || product.category}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
              isUp
                ? "bg-red-50 text-red-600 border border-red-200/60"
                : isDown
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200/60"
                  : "bg-gray-100 text-gray-600 border border-gray-200/60"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{toBanglaNumber(Math.abs(product.change?.pct || 0))}%</span>
          </span>
        </div>

        {/* Product Title & Emoji */}
        <div className="flex items-start gap-3 my-2">
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100 group-hover:scale-105 transition-transform">
            {product.image || product.categoryIcon || "📦"}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base group-hover:text-[#008a45] transition-colors leading-snug">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{unitText}</p>
          </div>
        </div>
      </div>

      {/* Pricing Information */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="text-xs text-gray-400 font-medium block">
            আজকের দাম
          </span>
          <div className="text-xl font-extrabold text-gray-900 leading-tight">
            ৳ {toBanglaNumber(product.today)}
          </div>
        </div>

        {product.markets?.length > 0 && (
          <span className="text-[11px] font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
            {toBanglaNumber(product.markets.length)}টি বাজারে
          </span>
        )}
      </div>
    </Link>
  );
}
