greenbook-frontend/
├── .next/                     # Thư mục cache của Next.js (do Next.js tự tạo)
├── components/
│   ├── books/
│   │   └── BookCard.tsx       # Component hiển thị thông tin 1 cuốn sách
│   └── common/
│       ├── Footer.tsx         # Component Footer chung
│       ├── Header.tsx         # Component Header chung
│       └── ThemeInitializer.tsx # Component quản lý Dark Mode (Client Component)
├── node_modules/              # Thư mục chứa các thư viện đã cài đặt (do npm/pnpm tự tạo)
├── public/                    # Thư mục chứa các tài nguyên tĩnh
│   ├── images/                # Đặt tất cả ảnh của bạn vào đây
│   │   ├── hero-books.png     # Ảnh cho Hero Section
│   │   ├── book-1.jpg         # Ảnh bìa sách 1
│   │   ├── book-2.jpg         # Ảnh bìa sách 2
│   │   ├── ...                # Các ảnh bìa sách khác (book-3.jpg đến book-8.jpg)
│   │   ├── partner_a.png      # Logo đối tác A
│   │   ├── partner_b.png      # Logo đối tác B
│   │   ├── paypal_logo.png    # Logo PayPal
│   │   └── stripe_logo.png    # Logo Stripe
│   ├── favicon.ico            # Favicon của trang web
│   ├── next.svg               # SVG mặc định của Next.js
│   ├── vercel.svg             # SVG mặc định của Vercel
│   └── ...                    # Các file SVG mặc định khác (file.svg, globe.svg, window.svg)
├── src/                       # Thư mục gốc chứa source code chính
│   └── app/
│       ├── (main)/            # ROUTE GROUP - Tên thư mục phải có dấu ngoặc đơn!
│       │   └── page.tsx       # TRANG CHỦ (URL: /)
│       ├── globals.css        # File CSS toàn cục (Tailwind CSS base, components, utilities)
│       ├── layout.tsx         # ROOT LAYOUT (chứa Header, Footer, quản lý Dark Mode)
│       └── metadata.ts        # File riêng biệt chứa Metadata cho trang web
├── .env                       # File môi trường (ví dụ: NEXT_PUBLIC_API_URL)
├── .gitignore                 # Các file/thư mục bị bỏ qua bởi Git
├── eslintrc.cjs               # Cấu hình ESLint
├── next-env.d.ts              # Định nghĩa môi trường Next.js
├── next.config.ts             # Cấu hình Next.js
├── package.json               # Danh sách dependencies và scripts
├── package-lock.json          # Lock file cho dependencies (nếu dùng npm)
├── postcss.config.js          # Cấu hình PostCSS (cho Tailwind)
├── README.md                  # File README dự án
├── tailwind.config.ts         # Cấu hình Tailwind CSS
└── tsconfig.json              # Cấu hình TypeScript