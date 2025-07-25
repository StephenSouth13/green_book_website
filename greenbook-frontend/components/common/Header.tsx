// greenbook-frontend/components/common/Header.tsx
'use client'; // <<--- PHẢI CÓ DÒNG NÀY

import Link from 'next/link';
import Image from 'next/image';
import { RiShoppingCartLine, RiUserLine, RiSearchLine } from 'react-icons/ri';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md'; // Import icons cho dark mode

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  // ... (các hàm xử lý tìm kiếm, giỏ hàng giả định)
  const cartItemCount = 0; // Ví dụ, sau này lấy từ context/API

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md py-4 transition-colors duration-300">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <Image src="/logo.svg" alt="GreenBook Logo" width={32} height={32} /> */}{/* Nếu có logo hình ảnh */}
          <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">Green</span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Book</span>
        </Link>

        {/* Search Bar (center) */}
        <div className="flex-grow max-w-md mx-4 relative hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm sách, tác giả..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg" />
        </div>

        {/* Right Icons */}
        <nav className="flex items-center space-x-6">
          <Link href="/cart" className="relative text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200" aria-label="Giỏ hàng">
            <RiShoppingCartLine className="text-2xl" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/login" className="text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200" aria-label="Tài khoản">
            <RiUserLine className="text-2xl" />
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Chuyển đổi chế độ sáng/tối"
          >
            {isDarkMode ? (
              <MdOutlineLightMode className="text-2xl" />
            ) : (
              <MdOutlineDarkMode className="text-2xl" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;