const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// API route to handle calculator operations
app.post('/api/calculate', (req, res) => {
  const { number1, number2, operation } = req.body;

  if (typeof number1 !== 'number' || typeof number2 !== 'number') {
    return res.status(400).json({ error: 'Inputs must be numbers.' });
  }

  let result;

  switch (operation) {
    case 'add':
      result = number1 + number2;
      break;
    case 'subtract':
      result = number1 - number2;
      break;
    case 'multiply':
      result = number1 * number2;
      break;
    case 'divide':
      if (number2 === 0) {
        return res.status(400).json({ error: 'Cannot divide by zero.' });
      }
      result = number1 / number2;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operation type.' });
  }

  res.json({ result });
});

// Health check
app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
