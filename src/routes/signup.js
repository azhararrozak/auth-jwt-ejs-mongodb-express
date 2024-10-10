const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    res.render('signup/index', { title: 'Sign Up' });
});

module.exports = router;
