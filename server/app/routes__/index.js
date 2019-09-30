// lib
const express = require('express');
const router = express.Router();

// src
const portfolios = require('./portfolios/portfolios.js');
const blogs = require('./blogs/blogs.js');

router.use('/portfolios', portfolios);
router.use('/blogs/create/', blogs);

module.exports = router;
