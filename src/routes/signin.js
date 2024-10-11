const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('pages/signin/index', { title: 'Sign In' });
});

module.exports = router;
