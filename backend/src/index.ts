import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    name: 'CryptoSupermarket API',
    version: '1.0.0',
    description:
      'DeFi education simulator API for wallet analysis and portfolio management',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      api: {
        hello: 'GET /api/hello',
        portfolio_analysis: 'POST /api/ai/analyze-portfolio',
        ai_chat: 'POST /api/ai/chat',
        wallet_analysis: 'POST /api/wallet/analyze',
        market_prices: 'GET /api/market/prices',
      },
    },
    frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'crypto-supermarket-api',
  });
});

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from CryptoSupermarket API!' });
});

// AI endpoints placeholder
app.post('/api/ai/analyze-portfolio', (req, res) => {
  // TODO: Implement AI portfolio analysis
  res.json({ message: 'Portfolio analysis endpoint - coming soon!' });
});

app.post('/api/ai/chat', (req, res) => {
  // TODO: Implement AI chat functionality
  res.json({ message: 'AI chat endpoint - coming soon!' });
});

// Wallet endpoints placeholder
app.post('/api/wallet/analyze', (req, res) => {
  // TODO: Implement wallet analysis
  res.json({ message: 'Wallet analysis endpoint - coming soon!' });
});

// Market data endpoints placeholder
app.get('/api/market/prices', (req, res) => {
  // TODO: Implement market data fetching
  res.json({ message: 'Market prices endpoint - coming soon!' });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message:
        process.env.NODE_ENV === 'development'
          ? err.message
          : 'Something went wrong',
    });
  }
);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CryptoSupermarket API server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(
    `🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`
  );
});
