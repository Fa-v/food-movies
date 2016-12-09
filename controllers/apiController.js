const Movie = require('../models/movie-model');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/api/films', (request, response) => {
    Movie.find({}, (error, films) => {
      if (error) throw error;
      response.send(films);
    });
  });

  app.get('/api/films/:id', (request, response) => {
    Movie.findById({_id: request.params.id}, (error, film) => {
      if(error) throw error;
      response.send(film);
    });
  });

  app.put('/api/films/:id', (request, response) => {
    if(request.params.id) {
      Movie.findByIdAndUpdate(request.params.id, {
        title: request.body.title,
        director: request.body.director,
        date: request.body.date,
        synopsis: request.body.synopsis
      }, {new: true}, (error, film) => {
        if(error) throw error;
        console.log('modified film?', film);
        response.send(film);
      });
    }
  });

  app.post('/api/films/', (request, response) => {
    var newMovie = Movie({
      title: request.body.title,
      director: request.body.director,
      date: request.body.date,
      synopsis: request.body.synopsis
    });
    
    newMovie.save((error) => {
      if(error) throw error;
      response.send(newMovie);
    });
  });

  app.delete('/api/films/:id', (request, response) => {
    Movie.findByIdAndRemove(request.params.id, (error) => {
      if(error) throw error;
      response.send('Deleted');
    });
  });
}