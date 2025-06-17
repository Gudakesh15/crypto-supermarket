import { formatUnits, Contract } from 'ethers';
import { getPublicClient } from '@wagmi/core';
import { config } from '../config/web3';
import { CONTRACT_ADDRESSES, ERC20_ABI } from '../config/web3';
import type { TokenBalance, SupportedToken } from '../types/wallet';

export class WalletService {
  /**
   * Get public client instance
   */
  private async getPublicClient() {
    try {
      const client = getPublicClient(config);
      if (!client) {
        throw new Error('Public client not available');
      }
      return client;
    } catch (error) {
      console.error('Error getting public client:', error);
      throw new Error('Failed to initialize blockchain client');
    }
  }

  /**
   * Get ETH balance for an address
   */
  async getETHBalance(address: string): Promise<string> {
    try {
      const publicClient = await this.getPublicClient();
      const balance = await publicClient.getBalance({ address: address as `0x${string}` });
      return formatUnits(balance, 18);
    } catch (error) {
      console.error('Error fetching ETH balance:', error);
      throw new Error('Failed to fetch ETH balance');
    }
  }

  /**
   * Get ERC-20 token balance for an address
   */
  async getTokenBalance(
    tokenAddress: string,
    walletAddress: string,
    decimals: number = 18
  ): Promise<string> {
    try {
      const publicClient = await this.getPublicClient();
      
      const balance = await publicClient.readContract({
        address: tokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [walletAddress as `0x${string}`],
      });

      return formatUnits(balance as bigint, decimals);
    } catch (error) {
      console.error(`Error fetching token balance for ${tokenAddress}:`, error);
      throw new Error(`Failed to fetch token balance for ${tokenAddress}`);
    }
  }

  /**
   * Get all supported token balances for a wallet address
   */
  async getAllTokenBalances(walletAddress: string): Promise<TokenBalance[]> {
    try {
      const balances: TokenBalance[] = [];

      // Get ETH balance
      try {
        const ethBalance = await this.getETHBalance(walletAddress);
        balances.push({
          symbol: 'ETH',
          balance: ethBalance,
          decimals: 18,
          address: 'native',
        });
      } catch (error) {
        console.error('Failed to fetch ETH balance:', error);
      }

      // Get ERC-20 token balances
      const tokens = [
        { symbol: 'USDC', address: CONTRACT_ADDRESSES.USDC, decimals: 6 },
        { symbol: 'USDT', address: CONTRACT_ADDRESSES.USDT, decimals: 6 },
        { symbol: 'WBTC', address: CONTRACT_ADDRESSES.WBTC, decimals: 8 },
      ];

      for (const token of tokens) {
        try {
          const balance = await this.getTokenBalance(
            token.address,
            walletAddress,
            token.decimals
          );
          balances.push({
            symbol: token.symbol,
            balance,
            decimals: token.decimals,
            address: token.address,
          });
        } catch (error) {
          console.error(`Failed to fetch ${token.symbol} balance:`, error);
          // Add zero balance for failed tokens
          balances.push({
            symbol: token.symbol,
            balance: '0',
            decimals: token.decimals,
            address: token.address,
          });
        }
      }

      return balances;
    } catch (error) {
      console.error('Error fetching all token balances:', error);
      throw new Error('Failed to fetch token balances');
    }
  }

  /**
   * Get portfolio value in USD (placeholder for future price integration)
   */
  async getPortfolioValue(balances: TokenBalance[]): Promise<number> {
    // TODO: Integrate with CoinGecko API for real-time prices
    // For now, return placeholder calculation
    let totalValue = 0;

    for (const balance of balances) {
      const numericBalance = parseFloat(balance.balance);
      if (isNaN(numericBalance) || numericBalance <= 0) continue;

      // Placeholder prices (replace with real API data)
      const prices: Record<string, number> = {
        ETH: 2400,
        USDC: 1,
        USDT: 1,
        WBTC: 43000,
      };

      const price = prices[balance.symbol] || 0;
      totalValue += numericBalance * price;
    }

    return totalValue;
  }

  /**
   * Format wallet address for display
   */
  formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  /**
   * Validate Ethereum address
   */
  isValidAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  /**
   * Get token info by symbol
   */
  getTokenInfo(symbol: SupportedToken) {
    const tokenMap = {
      ETH: { address: 'native', decimals: 18 },
      USDC: { address: CONTRACT_ADDRESSES.USDC, decimals: 6 },
      USDT: { address: CONTRACT_ADDRESSES.USDT, decimals: 6 },
      WBTC: { address: CONTRACT_ADDRESSES.WBTC, decimals: 8 },
    };

    return tokenMap[symbol];
  }
} 