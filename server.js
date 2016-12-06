//imported modules
var express = require('express');
var _ = require('lodash');
//node modules
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var cineDataPath = path.join(__dirname, 'cine.json');

var app = express();

var getFilmArrayLength = function() {
  var cineJsonFile = require('./cine.json');
  return cineJsonFile.films.length;
};

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.send()
});

app.get('/films', function(request, response) {
  var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  response.sendFile('cine.json', options);
});

app.post('/films', function(request, response) {
  var cineJsonFile = require('./cine.json'),
    movieObject = request.body;

  _.extend(movieObject, {id: getFilmArrayLength() + 1});

  cineJsonFile.films.push(movieObject);

  fs.writeFile(cineDataPath, JSON.stringify(cineJsonFile), function (error) {
    console.error(error);
  });

  response.json(movieObject);
});

app.delete('/films/:id', function(request, response) {
  var cineData = require('./cine.json'),
    id = request.params.id;

  cineData.films = _.filter(cineData.films, function(movie) {
    return movie.id != id;
  });

  fs.writeFile(cineDataPath, JSON.stringify(cineData), function(error) {
    console.error(error);
  });

  response.send('Movie object with the id: ' + id + ' has been deleted.');
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
