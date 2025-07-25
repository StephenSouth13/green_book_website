// greenbook-frontend/src/app/(main)/checkout/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiMapPinLine, RiPhoneLine, RiMailLine, RiUserLine, RiShoppingCartLine, RiCoupon3Line, RiCheckDoubleLine } from 'react-icons/ri';
import { FaShippingFast, FaCreditCard, FaMapMarkerAlt } from 'react-icons/fa'; // Icons cho các bước

// Định nghĩa kiểu dữ liệu cho một mục trong giỏ hàng (giả định)
interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

// Mock data giỏ hàng cho trang checkout (thay thế bằng dữ liệu thật từ Context/API)
const mockCheckoutItems: CartItem[] = [
  { id: '1', title: 'Tư Duy Nhanh Và Chậm', price: 189000, imageUrl: '/images/book-1.jpg', quantity: 1 },
  { id: '3', title: 'Sapiens: Lược Sử Loài Người', price: 250000, imageUrl: '/images/book-3.jpg', quantity: 2 },
  { id: '6', title: 'Tôi Tự Học', price: 85000, imageUrl: '/images/book-6.jpg', quantity: 1 },
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1); // 1: Thông tin, 2: Thanh toán, 3: Xác nhận
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState(''); // 'cod', 'card', 'paypal'
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0); // Giả lập số tiền giảm giá
  const [orderId, setOrderId] = useState(''); // ID đơn hàng sau khi đặt thành công
  const [deliveryLocation, setDeliveryLocation] = useState<{ lat: number; lng: number } | null>(null); // Dành cho GPS tracking

  // Tính toán tổng tiền, phí ship, tổng cộng (sử dụng useMemo để tối ưu)
  const { subtotal, shippingFee, finalTotal } = useMemo(() => {
    const calculatedSubtotal = mockCheckoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedShippingFee = calculatedSubtotal > 500000 ? 0 : 30000; // Miễn phí ship trên 500k VNĐ
    const calculatedFinalTotal = calculatedSubtotal + calculatedShippingFee - discountAmount;
    return {
      subtotal: calculatedSubtotal,
      shippingFee: calculatedShippingFee,
      finalTotal: calculatedFinalTotal,
    };
  }, [mockCheckoutItems, discountAmount]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const applyCoupon = () => {
    // TODO: Call API để kiểm tra mã giảm giá
    if (couponCode.toLowerCase() === 'greenbook20') {
      setDiscountAmount(50000); // Giảm 50k VNĐ
      alert('Áp dụng mã giảm giá thành công! Giảm 50.000 VNĐ.');
    } else {
      setDiscountAmount(0);
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handlePlaceOrder = async () => {
    // TODO: Gửi tất cả thông tin đơn hàng đến Backend
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng.');
      return;
    }
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    // Giả lập gửi đơn hàng đến API
    try {
      // const orderData = {
      //   items: mockCheckoutItems,
      //   shippingInfo,
      //   paymentMethod,
      //   couponCode,
      //   subtotal,
      //   shippingFee,
      //   finalTotal,
      // };
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData),
      // });
      // const result = await response.json();

      // if (response.ok) {
      //   setOrderId(result.orderId); // Lưu ID đơn hàng thật
      //   setCurrentStep(3); // Chuyển sang bước xác nhận
      // } else {
      //   alert('Có lỗi khi đặt hàng: ' + (result.message || 'Lỗi không xác định.'));
      // }

      // Giả lập thành công:
      alert('Đặt hàng thành công! Đang chuyển đến trang xác nhận.');
      setOrderId('GBK' + Date.now().toString().slice(-8)); // ID đơn hàng giả lập
      setCurrentStep(3);
      // Giả lập GPS Tracking cho đơn hàng
      startMockGpsTracking();

    } catch (error) {
      console.error('Lỗi đặt hàng:', error);
      alert('Đã có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại sau.');
    }
  };

  // Giả lập GPS Tracking (cho bước xác nhận đơn hàng)
  const startMockGpsTracking = () => {
    let currentLat = 10.7769; // Vĩ độ ban đầu (gần trung tâm Sài Gòn)
    let currentLng = 106.7009; // Kinh độ ban đầu

    const intervalId = setInterval(() => {
      // Di chuyển ngẫu nhiên một chút để giả lập xe đang di chuyển
      currentLat += (Math.random() - 0.5) * 0.001; // Di chuyển khoảng 100m mỗi lần
      currentLng += (Math.random() - 0.5) * 0.001;

      setDeliveryLocation({ lat: currentLat, lng: currentLng });

      // Dừng giả lập sau một thời gian nhất định (ví dụ 30 giây)
      if (Math.random() > 0.95) { // 5% cơ hội dừng
        clearInterval(intervalId);
        setDeliveryLocation(null); // Hoặc giữ vị trí cuối cùng
        alert('Đơn hàng đã được giao đến gần địa điểm của bạn!');
      }
    }, 5000); // Cập nhật mỗi 5 giây
  };


  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-theme(spacing.16)-theme(spacing.80))]">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center mb-10">
        Thanh Toán Đơn Hàng
      </h1>

      {/* Progress Stepper */}
      <div className="flex justify-center items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-0 transform -translate-y-1/2">
          <div
            className="h-full bg-teal-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep - 1) / 2 * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between w-full relative z-10">
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${currentStep >= 1 ? 'bg-teal-600' : 'bg-gray-400'}`}>
              <FaShippingFast className="text-xl" />
            </div>
            <span className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">Thông tin giao hàng</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${currentStep >= 2 ? 'bg-teal-600' : 'bg-gray-400'}`}>
              <FaCreditCard className="text-xl" />
            </div>
            <span className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">Thanh toán</span>
          </div>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${currentStep >= 3 ? 'bg-teal-600' : 'bg-gray-400'}`}>
              <RiCheckDoubleLine className="text-xl" />
            </div>
            <span className="mt-2 text-sm text-center text-gray-700 dark:text-gray-300">Xác nhận</span>
          </div>
        </div>
      </div>


      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Order Details */}
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                1. Thông tin giao hàng
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Họ và Tên</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiUserLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Nguyễn Văn A"
                      value={shippingInfo.fullName}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiMailLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="email@example.com"
                      value={shippingInfo.email}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Số điện thoại</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiPhoneLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="0912 345 678"
                      value={shippingInfo.phone}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Địa chỉ</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                      <RiMapPinLine className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      placeholder="Số nhà, đường, hẻm..."
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tỉnh/Thành phố</label>
                    <input type="text" name="city" id="city" placeholder="Hồ Chí Minh" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={shippingInfo.city} onChange={handleShippingInfoChange} required />
                  </div>
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quận/Huyện</label>
                    <input type="text" name="district" id="district" placeholder="Quận 1" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={shippingInfo.district} onChange={handleShippingInfoChange} required />
                  </div>
                  <div>
                    <label htmlFor="ward" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phường/Xã</label>
                    <input type="text" name="ward" id="ward" placeholder="Phường Bến Nghé" className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm" value={shippingInfo.ward} onChange={handleShippingInfoChange} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ghi chú (Tùy chọn)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    placeholder="Giao hàng sau 5 giờ chiều, v.v."
                    value={shippingInfo.notes}
                    onChange={handleShippingInfoChange}
                  ></textarea>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                >
                  Tiếp tục đến Thanh toán
                </button>
              </form>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                2. Chọn phương thức thanh toán
              </h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="form-radio h-5 w-5 text-teal-600 transition-colors"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-900 dark:text-white">Thanh toán khi nhận hàng (COD)</span>
                </label>
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="form-radio h-5 w-5 text-teal-600 transition-colors"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-900 dark:text-white">Thanh toán bằng thẻ (Visa, Mastercard)</span>
                  <Image src="/images/stripe_logo.png" alt="Stripe" width={60} height={30} className="ml-auto" /> {/* Ví dụ */}
                </label>
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="form-radio h-5 w-5 text-teal-600 transition-colors"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-900 dark:text-white">Thanh toán qua PayPal</span>
                  <Image src="/images/paypal_logo.png" alt="PayPal" width={80} height={20} className="ml-auto" /> {/* Ví dụ */}
                </label>

                <div className="flex items-center mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800">
                  <RiCoupon3Line className="text-2xl text-gray-500 dark:text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="flex-grow bg-transparent focus:outline-none text-gray-900 dark:text-white"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="ml-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Áp dụng
                  </button>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                  >
                    Quay lại
                  </button>
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <div className="text-center py-10">
              <RiCheckDoubleLine className="text-7xl text-teal-600 dark:text-teal-400 mx-auto mb-6 animate-bounce" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Cảm ơn bạn! Đơn hàng đã được đặt thành công.
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Mã đơn hàng của bạn là: <span className="font-semibold text-teal-600 dark:text-teal-400">{orderId}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Chúng tôi sẽ gửi email xác nhận và thông tin chi tiết đến bạn sớm nhất.
              </p>

              {/* GPS Tracking Section */}
              <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                  <FaMapMarkerAlt className="text-teal-600 dark:text-teal-400" />
                  Theo dõi đơn hàng của bạn
                </h3>
                {deliveryLocation ? (
                  <p className="text-gray-700 dark:text-gray-300">
                    Vị trí hiện tại của Shipper: Vĩ độ {deliveryLocation.lat.toFixed(6)}, Kinh độ {deliveryLocation.lng.toFixed(6)}
                    <br />
                    <span className="text-sm text-gray-500">Đang cập nhật... (giả lập)</span>
                  </p>
                ) : (
                  <p className="text-gray-700 dark:text-gray-300">
                    Đơn hàng của bạn đang được chuẩn bị để giao.
                    {orderId && (
                      <button
                        onClick={startMockGpsTracking}
                        className="block mx-auto mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                      >
                        Bắt đầu theo dõi (Giả lập)
                      </button>
                    )}
                  </p>
                )}
                {/* Ở đây bạn có thể nhúng một bản đồ nhúng (ví dụ Google Maps)
                    để hiển thị vị trí thật của shipper sau này */}
                {/* <div className="mt-4 bg-gray-200 h-64 flex items-center justify-center rounded-md text-gray-500">
                  Placeholder Map
                </div> */}
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Link
                  href="/"
                  className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                >
                  Về trang chủ
                </Link>
                <Link
                  href="/my-orders" // Sẽ tạo trang này sau
                  className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg"
                >
                  Xem đơn hàng của tôi
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Cart Summary */}
        <div className="lg:col-span-1 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-6 h-fit sticky top-28">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
            Đơn hàng của bạn
          </h2>
          <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
            {mockCheckoutItems.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative w-16 h-20 flex-shrink-0">
                  <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} className="rounded-md" />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-900 dark:text-white text-md font-semibold leading-tight">{item.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Số lượng: {item.quantity}</p>
                </div>
                <span className="text-gray-900 dark:text-white font-semibold flex-shrink-0">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t pt-4 border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Tạm tính:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>Phí vận chuyển:</span>
              <span>{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-red-500 dark:text-red-400">
                <span>Giảm giá mã ({couponCode}):</span>
                <span>-{formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Tổng cộng:</span>
              <span className="text-teal-600 dark:text-teal-400">{formatCurrency(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}