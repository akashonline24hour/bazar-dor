"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import { signUp } from "@/lib/auth-client"; // Better Auth ক্লায়েন্ট ইমপোর্ট

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onSuccess: () => {
            toast.success("সাইন আপ সফল হয়েছে!");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || "সাইন আপ করতে সমস্যা হয়েছে!");
          },
        },
      );
    } catch (err) {
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = (provider) => {
    toast.info(`${provider} দিয়ে সাইন আপ শীঘ্রই আসছে...`);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F0] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#008a45] transition-colors bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-green-50 text-[#008a45] rounded-3xl flex items-center justify-center mx-auto text-2xl font-black border border-green-100 shadow-xs">
              📝
            </div>
            <h1 className="text-2xl font-extrabold text-gray-950">
              অ্যাকাউন্ট তৈরি করুন
            </h1>
            <p className="text-xs text-gray-500">
              বাজার দর ট্র্যাক করতে সাইন আপ করুন
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignUp("Google")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.19v3.15C3.21 21.34 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.24c-.25-.72-.38-1.5-.38-2.24s.13-1.52.38-2.24V6.61H1.19C.43 8.13 0 9.83 0 12s.43 3.87 1.19 5.39l4.08-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.21 2.66 1.19 6.61l4.08 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignUp("GitHub")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-2xl text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="flex items-center my-4">
            <div className="grow border-t border-gray-100"></div>
            <span className="px-3 text-[11px] text-gray-400 uppercase font-medium">
              অথবা
            </span>
            <div className="grow border-t border-gray-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                আপনার নাম
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-[#008a45] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                ইমেইল ঠিকানা
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-[#008a45] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl text-xs text-gray-900 focus:outline-none focus:border-[#008a45] focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#008a45] hover:bg-[#007038] text-white rounded-2xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              সাইন আপ করুন
            </button>
          </form>

          <div className="text-center pt-2 border-t border-gray-100 text-xs text-gray-500">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="text-[#008a45] font-bold hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
