const express = require('express');
const { verifyToken } = require('../middleware/auth');
const db = require('../models/database');
const crypto = require('crypto');
const router = express.Router();

router.get('/', verifyToken, (req, res) => {
    db.all(
        'SELECT id, api_key, created_at, last_used, usage_count, is_active FROM api_keys WHERE user_id = ?',
        [req.user.id],
        (err, keys) => {
            if (err) return res.status(500).json({error: 'Database error'});
            res.json({keys});
        }
    );
});

router.post('/keys/generate', verifyToken, (req, res) => {
    const apiKey = crypto.randomBytes(16).toString('hex');
    db.run(
        'INSERT INTO api_keys (user_id, api_key) VALUES (?, ?)',
        [req.user.id, apiKey],
        (err) => {
            if (err) return res.status(500).json({error: 'Failed to generate key'});
            res.json({message: 'Key generated'});
        }
    );
});

router.post('/keys/:id/revoke', verifyToken, (req, res) => {
    db.run(
        'UPDATE api_keys SET is_active = 0 WHERE id = ? AND user_id = ?',
        [req.params.id, req.user.id],
        (err) => {
            if (err) return res.status(500).json({error: 'Failed to revoke key'});
            res.json({message: 'Key revoked'});
        }
    );
});

module.exports = router;