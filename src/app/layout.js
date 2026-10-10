import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "বাজার দর - Bajar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="bg-[#f3f5f3] text-gray-800 antialiased min-h-screen flex flex-col justify-between">
        <Toaster position="top-right" />
        <div>
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
