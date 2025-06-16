"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.get('/', (req, res) => {
    res.json({
        name: 'CryptoSupermarket API',
        version: '1.0.0',
        description: 'DeFi education simulator API for wallet analysis and portfolio management',
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
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'crypto-supermarket-api',
    });
});
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from CryptoSupermarket API!' });
});
app.post('/api/ai/analyze-portfolio', (req, res) => {
    res.json({ message: 'Portfolio analysis endpoint - coming soon!' });
});
app.post('/api/ai/chat', (req, res) => {
    res.json({ message: 'AI chat endpoint - coming soon!' });
});
app.post('/api/wallet/analyze', (req, res) => {
    res.json({ message: 'Wallet analysis endpoint - coming soon!' });
});
app.get('/api/market/prices', (req, res) => {
    res.json({ message: 'Market prices endpoint - coming soon!' });
});
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development'
            ? err.message
            : 'Something went wrong',
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`,
    });
});
app.listen(PORT, () => {
    console.log(`🚀 CryptoSupermarket API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
//# sourceMappingURL=index.js.map