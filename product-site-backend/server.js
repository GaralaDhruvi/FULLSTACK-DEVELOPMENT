const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const homeRoutes = require('./routes/home');

// Middleware for JSON parsing (optional, good for future features)
app.use(express.json());

// Use routes
app.use('/', homeRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});
