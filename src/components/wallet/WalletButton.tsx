'use client';

import React, { useEffect, useState } from 'react';
import { useWalletConnection } from '../../hooks/useWallet';

interface WalletButtonProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  showAddress?: boolean;
  showBalance?: boolean;
}

export function WalletButton({
  size = 'md',
  variant = 'primary',
  className = '',
  showAddress = true,
  showBalance = false,
}: WalletButtonProps) {
  const [mounted, setMounted] = useState(false);
  
  // Always call hooks in the same order - this is required by React rules
  const { isConnected, address, isConnecting, error, connect, disconnect } = useWalletConnection();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted on client
  if (!mounted) {
    return (
      <button className={`
        inline-flex items-center justify-center
        font-medium rounded-md border
        px-4 py-2 text-base
        bg-blue-600 text-white border-blue-600
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `} disabled>
        Connect Wallet
      </button>
    );
  }

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border-blue-600',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-md border
    transition-colors duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
  `;

  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Handle button click
  const handleClick = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  // Loading state
  if (isConnecting) {
    return (
      <button className={buttonClasses} disabled>
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Connecting...
      </button>
    );
  }

  // Connected state
  if (isConnected && address) {
    return (
      <div className="flex items-center space-x-2">
        {showAddress && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {formatAddress(address)}
            </span>
          </div>
        )}
        <button
          className={buttonClasses}
          onClick={handleClick}
          title="Disconnect wallet"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Disconnect
        </button>
      </div>
    );
  }

  // Disconnected state
  return (
    <div className="space-y-2">
      <button
        className={buttonClasses}
        onClick={handleClick}
        disabled={isConnecting}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Connect Wallet
      </button>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}
    </div>
  );
}

// Compact wallet button for navigation
export function CompactWalletButton({ className = '' }: { className?: string }) {
  return (
    <WalletButton
      size="sm"
      variant="outline"
      className={className}
      showAddress={true}
      showBalance={false}
    />
  );
}

// Hero wallet button for main CTAs
export function HeroWalletButton({ className = '' }: { className?: string }) {
  return (
    <WalletButton
      size="lg"
      variant="primary"
      className={className}
      showAddress={false}
      showBalance={false}
    />
  );
} 