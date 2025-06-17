export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface TokenBalance {
  symbol: string;
  balance: string;
  decimals: number;
  address: string;
  usdValue?: number;
}

export interface WalletContextType {
  walletState: WalletState;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  tokenBalances: TokenBalance[];
  isLoading: boolean;
  refreshBalances: () => Promise<void>;
}

export interface WalletConnectionConfig {
  projectId: string;
  chains: readonly [any, ...any[]];
  defaultChain: any;
}

export const SUPPORTED_TOKENS = {
  ETH: {
    symbol: 'ETH',
    decimals: 18,
    address: 'native',
  },
  USDC: {
    symbol: 'USDC',
    decimals: 6,
    address: '0xA0b86a33E6417749fFdB2e1c3B2bc73ddA2E8d08',
  },
  USDT: {
    symbol: 'USDT',
    decimals: 6,
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  },
  WBTC: {
    symbol: 'WBTC',
    decimals: 8,
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
} as const;

export type SupportedToken = keyof typeof SUPPORTED_TOKENS; 