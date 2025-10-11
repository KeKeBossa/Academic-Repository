// app/layout.tsx
import './globals.css'; // Tailwind CSS のインポート (通常は既に存在)
import { Inter } from 'next/font/google'; // フォントのインポート (通常は既に存在)
import { Providers } from './providers'; // 作成したProvidersをインポート

const inter = Inter({ subsets: ['latin'] }); // フォントの定義 (通常は既に存在)

export const metadata = {
  title: '学術活動活性化プラットフォーム', // ここにアプリのタイトル
  description: 'ブロックチェーンを活用した学術プラットフォーム', // ここにアプリの説明
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* Providersでアプリケーションをラップ */}
      </body>
    </html>
  );
}