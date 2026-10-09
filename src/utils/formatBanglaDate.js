import { toBanglaNumber } from "./convertNumber";

export function getFormattedBanglaDate() {
  const now = new Date();

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

  const dayName = banglaDays[now.getDay()];
  const dateNum = toBanglaNumber(now.getDate());
  const monthName = banglaMonths[now.getMonth()];
  const yearNum = toBanglaNumber(now.getFullYear());

  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}
