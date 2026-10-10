import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify"; // react-toastify ইমপোর্ট করা হলো
import "react-toastify/dist/ReactToastify.css"; // react-toastify এর CSS ইমপোর্ট করা হলো
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛒</text></svg>",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={notoSerifBengali.className}>
      <body className="bg-[#f3f5f3] text-gray-800 antialiased min-h-screen flex flex-col justify-between">
        {/* react-toastify*/}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div>
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
