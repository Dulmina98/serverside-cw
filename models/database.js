const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../data/countries.db'), (err) => {
    if (err) console.error('Database connection error:', err);
    else console.log('Connected to SQLite database');
});

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
    db.run(`
    CREATE TABLE IF NOT EXISTS api_keys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      api_key TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_used DATETIME,
      usage_count INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
    const testApiKey = 'test-api-key-12345';
    db.get('SELECT api_key FROM api_keys WHERE api_key = ?', [testApiKey], (err, row) => {
        if (err) {
            console.error('Error checking API key:', err);
        } else if (!row) {
            // Insert only if it doesn’t exist
            db.run('INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)', [1, testApiKey], (err) => {
                if (err) {
                    console.error('Error inserting API key:', err);
                } else {
                    console.log('Test API key inserted');
                }
            });
        } else {
            console.log('Test API key already exists');
        }
    });
});

module.exports = db;