var Movie = require('../models/movie-model');

//app is the express app
module.exports = function(app) {
  //setting an endpoint where the setup movies live
  app.get('/api/setupMovie', function(request, response) {
    //seed database
    var starterMovie = [{"title":"","director":"Peter Greenaway","date":2000,"synopsis":"A Black comedy where costumes adapt to the colors of their rooms, and the principle self-appointed gourmet of French cuisine is a repulsive oaf of a man.",},{"title":"Like Water For Chocolate","director":"Alfonso Arau","date":1992,"synopsis":"The story of a Tita, a young girl in revolutionary Mexico who is condemned by a family tradition to remain single."},{"title":"Ratatouille","director":"Brad Bird","date":2007,"synopsis":"It’s a glorious, sad testament to the power of invention and the folly and pleasure to be taken in great food, great conversation and the belief in one’s own passion."},{"title":"Willy Wonka and the Chocolate Factory","director":"Mel Stuart","date":1971,"synopsis":"A poor boy wins a chance to visit the most glorious chocolate factory ever imagined by mere human minds."},{"title":"Julie & Julia","director":"Nora Ephron","date":2009,"synopsis":"The drool-worthy retelling of one woman’s attempt to cook through Julia Child’s Mastering the Art of French Cooking."},{"title":"Cloudy With A Chance Of Meatballs","director":"Phil Lord, Christopher Miller","date":2009,"synopsis":"Misfit scientist Flint Lockwood (Bill Hader) has created a machine to turn water into food, which goes haywire when it starts converting the water in the atmosphere: It starts raining food!"}];

    Movie.create(starterMovie, function(error, results){
      response.send(results);
    });

  });
}