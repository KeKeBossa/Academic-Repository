// app/page.tsx
'use client'; // App Routerのクライアントコンポーネントとして指定

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'; // wagmi のフックをインポート

export default function Home() {
  const { address, isConnected } = useAccount(); // ウォレット接続情報を取得

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <main className="flex flex-col items-center justify-center w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          学術活動活性化プラットフォーム
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          ブロックチェーンと分散IDで、新たな知の共有と交流を。
        </p>

        <div className="mb-8">
          {/* RainbowKit のウォレット接続ボタン */}
          <ConnectButton label="ウォレットを接続" />
        </div>

        {isConnected && (
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">接続済みウォレットアドレス:</p>
            <p className="break-all text-blue-600">{address}</p>
            <p className="mt-4 text-sm text-gray-500">
              このアドレスがあなたの分散ID (DID) となります。
            </p>
          </div>
        )}

        {!isConnected && (
          <p className="text-gray-500 text-sm">
            MetaMaskなどのウォレットを接続して開始してください。
          </p>
        )}
      </main>

      <footer className="mt-8 text-gray-500 text-sm">
        <p>&copy; 2025 Your University / Your Name</p>
      </footer>
    </div>
  );
}