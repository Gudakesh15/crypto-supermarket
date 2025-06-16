// Wallet and Blockchain Types
export interface WalletBalance {
  token: string;
  symbol: string;
  balance: string;
  balanceFormatted: string;
  usdValue: number;
  address: string;
}

export interface WalletInfo {
  address: string;
  network: string;
  balances: WalletBalance[];
  totalValue: number;
}

// Index Products
export interface IndexProduct {
  id: string;
  name: string;
  description: string;
  type: 'stablecoin' | 'crypto' | 'hybrid';
  allocation: TokenAllocation[];
  expectedApy: number;
  riskLevel: 'low' | 'medium' | 'high';
  minimumInvestment: number;
}

export interface TokenAllocation {
  token: string;
  symbol: string;
  percentage: number;
  protocol?: string;
}

// Portfolio Simulation
export interface PortfolioSimulation {
  id: string;
  indexId: string;
  initialAmount: number;
  currentValue: number;
  returns: number;
  returnsPercentage: number;
  timeline: PortfolioDataPoint[];
}

export interface PortfolioDataPoint {
  date: string;
  value: number;
  cumulativeReturns: number;
}

// AI Analysis
export interface PortfolioAnalysis {
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  diversificationScore: number;
  recommendations: string[];
  suggestedIndex: string;
  reasoning: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Market Data
export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
}

// User Session
export interface UserSession {
  walletConnected: boolean;
  walletAddress?: string;
  preferredNetwork?: string;
  onboardingCompleted: boolean;
}
