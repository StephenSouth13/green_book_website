// greenbook-frontend/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Hoặc font bạn chọn
import './globals.css'; // Global CSS của bạn
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const inter = Inter({ subsets: ['latin'] }); // Khởi tạo font Inter

export const metadata: Metadata = {
  title: 'GreenBook - Sách Hay Cho Mọi Nhà',
  description: 'Nền tảng bán sách trực tuyến hiện đại, nơi tri thức khai mở.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 antialiased transition-colors duration-300`}>
        <Header />
        <main className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.80))]"> {/* Giúp footer luôn ở dưới cùng */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}