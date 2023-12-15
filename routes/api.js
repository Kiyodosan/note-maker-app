const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../db/db.json'));
});

router.post('/notes', (req, res) => {
  const { title, text } = req.body;

  if (req.body && title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4()
    }

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
  
        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2), (writeErr) => writeErr ? console.error(writeErr) : null);
      }
    });

    res.status(201).end();
  } else {
    res.status(500).json('Error occured while posting note');
  }
});

router.delete('/notes/:note_id', (req, res) => {
  const reqDelNote = req.params.note_id;

  if (reqDelNote) {
    let isFound = false;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);

        for (let i = 0; i < parsedNotes.length; i++) {
          if (reqDelNote === parsedNotes[i].note_id) {
            parsedNotes.splice(i, 1);
            fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 2), (writeErr) => writeErr ? console.error(writeErr) : null);
            isFound = true;
            res.end();
            break;
          }
        }
      }
      isFound ? null : res.status(404).json('404: File not found');
    });
  } else {
    res.status(400).json('400: note_id not provided');
  }
});

module.exports = router;