const express = require('express');
const app = express();
const path = require('path');
const PORT = 3005;

app.use(express.static('public'));

app.get('/', (req, res) => {
  // Figure out (test) why it's /public/ instead of /public
  res.sendFile(path.join(__dirname, '/public/'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/notes.html'));
});

app.get('/api/notes', (req, res) => {
  // Check if this file path for db.json works. Might need to use ../db/db.json instead
  res.sendFile(path.join(__dirname, '/db/db.json'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(PORT, () =>
  console.log(`Now serving static files from public folder. Listening on port ${PORT}`)
);