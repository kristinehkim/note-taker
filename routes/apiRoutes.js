// API routes generally to transfer data
const router = require('express').Router();// This lets you bundle routes together and use them as one object
// const db = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// defining the route
router.get('/notes', (req, res) => {// req is really /api/notes to respond with database notes
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));// JSON file is an array of objects
});
// we don't need /api/ for any of these routes because it is coming from the apiRoutes bundle and the prefix is started there in index.js

// GET Route for a specific note based on the provided id parameter
router.get('/notes/:id', (req, res) => {
    const notesId = req.params.id;
    // console.log(req.params.notes_id);
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter((notes) => notes.id === notesId);
        return result.length > 0
        ? res.json(result)
        : res.json('No notes with that ID');
    });
});

// DELETE Route for a specific note with specified id
router.delete('/notes/:id', (req, res) => {
    const notesId = req.params.id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        //  Make a new array of all the tips except (!==) the one with the ID provided in the URL
        const result = json.filter((notes) => notes.id !== notesId);
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
        // Respond to the delete request
        res.json(`Note ${notesId} has been deleted 🗑️`);
    });
});

// POST because we are creating something new
router.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body called object destructuring
    const { title, text } = req.body // extracts the title and text from req.body
    // console.log(req.body) // to find out what it logs (the properties)
    // If all the required properties are present
    if (req.body) {
        // Variable for the object we will save
    const newNote = { 
        title,
        text,
        id: uuidv4(),
    };
    readAndAppend(newNote, './db/db.json');// appends the newNote to the JSON file
    res.json(`Note added successfully!`);
} else {
    res.error('Error in adding note');
}
});
module.exports = router;
// taking apiRoutes.js and putting it in index.js and export/import it into server.js