'use client';

import { PropsWithChildren, useState } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from '../lib/wagmi';

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  }
});

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={chakraTheme}>
          <RainbowKitProvider
            modalSize="compact"
            theme={darkTheme({ accentColor: '#6366f1' })}
            locale="ja"
          >
            {children}
          </RainbowKitProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
