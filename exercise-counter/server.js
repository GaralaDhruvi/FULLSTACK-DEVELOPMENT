const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let count = 0; // Persistent in-memory storage

app.get('/count', (req, res) => {
  res.json({ count });
});

app.post('/increment', (req, res) => {
  count++;
  res.json({ count });
});

app.post('/decrement', (req, res) => {
  count = count > 0 ? count - 1 : 0;
  res.json({ count });
});

app.post('/reset', (req, res) => {
  count = 0;
  res.json({ count });
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
