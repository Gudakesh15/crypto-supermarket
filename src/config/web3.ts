import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { mainnet, sepolia } from 'wagmi/chains';
import type { WalletConnectionConfig } from '../types/wallet';

// Get project ID from environment variables with fallback for development
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'temp_development_id_for_testing';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  console.warn('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. Using temporary ID for development.');
}

// Define supported chains
const chains = [mainnet, sepolia] as const;

// Create wagmi config
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'CryptoSupermarket',
    description: 'DeFi Education Simulator - Learn crypto through AI-powered guidance',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://crypto-supermarket.vercel.app',
    icons: ['https://crypto-supermarket.vercel.app/favicon.ico'],
  },
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
});

// Create Web3Modal instance (only on client side)
let web3Modal: any = null;

// Initialize Web3Modal only on client side and only once
const initWeb3Modal = () => {
  if (typeof window !== 'undefined' && !web3Modal) {
    try {
      web3Modal = createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: false,
        enableOnramp: false,
        themeMode: 'light',
        themeVariables: {
          '--w3m-color-mix': '#00BB7F',
          '--w3m-color-mix-strength': 40,
        },
      });
    } catch (error) {
      console.warn('Failed to initialize Web3Modal:', error);
    }
  }
  return web3Modal;
};

export { web3Modal, initWeb3Modal };

// Export chain configuration
export const walletConfig: WalletConnectionConfig = {
  projectId,
  chains,
  defaultChain: mainnet,
};

// Contract addresses for mainnet
export const CONTRACT_ADDRESSES = {
  USDC: '0xA0b86a33E6417749fFdB2e1c3B2bc73ddA2E8d08',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
} as const;

// ERC-20 ABI for token balance reading
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
] as const; 