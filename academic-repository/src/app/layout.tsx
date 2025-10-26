import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Academic Blockchain Repository',
  description: '分散型学術リポジトリで研究成果の共有とDAOガバナンスを実現するプラットフォーム'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        <Providers>
          <div className="relative isolate flex min-h-screen flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.22)_0%,_rgba(15,23,42,0)_70%)]" />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
