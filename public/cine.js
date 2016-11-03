$(document).ready(initializeEvents);

function initializeEvents() {
  //cahcing buttons id and inicialize events
  var saveButton = $('#save'),
    deleteButton = $('#delete');

  saveButton.click(saveMovieData);
  deleteButton.click(deleteRow);
  getMovieData();
}

function clearInputs() {
  //clear input values after clicking the save button
  var $formInputs = $('form :input');
  
  $formInputs.each(function() {
    $(this).val('');
  });
}

function saveMovieData(event) {
  //caching dom elements
  var $movieTitle = $('#title'),
      $movieDirector = $('#director'),
      $movieDate = $('#date'),
      $movieSynopsis = $('#synopsis'),
       
  //setting a movie object 
    movieObject = {
      title: $movieTitle.val() || '',
      director: $movieDirector.val() || '',
      date: $movieDate.val() || '',
      synopsis: $movieSynopsis.val() || ''
    };
  //creating a json object from a js object and posting data to the json server
  postMovieData(JSON.stringify(movieObject));
  clearInputs();  
}

function postMovieData(movieObject) {
  //posting input data to the json server
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/films",
    data: movieObject,
    contentType: "application/json"
  }).done(updateMovieList);
}

function updateMovieList(savedMovie) {
  //appending last saved movie to the table
  createMovieList([savedMovie]);
}

function getMovieData() {
  //getting data from the server
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/films"
  }).done(createMovieList);
}

function createMovieList(getResponse) {
  //initialize the table with data from the server
  var $tableBody = $('#movie-table tbody'),
    $rowData;

    getResponse.forEach(function(movie) {
      $rowData = $('<tr><td>' +
      '<input class="checkbox" type="checkbox">' + '</td><td id="row-id">' +
      movie.id + '</td><td id="row-title">' +
      movie.title + '</td><td id="row-director">' +
      movie.director + '</td><td id="row-date">' +
      movie.date + '</td><td id="row-synopsis">' +
      movie.synopsis + '</td><td>' +
      '</tr>');
        
      $tableBody.append($rowData);
    });
}

function deleteRow(event) {
  //delete checked rows
  var $checkedBoxes = $("input:checked").closest('tr');
  $checkedBoxes.remove();
}