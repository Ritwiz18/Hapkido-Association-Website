const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || 'mysql',
  user:     process.env.DB_USER     || 'hapkido_user',
  password: process.env.DB_PASSWORD || 'hapkido_pass',
  database: process.env.DB_NAME     || 'hapkido_db',
  port:     process.env.DB_PORT     || 3306,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Retry until MySQL is ready (Docker startup delay)
async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await pool.getConnection();
      console.log('✅ MySQL connected successfully');
      conn.release();
      return;
    } catch (err) {
      console.log(`⏳ Waiting for MySQL... attempt ${i + 1}/${retries}`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
  throw new Error('❌ Could not connect to MySQL after multiple attempts');
}

module.exports = { pool, connectWithRetry };
