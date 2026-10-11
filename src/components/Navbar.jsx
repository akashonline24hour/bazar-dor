"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PriceTicker from "./PriceTicker";
import { getFormattedBanglaDate } from "@/utils/formatBanglaDate";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-toastify";
import UserDropdown from "./UserDropdown"; // আলাদা কম্পোনেন্ট ইমপোর্ট

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [currentDate] = useState(() => getFormattedBanglaDate());

  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সফলভাবে লগআউট হয়েছে!");
          router.push("/signin");
          router.refresh();
        },
        onError: () => {
          toast.error("লগআউট করতে সমস্যা হয়েছে!");
        },
      },
    });
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(
          "https://openapi.programming-hero.com/api/bazardor/categories",
        );
        if (res.ok) {
          const data = await res.json();
          setCategories(Array.isArray(data) ? data : data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    fetchCategories();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-green-50 text-[#008a45] rounded-2xl flex items-center justify-center text-lg border border-green-100 shadow-xs shrink-0">
            🛒
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-900 tracking-tight">
              বাজার দর
            </span>
            <span
              className="text-xs text-gray-500 font-medium h-4"
              suppressHydrationWarning
            >
              {currentDate}
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-100 animate-pulse rounded-xl"></div>
          ) : session?.user ? (
            // ড্রপডাউন কম্পোনেন্ট কল করা হলো
            <UserDropdown session={session} onLogout={handleLogout} />
          ) : (
            <>
              <Link
                href="/signin"
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                  pathname === "/signin"
                    ? "bg-[#008a45] text-white shadow-2xs"
                    : "text-gray-700 hover:text-[#008a45] hover:bg-gray-50 border border-gray-200"
                }`}
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                  pathname === "/signup"
                    ? "bg-[#008a45] text-white shadow-2xs"
                    : "text-gray-700 hover:text-[#008a45] hover:bg-gray-50 border border-gray-200"
                }`}
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;

            return (
              <Link
                key={cat.id || cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-[#008a45] text-white shadow-2xs"
                    : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-200"
                }`}
              >
                <span>{cat.icon || "📦"}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <PriceTicker />
    </header>
  );
}
