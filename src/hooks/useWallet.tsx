'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { WalletService } from '../services/walletService';
import type { WalletState, WalletContextType, TokenBalance } from '../types/wallet';

// Create wallet context
const WalletContext = createContext<WalletContextType | null>(null);

// Initial wallet state
const initialWalletState: WalletState = {
  address: null,
  isConnected: false,
  isConnecting: false,
  chainId: null,
  balance: null,
  error: null,
};

// Wallet service instance
const walletService = new WalletService();

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>(initialWalletState);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Wagmi hooks
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  // Update wallet state when account changes
  useEffect(() => {
    setWalletState(prev => ({
      ...prev,
      address: address || null,
      isConnected,
      isConnecting,
      chainId: chainId || null,
      error: null,
    }));

    // Clear balances when disconnected
    if (!isConnected) {
      setTokenBalances([]);
    }
  }, [address, isConnected, isConnecting, chainId]);

  // Refresh token balances
  const refreshBalances = useCallback(async () => {
    if (!address || !isConnected) {
      setTokenBalances([]);
      return;
    }

    setIsLoading(true);
    try {
      const balances = await walletService.getAllTokenBalances(address);
      setTokenBalances(balances);
      
      // Update ETH balance in wallet state
      const ethBalance = balances.find(b => b.symbol === 'ETH');
      if (ethBalance) {
        setWalletState(prev => ({
          ...prev,
          balance: ethBalance.balance,
        }));
      }
    } catch (error) {
      console.error('Failed to refresh balances:', error);
      setWalletState(prev => ({
        ...prev,
        error: 'Failed to fetch wallet balances',
      }));
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected]);

  // Auto-refresh balances when wallet connects
  useEffect(() => {
    if (address && isConnected) {
      refreshBalances();
    }
  }, [address, isConnected, refreshBalances]);

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    try {
      setWalletState(prev => ({ ...prev, error: null }));
      
      // Import and use Web3Modal for wallet selection
      const { initWeb3Modal } = await import('../config/web3');
      const modal = initWeb3Modal();
      
      if (modal) {
        console.log('Opening Web3Modal for wallet selection...');
        // Open Web3Modal for wallet selection - it handles connection automatically
        modal.open();
      } else {
        console.warn('Web3Modal not available, using fallback connection');
        // Fallback to direct wagmi connection if Web3Modal fails
        const injectedConnector = connectors.find(c => c.type === 'injected');
        if (injectedConnector) {
          await connect({ connector: injectedConnector });
        } else if (connectors.length > 0) {
          await connect({ connector: connectors[0] });
        } else {
          throw new Error('No wallet connectors available');
        }
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, [connect, connectors]);

  // Disconnect wallet function
  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect();
      
      // Also close Web3Modal if it's open
      try {
        const { initWeb3Modal } = await import('../config/web3');
        const modal = initWeb3Modal();
        if (modal) {
          modal.close();
        }
      } catch (error) {
        // Ignore Web3Modal errors during disconnect
        console.warn('Failed to close Web3Modal:', error);
      }
      
      setWalletState(initialWalletState);
      setTokenBalances([]);
    } catch (error: any) {
      console.error('Wallet disconnection error:', error);
      setWalletState(prev => ({
        ...prev,
        error: error.message || 'Failed to disconnect wallet',
      }));
    }
  }, [disconnect]);

  const contextValue: WalletContextType = {
    walletState,
    connect: connectWallet,
    disconnect: disconnectWallet,
    tokenBalances,
    isLoading,
    refreshBalances,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use wallet context
export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    // During SSR, return a default state instead of throwing
    if (typeof window === 'undefined') {
      return {
        walletState: initialWalletState,
        connect: async () => {},
        disconnect: async () => {},
        tokenBalances: [],
        isLoading: false,
        refreshBalances: async () => {},
      };
    }
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

// Utility hooks for common wallet operations
export function useWalletBalance() {
  try {
    const { tokenBalances, isLoading, refreshBalances } = useWallet();
    return { tokenBalances, isLoading, refreshBalances };
  } catch (error) {
    // Fallback for when context is not available
    return { 
      tokenBalances: [], 
      isLoading: false, 
      refreshBalances: async () => {} 
    };
  }
}

export function useWalletConnection() {
  try {
    const { walletState, connect, disconnect } = useWallet();
    return {
      isConnected: walletState.isConnected,
      address: walletState.address,
      isConnecting: walletState.isConnecting,
      error: walletState.error,
      connect,
      disconnect,
    };
  } catch (error) {
    // Fallback for when context is not available
    return {
      isConnected: false,
      address: null,
      isConnecting: false,
      error: null,
      connect: async () => {},
      disconnect: async () => {},
    };
  }
} 