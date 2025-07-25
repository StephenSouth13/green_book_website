// greenbook-frontend/app/(main)/page.tsx

// Đây là một Server Component. Nó không cần 'use client'.
// Các Client Component con sẽ được import và sử dụng bên trong.

import Link from 'next/link';
import { RiArrowRightLine } from 'react-icons/ri'; // Icon cho nút CTA

// Import Client Component BookCard
import BookCard from '../../../components/books/BookCard'; // Đảm bảo đường dẫn này đúng. Nếu bạn dùng alias, là '@/components/books/BookCard'

// Mock data cho sách (sẽ thay thế bằng dữ liệu thật từ API sau)
const mockBooks = [
  { id: '1', title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '189.000', imageUrl: '/images/book-1.jpg' },
  { id: '2', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '120.000', imageUrl: '/images/book-2.jpg' },
  { id: '3', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari', price: '250.000', imageUrl: '/images/book-3.jpg' },
  { id: '4', title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '95.000', imageUrl: '/images/book-4.jpg' },
  { id: '5', title: 'Hành Trình Về Phương Đông', author: 'Baird T. Spalding', price: '110.000', imageUrl: '/images/book-5.jpg' },
  { id: '6', title: 'Tôi Tự Học', author: 'Nguyễn Duy Cần', price: '85.000', imageUrl: '/images/book-6.jpg' },
  { id: '7', title: 'Quẳng Gánh Lo Đi Và Vui Sống', author: 'Dale Carnegie', price: '135.000', imageUrl: '/images/book-7.jpg' },
  { id: '8', title: 'Atomic Habits', author: 'James Clear', price: '175.000', imageUrl: '/images/book-8.jpg' },
];


export default function HomePage() {
  return (
    <>
      {/* --- Hero Section --- */}
      <section className="relative bg-teal-600 dark:bg-teal-800 text-white py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between z-10 relative">
          {/* Content Left */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
              Khám Phá Tri Thức <br className="hidden md:inline" />Cùng <span className="text-mustard-yellow dark:text-yellow-300">GreenBook</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in-up delay-200">
              Nơi mọi cuốn sách hay tìm đến độc giả, mở rộng tầm nhìn của bạn.
            </p>
            <Link
              href="/books" // Link đến trang danh sách sách (sẽ tạo sau)
              className="inline-flex items-center bg-mustard-yellow dark:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400"
            >
              Duyệt Sách Ngay <RiArrowRightLine className="ml-2 text-xl" />
            </Link>
          </div>

          {/* Image Right (Placeholder) */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            {/* Đây là placeholder. Bạn nên thay bằng ảnh minh họa chất lượng cao */}
            <img
              src="/images/hero-books.png" // Đảm bảo bạn có ảnh này trong public/images/
              alt="Pile of books with GreenBook logo"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 animate-fade-in-right"
            />
          </div>
        </div>
        {/* Decorative background elements (optional) */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-700 dark:from-teal-700 dark:to-teal-900 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-700 dark:bg-teal-900 rounded-full opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400 dark:bg-teal-600 rounded-full opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </section>

      {/* --- Section: Sách Mới Nhất --- */}
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            <span className="text-teal-600 dark:text-teal-400">Sách Mới</span> Nhất
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {mockBooks.slice(0, 4).map(book => ( // Hiển thị 4 cuốn sách đầu tiên
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/books?category=new"
              className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold text-lg transition-colors duration-200"
            >
              Xem tất cả sách mới <RiArrowRightLine className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- Section: Sách Bán Chạy (Có thể làm tương tự như Sách Mới Nhất) --- */}
      <section className="py-16 bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
            <span className="text-mustard-yellow">Sách Bán</span> Chạy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {mockBooks.slice(4, 8).map(book => ( // Hiển thị 4 cuốn sách tiếp theo
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/books?category=bestsellers"
              className="inline-flex items-center text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-semibold text-lg transition-colors duration-200"
            >
              Xem tất cả sách bán chạy <RiArrowRightLine className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* (Có thể thêm các section khác như danh mục nổi bật, ưu đãi, blog, v.v.) */}

      {/* Cuộn lên đầu trang (chúng ta sẽ làm sau) */}
      {/* <ScrollToTopButton /> */}
    </>
  );
}