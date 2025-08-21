// server.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// Routes
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

const app = express();
const httpServer = createServer(app);

// ✅ Setup CORS (React frontend connection)
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const io = new SocketIOServer(httpServer, {
  cors: { origin: allowedOrigin, methods: ['GET', 'POST'] },
});

// ✅ Middleware
app.use((req, _res, next) => { req.io = io; next(); });
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// ✅ Razorpay webhook must use raw body (before json())
app.use('/orders/webhook', express.raw({ type: 'application/json' }));

// ✅ API Routes
app.use('/products', productRoutes);   // → GET /products, etc.
app.use('/orders', orderRoutes);       // → POST /orders, etc.

// ✅ Socket.IO (for live cart/order updates if needed)
io.on('connection', (socket) => {
  console.log('⚡ New client connected:', socket.id);

  socket.on('join', (room) => {
    console.log(`📌 Client ${socket.id} joined room ${room}`);
    socket.join(room);
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// ✅ Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () =>
      console.log(`🚀 API running on http://localhost:${port}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));
