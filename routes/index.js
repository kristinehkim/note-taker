const router = require('express').Router();
// importing the routes files - bundling them here in an index.js file the when it is required in the server.js file (it looks for an index.js) and we get them all
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);// this has two inputs in the parenthesis - '/api' which is the prefix we're adding to each route and apiRoutes which is the data or routes we are using
router.use('/', htmlRoutes);// The route that has * should be the last one
// if these were reverse, the /api would send up to that index.html because of the * it falls under anything and everything and wouldn't transfer data

module.exports = router;
