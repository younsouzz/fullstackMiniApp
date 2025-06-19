const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, 'messages.json');

app.use(cors());
app.use(express.json());

// Fonction pour lire les messages depuis le fichier
async function readMessages() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erreur lecture messages:', err);
    return [];
  }
}

// Fonction pour écrire les messages dans le fichier
async function writeMessages(messages) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Erreur écriture messages:', err);
  }
}

// GET: retourner tous les messages
app.get('/messages', async (req, res) => {
  const messages = await readMessages();
  res.json(messages);
});

// POST: ajouter un nouveau message
app.post('/messages', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const messages = await readMessages();
  const newMessage = { text, timestamp: new Date().toISOString() };
  messages.push(newMessage);

  await writeMessages(messages);
  res.status(201).json({ message: 'Message added' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend avec fichier JSON en écoute sur http://localhost:${PORT}`);
});
