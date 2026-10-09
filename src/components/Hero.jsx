"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-[#f2f7f4] rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-100/50 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Left Column: Text & CTA */}
        <div className="space-y-4 max-w-2xl text-left">
          {/* Date Badge */}
          <div className="inline-block px-3.5 py-1 rounded-full bg-emerald-100/70 text-[#008a45] text-xs font-medium">
            শনিবার, ১০ অক্টোবর, ২০২৬
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#all-products"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-[#008a45] hover:bg-[#007038] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        {/* Right Column: Hero Basket Image */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 shrink-0">
          <Image
            src="/images/bazar-hero.png"
            alt="Bazar Dor Hero"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
