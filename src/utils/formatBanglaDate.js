import { toBanglaNumber } from "./convertNumber";

export function getFormattedBanglaDate(date = null) {
  // সার্ভার ও ক্লায়েন্টের মিসম্যাচ এড়াতে ডেট হ্যান্ডলিং নিরাপদ করা হলো
  const now = date ? new Date(date) : new Date();

  // যদি ইনভ্যালিড ডেট হয় তবে বর্তমান সময় ধরে নেওয়া
  const validDate = isNaN(now.getTime()) ? new Date() : now;

  const banglaDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const banglaMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const dayName = banglaDays[validDate.getDay()];
  const dateNum = toBanglaNumber(validDate.getDate());
  const monthName = banglaMonths[validDate.getMonth()];
  const yearNum = toBanglaNumber(validDate.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}
