// greenbook-frontend/components/common/ThemeInitializer.tsx
'use client'; // Bắt buộc phải là Client Component

import { useEffect, useState } from 'react';

interface ThemeInitializerProps {
  // initialTheme: Giá trị theme mà server render ra (mặc định là 'light' cho SSR)
  // onThemeChange: Hàm callback để cập nhật trạng thái theme trong RootLayout
  initialTheme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const ThemeInitializer: React.FC<ThemeInitializerProps> = ({ initialTheme, onThemeChange }) => {
  // `mounted` state để đảm bảo logic chỉ chạy sau khi component đã mount trên client
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Đánh dấu là component đã mount

    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Xác định theme thực tế trên client: ưu tiên theme đã lưu, sau đó theme hệ thống, cuối cùng là 'light'
      let clientTheme: 'light' | 'dark' = 'light';
      if (savedTheme) {
        clientTheme = savedTheme;
      } else if (systemPrefersDark) {
        clientTheme = 'dark';
      }

      // Áp dụng class 'dark' ngay lập tức lên thẻ <html> trên client
      // Đây là bước quan trọng nhất để đồng bộ DOM
      if (clientTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Cập nhật trạng thái theme trong RootLayout (nếu có sự thay đổi)
      // Điều này sẽ khiến RootLayout re-render với theme chính xác từ client
      if (clientTheme !== initialTheme) {
        onThemeChange(clientTheme);
      }
    }
  }, [initialTheme, onThemeChange]); // Dependency array để hook chạy lại khi props thay đổi (ít khi xảy ra)

  // Component này không render gì cả, chỉ có tác dụng side effect
  return null;
};

export default ThemeInitializer;