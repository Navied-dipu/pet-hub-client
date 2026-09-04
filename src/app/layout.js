import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navber";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pet Hub | Premium Pet Adoption",
  description: "Find your new best friend with our premium pet adoption platform.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="cupcake"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content selection:bg-primary selection:text-white">
           <Navbar></Navbar>
           <Toaster position="top-center" reverseOrder={false} 
             toastOptions={{
               className: 'shadow-xl rounded-2xl border border-base-200 font-medium',
             }}
           />
          {children}
          <Footer></Footer>
      </body>
    </html>
  );
}
