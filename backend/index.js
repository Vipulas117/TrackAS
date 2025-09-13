@@ .. @@
 import express from 'express';
 import cors from 'cors';
 import bodyParser from 'body-parser';
+import dotenv from 'dotenv';
 import auth from './routes/auth.js';
 import shipments from './routes/shipments.js';
 import payments from './routes/payments.js';
 import ai from './routes/ai.js';
 import faqs from './routes/faqs.js';
 import tickets from './routes/tickets.js';
 import admin from './routes/admin.js';
+
+dotenv.config();
+
 const app = express();
-app.use(cors()); app.use(bodyParser.json());
+
+// Middleware
+app.use(cors({
+  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
+  credentials: true
+}));
+app.use(bodyParser.json());
+app.use(bodyParser.urlencoded({ extended: true }));
+
+// Health check endpoint
+app.get('/health', (req, res) => {
+  res.json({ status: 'OK', timestamp: new Date().toISOString() });
+});
+
+// API routes
 app.use('/api/auth', auth);
 app.use('/api/shipments', shipments);
 app.use('/api/payments', payments);
 app.use('/api/ai', ai);
 app.use('/api/faqs', faqs);
 app.use('/api/tickets', tickets);
 app.use('/api/admin', admin);
+
+// Error handling middleware
+app.use((err, req, res, next) => {
+  console.error(err.stack);
+  res.status(500).json({ 
+    error: 'Something went wrong!',
+    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
+  });
+});
+
+// 404 handler
+app.use('*', (req, res) => {
+  res.status(404).json({ error: 'Route not found' });
+});
+
 const port = process.env.PORT || 4000;
-app.listen(port, ()=> console.log('TrackAS backend running on', port));
+app.listen(port, () => {
+  console.log(`🚀 TrackAS backend running on port ${port}`);
+  console.log(`📊 Health check: http://localhost:${port}/health`);
+  console.log(`🔗 API base URL: http://localhost:${port}/api`);
+});