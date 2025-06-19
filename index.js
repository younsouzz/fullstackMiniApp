const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let messages = [];

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const { text } = req.body;
  if (text) {
    messages.push({ text, timestamp: new Date().toISOString() });
    res.status(201).json({ message: 'Message added' });
  } else {
    res.status(400).json({ error: 'Text is required' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
