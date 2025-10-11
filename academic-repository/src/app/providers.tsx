// app/providers.tsx
'use client'; // App Routerのクライアントコンポーネントとして指定

import * as React from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'; // RainbowKit のスタイルシート

// wagmi v2.x の新しいインポートと設定方法
import { WagmiProvider, createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // react-queryのプロバイダー

// QueryClientのインスタンスを作成
const queryClient = new QueryClient();

// wagmi v2.x の新しい設定方法: createConfig
const config = createConfig({
  chains: [
    sepolia, // 卒業研究ではテストネット (Sepolia) を使用
    // mainnet, // 必要に応じてコメントアウトを外す
  ],
  transports: {
    [sepolia.id]: http(), // Sepoliaチェーンのトランスポート
    // [mainnet.id]: http(), // メインネットのトランスポート
  },
  connectors: getDefaultWallets({
    appName: 'My Academic Platform', // ここにあなたのアプリ名を入力
    projectId: 'b8645a65e89485f512d9b0a511fd308b', // <<<<<<< IMPORTANT: ここにあなたのWalletConnect Cloud Project IDを入力してください
                                 // WalletConnect Cloud (cloud.walletconnect.com) で無料で取得できます
  }).connectors,
});

// プロバイダーコンポーネントをエクスポート
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}