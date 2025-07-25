// greenbook-frontend/app/layout.tsx
'use client'; // <<--- Vẫn phải có dòng này

import { useState, useEffect } from 'react';
import './globals.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ThemeInitializer from '../../components/common/ThemeInitializer'; // Import lại ThemeInitializer

// Import font Inter
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. Theme ban đầu cho SSR, giả định là 'light' để tránh hydration error
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // 2. Hàm cập nhật theme, được gọi bởi ThemeInitializer
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    // localStorage.setItem('theme', newTheme); // ThemeInitializer đã xử lý lưu localStorage
  };

  // KHÔNG cần useEffect để đọc localStorage ở đây nữa, ThemeInitializer sẽ làm.
  // Tuy nhiên, để đảm bảo Header nhận đúng trạng thái ban đầu sau khi mounted,
  // chúng ta sẽ rely vào ThemeInitializer để gọi handleThemeChange.

  return (
    // suppressHydrationWarning là cần thiết khi DOM client thay đổi sau khi render từ server,
    // đặc biệt cho việc áp dụng class 'dark' dựa trên localStorage.
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.className} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}>
        {/* ThemeInitializer sẽ chạy trên client để đồng bộ theme từ localStorage */}
        {/* Nó sẽ gọi handleThemeChange để cập nhật state 'theme' và class 'dark' trên <html> */}
        <ThemeInitializer initialTheme={theme} onThemeChange={handleThemeChange} />

        {/* Header nhận state theme hiện tại */}
        <Header isDarkMode={theme === 'dark'} onToggleDarkMode={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')} />
        <main className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.80))]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}