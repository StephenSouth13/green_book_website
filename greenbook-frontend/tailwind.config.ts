// greenbook-frontend/tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // <--- QUAN TRỌNG: Kích hoạt dark mode bằng class
  theme: {
    extend: {
      colors: {
        // Định nghĩa màu sắc theme của bạn ở đây để dễ dùng và nhất quán
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488', // Màu Teal chính cho GreenBook
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        // Nếu muốn dùng màu xanh đậm hơn như Deep Teal
        'deep-teal': '#1A535C',
        // Màu phụ trợ (ví dụ: vàng mustard)
        'mustard-yellow': '#FFD166',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true, // Căn giữa container
      },
    },
  },
  plugins: [],
};
export default config;