# 🚀 CryptoSupermarket - DeFi Education Simulator

> **Hackathon MVP**: A DeFi education simulator that safely onboards crypto novices through AI-powered learning and risk-free portfolio experimentation.

[![CI/CD Pipeline](https://github.com/Gudakesh15/crypto-supermarket/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Gudakesh15/crypto-supermarket/actions/workflows/ci-cd.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4)](https://tailwindcss.com/)

## 🎯 Mission

Bridge the gap between crypto curiosity and DeFi confidence by providing:
- **Safe Learning Environment**: Risk-free portfolio experimentation 
- **AI-Powered Guidance**: Personalized recommendations and education
- **Real Wallet Integration**: Connect your actual wallet for personalized analysis
- **Simplified UX**: No jargon, just clear value propositions

## ✨ MVP Features

### 🔥 **Fully Functional Core Features**
- **✅ Real Wallet Connection & AI Portfolio Analysis**
  - Connect MetaMask for personalized recommendations based on actual holdings
  - AI analyzes your crypto portfolio composition and risk profile
  - Get tailored index recommendations for your specific situation

- **✅ Three Index Products (Simulated)**
  - **Stablecoin LP Index**: Low-volatility yields (Curve, Aave, Balancer)
  - **Crypto Asset Index**: Growth-oriented basket (BTC, ETH, SOL)
  - **Hybrid Index**: Balanced risk/return (50% stables, 50% growth)

- **✅ Educational AI Assistant**
  - Interactive chatbot with personalized DeFi education
  - Explains concepts based on your actual holdings
  - Answers questions like "What is a liquidity pool?" with context

- **✅ Portfolio Builder & Simulator**
  - Real-time simulation using actual wallet amounts
  - Historical performance visualization
  - Compare current vs. optimized allocations

### 🎨 **Demo-Only Advanced Features**
- Multi-chain portfolio expansion (Polygon, Solana, BNB)
- Social features (.super identity, community discussions)
- Investment mode toggle (real money integration preview)
- Advanced AI market sentiment analysis

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.3.3** with App Router and Turbopack
- **TypeScript** for type safety
- **TailwindCSS v4** for modern styling
- **ethers.js** for Web3 wallet integration

### **Backend**
- **Node.js + Express** with TypeScript
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Morgan for request logging
- **Environment**: dotenv for configuration

### **AI Integration**
- **OpenAI API** (GPT-4o-mini) for cost-effective text generation
- **Personalized analysis** based on actual wallet holdings

### **Blockchain**
- **Ethereum Mainnet** balance reading
- **Web3Modal** for wallet connections (MetaMask, WalletConnect)
- **ERC-20 tokens**: USDC, USDT, WBTC support

### **DevOps**
- **GitHub Actions** CI/CD pipeline
- **Vercel** deployment for frontend
- **ESLint + Prettier** for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- MetaMask wallet (for testing)

### 1. Clone & Install
```bash
git clone git@github.com:Gudakesh15/crypto-supermarket.git
cd crypto-supermarket
npm install
```

### 2. Environment Setup
```bash
# Create environment file for API keys (when needed)
cp .env.example .env

# Add your API keys (optional for basic development)
echo "OPENAI_API_KEY=your_openai_key_here" >> .env
echo "COINGECKO_API_KEY=your_coingecko_key_here" >> .env
```

### 3. Start Development Servers
```bash
# Terminal 1: Frontend (http://localhost:3000)
npm run dev

# Terminal 2: Backend (http://localhost:3001)  
npm run dev:backend
```

### 4. Verify Setup
- **Frontend**: Visit http://localhost:3000
- **Backend**: Visit http://localhost:3001 (should show API documentation)
- **Health Check**: `curl http://localhost:3001/health`

## 📁 Project Structure

```
crypto-supermarket/
├── 📱 Frontend (Next.js)
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   └── page.tsx        # Main page component
│   │   ├── components/          # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API clients & services
│   │   ├── types/              # TypeScript definitions
│   │   └── utils/              # Helper functions
│   ├── public/                 # Static assets
│   └── package.json
│
├── 🔧 Backend (Express)
│   ├── backend/
│   │   ├── src/
│   │   │   └── index.ts        # Express server
│   │   ├── dist/               # Compiled JavaScript
│   │   └── tsconfig.json
│   
├── 🚀 DevOps
│   ├── .github/workflows/      # CI/CD pipelines
│   ├── .gitignore              # Git exclusions
│   ├── .prettierrc             # Code formatting
│   └── eslint.config.mjs       # Linting rules
│
└── 📚 Documentation
    ├── README.md               # This file
    └── vercel.json             # Deployment config
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run dev:backend      # Start backend dev server

# Building
npm run build            # Build frontend for production
npm run build:backend    # Compile backend TypeScript

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run format:check     # Check Prettier formatting

# Testing
npm run type-check       # TypeScript type checking
```

## 🌐 API Endpoints

### **Core Endpoints**
- `GET /` - API documentation and service info
- `GET /health` - Health check endpoint
- `GET /api/hello` - Basic connectivity test

### **Planned Endpoints** (Implementation Ready)
- `POST /api/ai/analyze-portfolio` - AI portfolio analysis
- `POST /api/ai/chat` - Educational AI assistant
- `POST /api/wallet/analyze` - Wallet balance analysis  
- `GET /api/market/prices` - Token price data

## 👥 Team Collaboration

### **Getting Started as a Team Member**
1. **Clone the repo** and follow Quick Start guide
2. **Create feature branch**: `git checkout -b feature/your-feature-name`
3. **Make changes** and test locally
4. **Commit with clear messages**: `git commit -m "feat: add wallet connection component"`
5. **Push and create PR**: `git push origin feature/your-feature-name`

### **Development Workflow**
- **Main branch**: Protected, auto-deploys to production
- **Feature branches**: Create for each new feature/bug fix
- **Code review**: Required before merging to main
- **CI/CD**: Automatic testing and deployment on merge

### **Code Standards**
- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Must pass linting checks
- **Prettier**: Auto-formatting on commit
- **Conventional Commits**: Use conventional commit format

## 🚦 Deployment

### **Automatic Deployment**
- **Frontend**: Auto-deploys to Vercel on main branch push
- **Backend**: Ready for deployment to Railway/Heroku/AWS
- **CI/CD**: GitHub Actions handles testing and deployment

### **Manual Deployment**
```bash
# Frontend to Vercel
npx vercel --prod

# Backend (configure based on your hosting provider)
npm run build:backend
# Deploy dist/ folder to your hosting service
```

## 🎯 Hackathon Strategy

### **Day 1 Focus**
- ✅ Project setup (COMPLETED)
- ✅ Basic wallet connection
- ✅ AI integration setup

### **Day 2-3 Focus**
- 🔄 Implement AI portfolio analysis
- 🔄 Create index product interfaces  
- 🔄 Build portfolio simulator
- 🔄 Add demo-only advanced features

### **Demo Strategy**
1. **Lead with working features**: Wallet connection + AI analysis
2. **Show real wallet integration**: Live demo with actual MetaMask
3. **Present future vision**: Demo-only features showcase roadmap
4. **Emphasize education-first approach**: Safe learning before investing

## 🔐 Security & Privacy

- ✅ **No secrets in repository**: All API keys use environment variables
- ✅ **Read-only wallet access**: No transaction capabilities
- ✅ **Privacy-focused**: No wallet address storage or logging
- ✅ **Secure CI/CD**: GitHub secrets for deployment tokens

## 🤝 Contributing

We welcome hackathon team members! Please:

1. Read this README completely
2. Set up your development environment
3. Check existing issues and PRs
4. Create feature branch for your work
5. Test thoroughly before submitting PR
6. Follow code standards and commit conventions

## 📄 License

MIT License - feel free to use this project as a foundation for your own DeFi education tools.

## 🆘 Getting Help

- **Setup Issues**: Check the Quick Start section
- **API Questions**: Visit http://localhost:3001 for API docs
- **Team Chat**: Use your hackathon communication channel
- **Code Issues**: Create a GitHub issue with details

---

**Built with ❤️ for DeFi education and crypto onboarding**

*Ready to bridge the gap between crypto curiosity and DeFi confidence!* 🚀
