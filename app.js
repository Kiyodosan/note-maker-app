const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');

// Modified port 3005 for Heroku
const PORT = process.env.PORT || 3005;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
  console.log(`Now serving static files from public folder. Listening on port ${PORT}`)
);