const express = require('express');
const routes = require('./routes');// our routes in one bundle - There is a nuance in JS where when you require a folder it looks  specifically for an index.js file.  This will look specifically for an index.js file

// looks for if Heroku or environment is providing a part and if not then it uses 3001
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes); // using the routes from the index.js file both apiRoutes and htmlRoutes

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

