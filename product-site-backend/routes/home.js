const express = require('express');
const router = express.Router();
const { getHome } = require('../controllers/homeController');

// Define the home route
router.get('/', getHome);

module.exports = router;
