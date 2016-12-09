$(document).ready(initializeEvents);

function initializeEvents() {
  //cahcing buttons id and inicialize events
  var saveButton = $('#save');
  var deleteButton = $('#delete');
  var modifyButton = $('#modify');
  var tableElement = $('#movie-table');

  saveButton.click(saveMovieData);
  modifyButton.click(modifyMovie);
  tableElement.on('change', 'input:checkbox', fillForm);
  deleteButton.click(deleteMovie);
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
  var $movieTitle = $('#title');
  var $movieDirector = $('#director');
  var $movieDate = $('#date');
  var $movieSynopsis = $('#synopsis');
  var $saveSucessMessage = $('#save-success-message');
       
  //setting a movie object 
  movieObject = {
    title: $movieTitle.val(),
    director: $movieDirector.val(),
    date: $movieDate.val(),
    synopsis: $movieSynopsis.val()
  };
  //creating a json object from a js object and posting data to the json server
  postMovieData(JSON.stringify(movieObject));
  
  clearInputs();
  showMessage($saveSucessMessage);
}

function showMessage($target) {
  //Timing and effects for event messages
  $target.fadeIn(2000).fadeOut(2000);
}

function appendRowData(movie) {
  var $tableBody = $('#movie-table tbody');
  var $rowData;

  $rowData = $('<tr data-movie-id="' + movie._id + '"><td>' +
    '<input class="checkbox" type="checkbox">' + '</td><td id="row-title">' +
    movie.title + '</td><td id="row-director">' +
    movie.director + '</td><td id="row-date">' +
    movie.date + '</td><td id="row-synopsis">' +
    movie.synopsis + '</td>' +
    '</tr>');

  $tableBody.append($rowData);
}

function updateMovieList(newMovie) {
  //appending last saved movie to the table
  appendRowData(newMovie);
}

function createMovieList(movieObjectArray) {
  //initialize the table with data from the server (database)
  movieObjectArray.forEach(function(movie) {
    appendRowData(movie);
  });
}

function fillForm(event) {
// Cached row element values
  if(this.checked) {
    var $checkedBoxes = $("input:checked").closest('tr');
    var $rowId = $checkedBoxes.attr('data-movie-id');
    var $rowTitle = $checkedBoxes[0].childNodes[1].textContent;
    var $rowDirector = $checkedBoxes[0].childNodes[2].textContent;
    var $rowDate = $checkedBoxes[0].childNodes[3].textContent;
    var $rowSynopsis = $checkedBoxes[0].childNodes[4].textContent;
    // Cached form inputs
    var $movieTitle = $('#title');
    var $movieDirector = $('#director');
    var $movieDate = $('#date');
    var $movieSynopsis = $('#synopsis');
    
    $movieTitle.val($rowTitle);
    $movieDirector.val($rowDirector);
    $movieDate.val($rowDate);
    $movieSynopsis.val($rowSynopsis);
  } else {
    clearInputs();
  }
}

function modifyRowContent(putData) {
  //finding the checked row td values and overwriting with the new values
  var $checkedBoxes = $("input:checked").closest('tr');
  var $modifyMessage = $('#modify-success-message');
    
  //update modified row movie data
  $checkedBoxes.find('#row-title').text(putData.title);
  $checkedBoxes.find('#row-director').text(putData.director);
  $checkedBoxes.find('#row-date').text(putData.date);
  $checkedBoxes.find('#row-synopsis').text(putData.synopsis);

  clearInputs();

  showMessage($modifyMessage);
}

function modifyMovie(event) {
  // Cached form inputs
  var $movieTitle = $('#title');
  var $movieDirector = $('#director');
  var $movieDate = $('#date');
  var $movieSynopsis = $('#synopsis');
  var $checkedBoxes = $("input:checked").closest('tr');
  var $modifyWarningMessage = $('#modify-warning-message');
  var $rowId = $checkedBoxes.attr('data-movie-id');

  if($checkedBoxes.length > 1) {
    showMessage($modifyWarningMessage);
  } else {
  //save new data from inputs
    var modifiedMovieObject = {
      title: $movieTitle.val(),
      director: $movieDirector.val(),
      date: $movieDate.val(),
      synopsis: $movieSynopsis.val()
    }
    modifyMovieData($rowId, JSON.stringify(modifiedMovieObject));
  }
}

function deleteRow() {
  //delete checked rows from the dom
  var $checkedBoxes = $("input:checked").closest('tr');
  var $deleteMessage = $('#delete-success-message');
  
  $checkedBoxes.remove();
  clearInputs();
  showMessage($deleteMessage);
}

function deleteMovie(event) {
  //delete checked row data from the server
  var $checkedBoxes = $("input:checked").closest('tr');
  var id = $checkedBoxes.attr('data-movie-id');

  deleteMovieData(id);
}
