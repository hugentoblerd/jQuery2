$(document).ready(function () {
  
  // hidden elements on page load
  $('#newTaskForm').hide();

  // array of task objects the user has made
  var listo = [];

// constructor for users to create tasks
  var Task = function (task) {
    this.task = task;
    this.id = 'new';
  }

// function for adding tasks
  var addTask = function (task) {
    if (task) {
// calls task constructor and creates new Task
      task = new Task(task);
// pushes new task to listo variable
      listo.push(task);

// clears the form after its submited
      $('#newItemInput').val('');
// shows new list item in our index.html
      $('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');

    };
// hide/show the input form at the same time as our New button
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  }

// calls addTask function when we click save on the #saveNewItem button
  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  })

// opens form
  $('#newListItem').on('click', function () {
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
    $('#newItemInput').focus();
  })

// closes form
  $('#cancel').on('click', function (e) {
    e.preventDefault();
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
  })

  // moves task from new to inProgress
  $(document).on('click', '#item', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  })


  // moves task from inProgress to Archived
  $(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    this.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  })

// deletes tasks in the list
  $(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  })

// advances task forward from new to inProgress to Archived
  var advanceTask = function (task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
        }else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
        }else {
          listo.splice(i, 1);
        };
        // save();
        break;
      };
    };
    task.remove();
  }









});