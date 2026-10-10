"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toBanglaNumber } from "@/utils/convertNumber";

export default function PriceTicker() {
  const [tickerItems, setTickerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickerData() {
      try {
        // সরাসরি প্রোডাক্টস এপিআই এন্ডপয়েন্ট
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/products",
        );
        if (res.ok) {
          const json = await res.json();
          // এপিআই রেসপন্স অ্যারে বা অবজেক্ট যাই হোক না কেন তা নিরাপদে হ্যান্ডেল করা হচ্ছে
          const data = Array.isArray(json)
            ? json
            : json.data || json.products || [];
          setTickerItems(data);
        }
      } catch (err) {
        console.error("Failed to fetch ticker products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTickerData();
  }, []);

  if (loading || !tickerItems.length) return null;

  // Infinite smooth marquee animation
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden py-2.5 shadow-2xs">
      <style jsx>{`
        @keyframes customMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-extra-slow-marquee {
          display: flex;
          width: max-content;
          animation: customMarquee 45s linear infinite; /* অত্যন্ত ধীরগতির ও স্মুথ অ্যানিমেশন (৪৫ সেকেন্ড) */
        }
        .animate-extra-slow-marquee:hover {
          animation-play-state: paused; /* মাউস নিলে অ্যানিমেশন থেমে যাবে */
        }
      `}</style>

      <div className="overflow-hidden whitespace-nowrap">
        <div className="animate-extra-slow-marquee">
          {displayItems.map((item, idx) => {
            const isUp = item.change?.dir === "up";
            const isDown = item.change?.dir === "down";
            const unitText =
              item.unit === "kg" ? "প্রতি কেজি" : item.unit || "প্রতি কেজি";

            // পণ্যের নিজস্ব স্লাগ বা আইডি অনুযায়ী লিংক তৈরি
            const productSlug = item.slug || item.id;
            const productLink = productSlug ? `/product/${productSlug}` : `/`;

            return (
              <Link
                key={`${item.id || idx}-${idx}`}
                href={productLink}
                className="inline-flex items-center space-x-2 space-x-reverse mx-4 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full border border-gray-100 transition-colors cursor-pointer"
              >
                <span>{item.image || item.icon || "📦"}</span>
                <span className="font-semibold text-gray-950">
                  {item.nameBn || item.name}
                </span>
                <span>
                  {toBanglaNumber(item.today || item.price || 0)} টাকা/
                  {unitText}
                </span>
                {item.change && (
                  <span
                    className={`font-semibold ${
                      isUp
                        ? "text-red-600"
                        : isDown
                          ? "text-emerald-600"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                    {toBanglaNumber(Math.abs(item.change?.pct || 0))}%
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
