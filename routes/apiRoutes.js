const router = require('express').Router();
const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
// res.json(db)
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

router.get('/notes/:id', (req, res) => {
    const notesId = req.params.notes_id;
    // console.log(req.params.notes_id);
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.notes_id === notesId);
        return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');
    });
});

router.delete('/notes/:id', (req, res) => {
    const notesId = req.params.notes_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.notes_id !== notesId);
        writeToFile('./db/db.json', result);
        res.json(`Note ${notesId} has been deleted`);
    });
});

router.post('/notes', (req, res) => {
    const { title, text } = req.body
    if (req.body) {
    const newNote = { 
        title,
        text,
        notes_id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully!`);
} else {
    res.error('Error in adding note');
}
});
module.exports = router;