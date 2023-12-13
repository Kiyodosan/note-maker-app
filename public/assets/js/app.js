const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = 3005;

const savedNotes = require('../../../db/db.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
}); */

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(savedNotes);
  // res.sendFile(path.join(__dirname, '../../../db/db.json'));
  res.status(200);
});

app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;

  if (req.body && title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4()
    }
  }

  fs.readFile('../../../db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedNotes = JSON.parse(data);
      parsedNotes.push(newNote);

      fs.writeFile('../../../db/db.json', JSON.stringify(parsedNotes, null, 2), (writeErr) => console.error(writeErr));
    }
  });

/*   const response = {
    status: 'success',
    body: newNote
  }; */
  res.status(201);
});

app.delete('/api/notes/:note_id', (req, res) => {
  const reqDelNote = req.params.note_id;
  
  for (const i = 0; i < savedNotes.length; i++) {
    if (reqDelNote === savedNotes[i].note_id) {
      fs.readFile('../../db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
          parsedNotes.splice(i, 1);

          fs.writeFile('../../../db/db.json', JSON.stringify(parsedNotes, null, 2), (writeErr) => console.error(writeErr));
        }
      });
    }
  }

  // Need to find correct status code for DELETE route (probs not 200)
  res.status(200);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

app.listen(PORT, () =>
  console.log(`Now serving static files from public folder. Listening on port ${PORT}`)
);