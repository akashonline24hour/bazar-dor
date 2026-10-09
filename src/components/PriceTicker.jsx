"use client";

import { useEffect, useState } from "react";
import { toBanglaNumber } from "@/utils/convertNumber";

export default function PriceTicker() {
  const [tickerItems, setTickerItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickerData() {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/products",
        );
        if (res.ok) {
          const data = await res.json();
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
    <div className="w-full bg-white border-y border-gray-200 overflow-hidden py-2 shadow-2xs">
      <div className="flex whitespace-nowrap animate-marquee">
        {displayItems.map((item, idx) => {
          const isUp = item.change?.dir === "up";
          const isDown = item.change?.dir === "down";
          const unitText =
            item.unit === "kg" ? "প্রতি কেজি" : item.unit || "প্রতি কেজি";

          return (
            <div
              key={`${item.id}-${idx}`}
              className="inline-flex items-center space-x-2 space-x-reverse mx-4 text-xs font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full border border-gray-100"
            >
              <span>{item.image || item.categoryIcon || "📦"}</span>
              <span className="font-semibold text-gray-900">{item.nameBn}</span>
              <span>
                {toBanglaNumber(item.today)} টাকা/{unitText}
              </span>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
