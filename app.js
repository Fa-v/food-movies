const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config');
const setupController = require('./controllers/setupController');
const apiController = require('./controllers/apiController');
const server = require('./server');

const port = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '/public')));

mongoose.connect(config.getDbconnectionString());
setupController(app);
apiController(app);

app.listen(port, () => {
  console.log(`Server started and listening on ${port}`);
});