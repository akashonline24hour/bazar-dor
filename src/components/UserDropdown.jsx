"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function UserDropdown({ session, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.user;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 p-1.5 sm:px-3 sm:py-2 rounded-2xl border border-gray-200 transition-colors"
      >
        <div className="w-8 h-8 bg-green-100 text-[#008a45] rounded-full flex items-center justify-center font-bold text-xs overflow-hidden shrink-0 border border-green-200">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              className="w-full h-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <User className="w-4 h-4" />
          )}
        </div>
        <span className="text-xs font-bold text-gray-800 hidden sm:inline max-w-30 truncate">
          {user?.name}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-3xl shadow-xl py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-5 py-2.5 border-b border-gray-100 space-y-0.5">
            <p className="text-sm font-bold text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>

          <div className="p-2 space-y-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors"
            >
              <User className="w-4 h-4 text-gray-500" />
              আমার প্রোফাইল
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
