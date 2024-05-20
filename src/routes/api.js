const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.json({ message: 'Hello, World! at root level' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;