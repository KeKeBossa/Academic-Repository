import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { polygonAmoy, sepolia } from 'wagmi/chains';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? 'demo-project-id';

export const wagmiConfig = getDefaultConfig({
  appName: 'Academic Blockchain Repository',
  projectId,
  ssr: true,
  chains: [polygonAmoy, sepolia],
  transports: {
    [polygonAmoy.id]: http(
      process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC_URL ?? 'https://polygon-amoy.g.alchemy.com/v2/demo'
    ),
    [sepolia.id]: http(
      process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? 'https://eth-sepolia.g.alchemy.com/v2/demo'
    )
  }
});
