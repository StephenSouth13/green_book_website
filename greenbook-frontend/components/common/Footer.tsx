// greenbook-frontend/components/common/Footer.tsx

import Link from 'next/link';
import { RiFacebookFill, RiInstagramLine, RiTwitterXFill, RiYoutubeFill } from 'react-icons/ri'; // Social Media Icons

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Column 1: Introduction & Logo */}
        <div>
          <Link href="/" className="block text-2xl font-bold text-gray-900 dark:text-white mb-3">
            <span className="text-teal-600 dark:text-teal-400">Green</span>Book
          </Link>
          <p className="text-sm leading-relaxed mb-4">
            GreenBook là nền tảng bán sách trực tuyến hiện đại, nơi tri thức khai mở và những cuốn sách hay tìm đến độc giả.
          </p>
          <p className="text-sm">
            Địa chỉ: 123 Đường Sách, Quận Tri Thức, TP.HCM <br />
            Điện thoại: (028) 123 4567
          </p>
        </div>

        {/* Column 2: Customer Service & Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Dịch Vụ Khách Hàng</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Giới Thiệu</Link></li>
            <li><Link href="/contact" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Liên Hệ</Link></li>
            <li><Link href="/faq" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Câu Hỏi Thường Gặp (FAQ)</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Chính Sách Bảo Mật</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Điều Khoản Sử Dụng</Link></li>
            <li><Link href="/return-policy" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Chính Sách Đổi Trả</Link></li>
            <li><Link href="/feedback" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 text-sm">Góp Ý</Link></li>
          </ul>
        </div>

        {/* Column 3: Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Kết Nối Với Chúng Tôi</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com/your-greenbook-page" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-200">
              <RiFacebookFill className="text-2xl" />
            </a>
            <a href="https://instagram.com/your-greenbook-page" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition-colors duration-200">
              <RiInstagramLine className="text-2xl" />
            </a>
            <a href="https://twitter.com/your-greenbook-page" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-600 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <RiTwitterXFill className="text-2xl" />
            </a>
            <a href="https://youtube.com/your-greenbook-channel" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-200">
              <RiYoutubeFill className="text-2xl" />
            </a>
          </div>
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Đăng ký nhận bản tin</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-grow py-2 px-3 rounded-l-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-r-md transition-colors duration-200">
              Đăng ký
            </button>
          </div>
        </div>

        {/* Column 4: Partners & Payments (Placeholder) */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Đối Tác & Thanh Toán</h3>
          <div className="grid grid-cols-3 gap-3">
            {/* Replace with actual partner/payment logos later */}
            <div className="bg-white dark:bg-gray-700 p-2 rounded-md flex items-center justify-center h-12">
              <img src="/images/partner_a.png" alt="Partner A" className="h-full object-contain" /> {/* Make sure to add these images to public/images */}
            </div>
            <div className="bg-white dark:bg-gray-700 p-2 rounded-md flex items-center justify-center h-12">
              <img src="/images/partner_b.png" alt="Partner B" className="h-full object-contain" />
            </div>
            <div className="bg-white dark:bg-gray-700 p-2 rounded-md flex items-center justify-center h-12">
              <img src="/images/stripe_logo.png" alt="Stripe" className="h-full object-contain" />
            </div>
            <div className="bg-white dark:bg-gray-700 p-2 rounded-md flex items-center justify-center h-12">
              <img src="/images/paypal_logo.png" alt="PayPal" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} GreenBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;