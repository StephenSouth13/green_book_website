// greenbook-frontend/components/common/Header.tsx

'use client'; // Bắt buộc cho các component dùng state hoặc interactive features trong App Router

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'; // Icons cho Dark Mode
import { RiShoppingCartLine, RiUserLine, RiSearchLine } from 'react-icons/ri'; // Icons cho giỏ hàng, user, search

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // Dữ liệu giả lập cho số lượng sản phẩm trong giỏ

  // Lấy trạng thái Dark Mode từ localStorage khi component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
      // Giả lập số lượng sản phẩm trong giỏ hàng (sẽ kết nối với logic giỏ hàng sau)
      setCartItemCount(3); // Ví dụ: có 3 sản phẩm trong giỏ
    }
  }, []);

  // Xử lý chuyển đổi Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900 dark:text-white">
          <span className="text-teal-600 dark:text-teal-400">Green</span>Book
        </Link>

        {/* Search Bar (Trung tâm) */}
        <div className="flex-grow max-w-xl mx-4 relative">
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg" />
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link href="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200">
            <RiShoppingCartLine className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Icon */}
          <Link href="/login" className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200">
            <RiUserLine className="text-2xl" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <MdOutlineLightMode className="text-2xl" />
            ) : (
              <MdOutlineDarkMode className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;