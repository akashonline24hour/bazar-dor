import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 max-w-md w-full text-center space-y-6 shadow-xs">
        <div className="w-20 h-20 bg-amber-50 border border-amber-100 rounded-3xl flex items-center justify-center mx-auto text-amber-600">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-950">
            পেজটি পাওয়া যায়নি
          </h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            আপনি যে পেজটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল রয়েছে।
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#008a45] hover:bg-[#007038] text-white rounded-2xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Home className="w-4 h-4" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
