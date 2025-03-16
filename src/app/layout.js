import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-900 text-gray-200 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold">
              Emergency Fund
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 justify-center flex-1">
            <a href="#" className="hover:text-gray-400">
              Deposit
            </a>
            <a href="#" className="hover:text-gray-400">
              Dashboard
            </a>
            <a href="#" className="hover:text-gray-400">
              Company
            </a>
            <a href="#" className="hover:text-gray-400">
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="border border-gray-500 px-4 py-2 rounded-lg hover:bg-gray-700">
              Open your account
            </button>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500">
              Sign in →
            </button>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-gray-400 text-center p-4 mt-auto">
          <p>© 2025 P2P Emergency Fund</p>
        </footer>
      </body>
    </html>
  );
}
