// greenbook-frontend/src/app/(main)/books/page.tsx

// Đây là một Server Component. Nó sẽ fetch dữ liệu sách.

import BookCard from '../../../../components/books/BookCard'; // Điều chỉnh đường dẫn đến BookCard
import Link from 'next/link';
import { RiFilter2Line, RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri'; // Icons cho filter/sort (sẽ dùng sau)

// Mock data cho tất cả sách (tăng số lượng để có nhiều sách hơn trên trang)
const mockAllBooks = [
  { id: '1', title: 'Tư Duy Nhanh Và Chậm', author: 'Daniel Kahneman', price: '189.000', imageUrl: '/images/book-1.jpg' },
  { id: '2', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '120.000', imageUrl: '/images/book-2.jpg' },
  { id: '3', title: 'Sapiens: Lược Sử Loài Người', author: 'Yuval Noah Harari', price: '250.000', imageUrl: '/images/book-3.jpg' },
  { id: '4', title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '95.000', imageUrl: '/images/book-4.jpg' },
  { id: '5', title: 'Hành Trình Về Phương Đông', author: 'Baird T. Spalding', price: '110.000', imageUrl: '/images/book-5.jpg' },
  { id: '6', title: 'Tôi Tự Học', author: 'Nguyễn Duy Cần', price: '85.000', imageUrl: '/images/book-6.jpg' },
  { id: '7', title: 'Quẳng Gánh Lo Đi Và Vui Sống', author: 'Dale Carnegie', price: '135.000', imageUrl: '/images/book-7.jpg' },
  { id: '8', title: 'Atomic Habits', author: 'James Clear', price: '175.000', imageUrl: '/images/book-8.jpg' },
  { id: '9', title: 'Nhà Giả Kim (bản đặc biệt)', author: 'Paulo Coelho', price: '110.000', imageUrl: '/images/book-4.jpg' },
  { id: '10', title: 'Đắc Nhân Tâm (bìa cứng)', author: 'Dale Carnegie', price: '150.000', imageUrl: '/images/book-2.jpg' },
  { id: '11', title: 'Tư Duy Nhanh Và Chậm (bản điện tử)', author: 'Daniel Kahneman', price: '100.000', imageUrl: '/images/book-1.jpg' },
  { id: '12', title: 'Sapiens (bản mới)', author: 'Yuval Noah Harari', price: '280.000', imageUrl: '/images/book-3.jpg' },
];

export default function BooksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-12">
        Tất Cả Sách
      </h1>

      {/* Filter and Sort Section (Client Component sau này) */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {/* Filter Button (for mobile/tablet sidebar filter) */}
        <button className="md:hidden bg-teal-600 dark:bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors">
          <RiFilter2Line /> Lọc
        </button>

        {/* Sort Dropdown */}
        <div className="relative">
          <select className="block w-full md:w-auto p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none pr-8">
            <option value="">Sắp xếp theo</option>
            <option value="price-asc">Giá: Thấp đến Cao</option>
            <option value="price-desc">Giá: Cao đến Thấp</option>
            <option value="name-asc">Tên: A-Z</option>
            <option value="name-desc">Tên: Z-A</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <RiArrowDownSLine />
          </div>
        </div>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {mockAllBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Pagination (sẽ thêm sau) */}
      <div className="flex justify-center mt-12">
        {/* Placeholder for pagination */}
        {/* <Pagination /> */}
      </div>
    </div>
  );
}