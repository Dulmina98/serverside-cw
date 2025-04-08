const db = require('./models/database');

db.serialize(() => {
    db.all('SELECT name FROM sqlite_master WHERE type="table"', (err, tables) => {
        if (err) {
            console.error('Error querying tables:', err);
        } else {
            console.log('Tables in database:', tables);
        }
        db.close();
    });
});