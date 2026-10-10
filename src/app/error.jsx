"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-xs">
        <div className="w-20 h-20 bg-red-50 border border-red-100 rounded-3xl flex items-center justify-center mx-auto text-red-600">
          <RefreshCw className="w-8 h-8 animate-spin-slow" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-950">
            কিছু একটা সমস্যা হয়েছে!
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            ডেটা লোড করতে সমস্যা হচ্ছে অথবা সার্ভারে কোনো ত্রুটি দেখা দিয়েছে।
            দয়া করে আবার চেষ্টা করুন।
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl text-xs font-semibold transition-colors"
          >
            পুনরায় চেষ্টা করুন
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 bg-[#008a45] hover:bg-[#007038] text-white rounded-2xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            হোম পেজ
          </Link>
        </div>
      </div>
    </div>
  );
}
