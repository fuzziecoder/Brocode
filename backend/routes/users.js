const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { userId, email, password } = req.body;
    if (!/^@[a-zA-Z0-9_]{3,}$/.test(userId)) {
      return res.status(400).json({ error: 'Invalid userId format. Must start with @ and be at least 3 characters.' });
    }
    const user = new User({ userId, email, password });
    await user.save();
    res.status(201).json({ message: 'User created', userId: user.userId });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: 'UserId or email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Search users by userId (case-insensitive, partial match)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query required' });
    const users = await User.find({ userId: { $regex: q, $options: 'i' } }, 'userId email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
