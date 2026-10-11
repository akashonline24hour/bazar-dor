"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Shield,
  Calendar,
  ArrowLeft,
  Loader2,
  Edit3,
  LogOut,
  Check,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#008a45]" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;

  const handleUpdateName = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
        setIsEditing(false);
        refetch();
      }
    } catch (err) {
      toast.error("কোথাও কোনো ত্রুটি ঘটেছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-[#F0F2F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-[#008a45] transition-colors bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            হোম পেজে ফিরে যান
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            সাইন আউট
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-24 h-24 bg-green-50 text-[#008a45] rounded-3xl flex items-center justify-center font-bold text-2xl overflow-hidden shrink-0 border border-green-100 shadow-xs">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    className="w-full h-full object-cover"
                    width={96}
                    height={96}
                  />
                ) : (
                  <User className="w-10 h-10" />
                )}
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold text-gray-950">
                  {user.name}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  {user.email}
                </p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-50 text-[#008a45] text-[11px] font-bold rounded-full border border-green-100">
                  সক্রিয় সদস্য
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isEditing) {
                  setName(user.name || "");
                }
                setIsEditing(!isEditing);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-bold transition-colors border border-gray-200 shadow-2xs"
            >
              <Edit3 className="w-4 h-4 text-[#008a45]" />
              {isEditing ? "বাতিল করুন" : "নাম পরিবর্তন"}
            </button>
          </div>

          {isEditing && (
            <form
              onSubmit={handleUpdateName}
              className="bg-gray-50/70 p-6 rounded-2xl border border-gray-200 space-y-4 animate-in fade-in duration-200"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-gray-900">
                  আপনার নাম পরিবর্তন করুন
                </h3>
                <p className="text-xs text-gray-500">
                  আপনার নতুন নামটি লিখুন এবং সংরক্ষণ করুন।
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  পূর্ণ নাম
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="আপনার নাম লিখুন"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:border-[#008a45] transition-all"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#008a45] hover:bg-[#007038] text-white rounded-xl text-xs font-bold shadow-xs transition-colors disabled:opacity-70"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <Check className="w-4 h-4" />
                  সংরক্ষণ করুন
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs font-bold transition-colors"
                >
                  বাতিল
                </button>
              </div>
            </form>
          )}

          <div className="border-t border-gray-100 pt-6 space-y-4">
            <h2 className="text-sm font-bold text-gray-900">
              অ্যাকাউন্টের বিস্তারিত তথ্য
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-gray-400">
                    পূর্ণ নাম
                  </p>
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-gray-400">
                    ইমেইল ঠিকানা
                  </p>
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-gray-400">
                    অ্যাকাউন্ট আইডি
                  </p>
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {user.id}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3.5">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[11px] font-medium text-gray-400">
                    যোগদানের তারিখ
                  </p>
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("bn-BD")
                      : "প্রযোজ্য নয়"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
