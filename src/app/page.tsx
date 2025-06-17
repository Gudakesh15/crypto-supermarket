import React from 'react';
import { WalletButton, CompactWalletButton } from '../components/wallet/WalletButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                CryptoSupermarket
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <CompactWalletButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Learn DeFi Through
            <span className="text-blue-600"> AI-Powered Guidance</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Safe onboarding to crypto through education, simple tools, and risk-free portfolio experimentation.
          </p>

          {/* Dual Entry Points - Core Architecture Feature */}
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center sm:space-x-6">
            {/* Educator Agent Entry Point */}
            <div className="space-y-4 sm:space-y-0 sm:mx-0">
              <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                🎓 Learn About Crypto
                <div className="ml-2 text-xs bg-green-500 px-2 py-1 rounded-full">
                  FREE
                </div>
              </button>
              <p className="text-sm text-gray-500">
                Instant AI responses • No wallet needed
              </p>
            </div>

            {/* Strategist Agent Entry Point - Wallet Gated */}
            <div className="space-y-4 sm:space-y-0 sm:mx-0 mt-6 sm:mt-0">
              <div className="relative">
                <WalletButton
                  size="lg"
                  variant="primary"
                  className="w-full bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                />
                <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  PREMIUM
                </div>
              </div>
              <p className="text-sm text-gray-500">
                📊 Analyze My Portfolio
              </p>
              <p className="text-xs text-gray-400">
                Advanced AI analysis • Wallet required
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Two AI Agents, Optimized for Your Needs
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Educator Agent Features */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-green-600 text-xl mb-4">🎓 Educator Agent</div>
                <h3 className="text-lg font-semibold mb-3">Free Education</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Sub-second response times</li>
                  <li>• DeFi concept explanations</li>
                  <li>• No wallet connection needed</li>
                  <li>• Voice-powered learning</li>
                </ul>
              </div>

              {/* Strategist Agent Features */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-blue-600 text-xl mb-4">📊 Strategist Agent</div>
                <h3 className="text-lg font-semibold mb-3">Portfolio Analysis</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li>• Real wallet analysis</li>
                  <li>• Personalized recommendations</li>
                  <li>• Market research insights</li>
                  <li>• Complex AI processing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Achievement Demo */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Dual Agent Architecture Benefits
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">Latency Optimization</h4>
                <p className="text-gray-600">Educational queries get instant responses while complex analysis gets proper processing time</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Resource Efficiency</h4>
                <p className="text-gray-600">Backend only triggered when needed, keeping costs low and performance high</p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Clear Value</h4>
                <p className="text-gray-600">Natural freemium model with obvious premium feature benefits</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-500">
            <p>CryptoSupermarket - DeFi Education Simulator</p>
            <p>Wallet connection testing: {typeof window !== 'undefined' ? 'Ready' : 'Server-side'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
