function postMovieData(movieObject) {
  //posting input data to the json server
  $.ajax({
    method: "POST",
    url: "http://localhost:3030/api/films",
    data: movieObject,
    contentType: "application/json; charset=utf-8"
  }).done(updateMovieList);
}

function getMovieData() {
  //getting film data from the server
  $.ajax({
    method: "GET",
    url: "http://localhost:3030/api/films",
    contentType: "application/json; charset=utf-8"
  }).done(createMovieList);
}

function modifyMovieData(id, modifiedMovieObject) {
  //modifying film data on the server
  $.ajax({
    method: "PUT",
    url: "http://localhost:3030/api/films/" + id,
    data: modifiedMovieObject,
    contentType: "application/json; charset=utf-8"
  }).done(modifyRowContent);
}

function deleteMovieData(id) {
  //deleting film data from the server
  $.ajax({
    method: "DELETE",
    url: "http://localhost:3030/api/films/" + id,
    contentType: "application/json; charset=utf-8"
  }).done(deleteRow);
}

