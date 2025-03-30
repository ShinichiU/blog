import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "卜部の開発ブログ",
  description: "Web開発、プログラミング、技術的な知見を共有するブログ",
  keywords: "Web開発, プログラミング, 技術ブログ, エンジニア",
  authors: [{ name: "卜部" }],
  openGraph: {
    title: "卜部の開発ブログ",
    description: "Web開発、プログラミング、技術的な知見を共有するブログ",
    type: "website",
    locale: "ja_JP",
    siteName: "卜部の開発ブログ",
  },
  twitter: {
    card: "summary_large_image",
    title: "卜部の開発ブログ",
    description: "Web開発、プログラミング、技術的な知見を共有するブログ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${inter.className} min-h-full bg-white dark:bg-gray-900`}>
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
                <div className="relative w-12 h-12 bg-white dark:bg-gray-100 rounded-full p-2">
                  <Image
                    src="/logo.svg"
                    alt="卜部の開発ブログ"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold text-white">卜部の開発ブログ</span>
              </Link>
            </div>
          </div>
        </header>
        <div className="min-h-[calc(100vh-12rem)]">
          {children}
        </div>
        <footer className="bg-gray-50 dark:bg-gray-800 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <p className="text-center text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} 卜部の開発ブログ
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
