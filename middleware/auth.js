const jwt = require('jsonwebtoken');
const db = require('../models/database');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) return res.status(401).json({ error: 'No API key provided' });

    db.get(
        'SELECT * FROM api_keys WHERE api_key = ? AND is_active = 1',
        [apiKey],
        (err, row) => {
            if (err || !row) return res.status(401).json({error: 'Invalid or inactive API key'});
            req.apiKey = row;
            db.run(
                'UPDATE api_keys SET usage_count = usage_count + 1, last_used = CURRENT_TIMESTAMP WHERE id = ?',
                [row.id]
            );
            next();
        }
    );
};

module.exports = { verifyToken, verifyApiKey };