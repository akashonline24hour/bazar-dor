import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200/80 mt-16 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        {/* Left Side: Logo Icon & Brand Name */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-50 text-[#008a45] rounded-xl flex items-center justify-center text-sm border border-green-100 shadow-xs shrink-0">
            🛒
          </div>
          <span className="font-bold text-gray-800 text-sm">
            বাজার দর{" "}
            <span className="font-normal text-gray-500 text-xs">
              <Link
                href="/"
                className="hover:underline font-bold text-gray-800 hover:text-[#008a45]"
              >
                Bazardor
              </Link>
            </span>
          </span>
        </div>

        {/* Center: Copyright Text */}
        <p className="text-center">
          © {currentYear} বাজার দর{" "}
          <Link
            href="/"
            className="hover:underline font-bold text-gray-800 hover:text-[#008a45]"
          >
            Bazardor{" "}
          </Link>
          প্রজেক্ট। সর্বস্বত্ব সংরক্ষিত।
        </p>

        {/* Right Side: Disclaimer Note */}
        <p className="text-center md:text-right text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
