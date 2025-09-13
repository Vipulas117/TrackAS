@@ .. @@
-import pkg from 'pg'; const { Pool } = pkg;
-const pool = new Pool({ connectionString: process.env.DATABASE_URL || 'postgres://trackas:trackas@db:5432/trackas' });
-export function query(text, params){ return pool.query(text, params); }
+import pkg from 'pg';
+import dotenv from 'dotenv';
+
+dotenv.config();
+
+const { Pool } = pkg;
+
+const pool = new Pool({
+  connectionString: process.env.DATABASE_URL || 'postgres://trackas:trackas@localhost:5432/trackas',
+  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
+  max: 20,
+  idleTimeoutMillis: 30000,
+  connectionTimeoutMillis: 2000,
+});
+
+// Test database connection
+pool.on('connect', () => {
+  console.log('✅ Connected to PostgreSQL database');
+});
+
+pool.on('error', (err) => {
+  console.error('❌ Database connection error:', err);
+});
+
+export async function query(text, params) {
+  const start = Date.now();
+  try {
+    const res = await pool.query(text, params);
+    const duration = Date.now() - start;
+    console.log('📊 Query executed', { text: text.substring(0, 50) + '...', duration, rows: res.rowCount });
+    return res;
+  } catch (error) {
+    console.error('❌ Database query error:', error);
+    throw error;
+  }
+}
+
+export default pool;