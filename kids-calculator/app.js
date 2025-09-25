// app.js - simple Express server for kids calculator
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// parse urlencoded form bodies (from HTML forms)
app.use(express.urlencoded({ extended: false }));

// serve static files (CSS, client images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// set EJS as view engine and point to views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Render form initially (GET /)
app.get('/', (req, res) => {
  res.render('index', {
    result: null,
    error: null,
    inputs: { num1: '', num2: '', op: 'add' }
  });
});

// Handle form submit (POST /calculate)
app.post('/calculate', (req, res) => {
  const { num1 = '', num2 = '', operation = 'add' } = req.body;

  // normalize user input: trim, accept comma as decimal separator
  const n1Raw = String(num1).trim().replace(',', '.');
  const n2Raw = String(num2).trim().replace(',', '.');

  const a = parseFloat(n1Raw);
  const b = parseFloat(n2Raw);

  let result = null;
  let error = null;

  // validation
  if (n1Raw === '' || n2Raw === '') {
    error = 'Both numbers are required.';
  } else if (!isFinite(a) || !isFinite(b)) {
    // covers letters, empty strings after parse, Infinity, NaN
    error = 'Please enter valid numbers (no letters or symbols).';
  } else {
    // perform selected operation
    switch (operation) {
      case 'add':
        result = a + b;
        break;
      case 'subtract':
        result = a - b;
        break;
      case 'multiply':
        result = a * b;
        break;
      case 'divide':
        if (b === 0) {
          error = 'Cannot divide by zero.';
        } else {
          result = a / b;
        }
        break;
      default:
        error = 'Unknown operation.';
    }
  }

  // render same page with result or error and keep the inputs so user can fix them
  res.render('index', {
    result,
    error,
    inputs: { num1, num2, op: operation }
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Calculator app listening at http://localhost:${PORT}`);
});


