// greenbook-frontend/components/books/BookCard.tsx

'use client'; // Component này cần là client component vì có button tương tác

import Link from 'next/link';
import Image from 'next/image'; // Import Image component từ Next.js
import { RiShoppingCartLine } from 'react-icons/ri'; // Icon giỏ hàng

interface BookCardProps {
  book: {
    id: string;
    title: string;
    author: string;
    price: string;
    imageUrl: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // Logic xử lý "Add to Cart" sẽ nằm ở đây sau này
  const handleAddToCart = () => {
    alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
    // TODO: Thêm logic thực tế để cập nhật giỏ hàng (sử dụng Context API hoặc Redux/Zustand)
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4 transform hover:-translate-y-1">
      {/* Sử dụng Link để điều hướng đến trang chi tiết sách */}
      <Link href={`/books/${book.id}`} className="block w-full text-center">
        <div className="relative w-40 h-56 md:w-48 md:h-64 mx-auto mb-4">
          {/* Sử dụng Next.js Image component để tối ưu hóa hình ảnh */}
          <Image
            src={book.imageUrl}
            alt={book.title}
            fill // Image sẽ lấp đầy kích thước của div cha (w-40 h-56)
            style={{ objectFit: 'cover' }} // Đảm bảo ảnh được cắt và lấp đầy mà không bị biến dạng
            className="rounded-md"
            priority // Ưu tiên tải ảnh này trên trang chủ để cải thiện LCP (Largest Contentful Paint)
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Tối ưu responsive images
          />
        </div>  
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 leading-tight">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
      </Link>
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
          {book.price} VNĐ
        </span>
        <button
          onClick={handleAddToCart}
          className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center text-xl"
          aria-label={`Thêm ${book.title} vào giỏ`}
        >
          <RiShoppingCartLine />
        </button>
      </div>
    </div>
  );
};

export default BookCard;