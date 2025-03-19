var express = require("express")
const path = require('path');
var app = express()
var port = process.env.port || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));



app.post('/api/addition', (req, res) => {
  const { number1, number2 } = req.body;

  if (typeof number1 !== 'number' || typeof number2 !== 'number') {
    return res.status(400).json({ error: 'Only numbers are allowed!!' });
  }

  const sum = number1 + number2;
  res.json({ sum });
});


// Additional example endpoint to check server health
app.get('/health', (req, res) => {
  res.send('Server is healthy!');
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

