// greenbook-frontend/src/app/(main)/cart/page.tsx

'use client'; // Đây là Client Component vì quản lý state giỏ hàng

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine, RiShoppingCartLine } from 'react-icons/ri';

// Định nghĩa kiểu dữ liệu cho một mục trong giỏ hàng
interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number; // Giá nên là number để dễ tính toán
  imageUrl: string;
  quantity: number;
}

export default function CartPage() {
  // Mock data cho giỏ hàng (sau này sẽ lấy từ Context API hoặc API)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: 189000, imageUrl: '/images/book-1.jpg', quantity: 1 },
    { id: '3', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari', price: 250000, imageUrl: '/images/book-3.jpg', quantity: 2 },
    { id: '6', title: 'Tôi Tự Học', author: 'Nguyễn Duy Cần', price: 85000, imageUrl: '/images/book-6.jpg', quantity: 1 },
  ]);

  // Hàm để cập nhật số lượng sản phẩm
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
        // Lọc bỏ sản phẩm nếu số lượng về 0 (tùy logic, ở đây giữ min là 1)
        // .filter(item => item.quantity > 0)
    );
  };

  // Hàm để xóa sản phẩm khỏi giỏ hàng
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Tính tổng tiền và tổng số lượng sản phẩm (sử dụng useMemo để tối ưu)
  const { totalItems, totalPrice } = useMemo(() => {
    const items = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const price = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalItems: items, totalPrice: price };
  }, [cartItems]);

  // Định dạng tiền tệ
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-theme(spacing.16)-theme(spacing.80))]">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        Giỏ Hàng Của Bạn
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
          <RiShoppingCartLine className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">Giỏ hàng của bạn đang trống.</p>
          <Link href="/books" className="inline-block bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
              Sản phẩm ({totalItems})
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-28 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-md shadow-sm"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link href={`/books/${item.id}`} className="text-lg font-semibold text-gray-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      {item.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.author}</p>
                    <p className="text-md font-bold text-teal-600 dark:text-teal-400 mt-1">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-l-md"
                      aria-label="Giảm số lượng"
                    >
                      <RiSubtractLine />
                    </button>
                    <span className="px-3 text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-r-md"
                      aria-label="Tăng số lượng"
                    >
                      <RiAddLine />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                    aria-label="Xóa sản phẩm"
                  >
                    <RiDeleteBin6Line className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 h-fit sticky top-28"> {/* sticky top for better UX */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
              Tổng quan giỏ hàng
            </h2>
            <div className="flex justify-between items-center text-lg text-gray-700 dark:text-gray-300 mb-4">
              <span>Tổng số lượng sản phẩm:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-bold text-gray-900 dark:text-white mb-6">
              <span>Tổng tiền:</span>
              <span className="text-teal-600 dark:text-teal-400">{formatCurrency(totalPrice)}</span>
            </div>
            <button
              className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
              onClick={() => alert('Tiến hành thanh toán! (Logic sẽ được xây dựng sau)')}
            >
              Tiến hành thanh toán
            </button>
            <Link
              href="/books"
              className="block text-center mt-4 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}