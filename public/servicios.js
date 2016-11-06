function postMovieData(movieObject) {
  //posting input data to the json server
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/films",
    data: movieObject,
    contentType: "application/json"
  }).done(updateMovieList);
}

function getMovieData() {
  //getting film data from the server
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/films"
  }).done(createMovieList);
}

function modifyMovieData(id, modifiedMovieObject) {
  //modifying film data on the server
  $.ajax({
    method: "PUT",
    url: "http://localhost:3000/films/" + id,
    data: modifiedMovieObject,
    contentType: "application/json"
  }).done(modifyRowContent);
}


function deleteMovieData(id) {
  //deleting film data from the server
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3000/films/" + id
  }).done(deleteRow);
}

