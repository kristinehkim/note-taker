// HTML routes to serve different HTML files
const router = require('express').Router();// This lets you bundle routes together and use them as one object
const path = require('path');

// GET Route for notes page - defining the route and calling it in the index.js file
// req - when /notes route is requested you, res - give me notes.html
// defining the route doesn't know who or where it is called - I give you x, you give me y (req, res) 
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// GET Route for homepage - defining the route
// * means anything and everything - this is the catch all
// req - whatever the route is, res - give me the index.html page
// the Get Started button on this page has href="/notes" index.html that takes you to the /notes route
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/index.html'))
);
module.exports = router
// taking htmlRoutes.js and putting it in index.js and export/import it into server.js