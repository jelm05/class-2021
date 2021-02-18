$(document).ready(function(){

  // A constant variable to store all of our tasks within an array
  const taskList = [];
  const $newTaskButton = $("button#new-task");
  const $input = $("input");

  // Listen for click events on the newTaskButton
  $newTaskButton.on('click', function(){

    let $inputVal = $input.val();
    addTask($inputVal);
    $input.val('');
    console.log("before: ", taskList)

  });

  $input.keypress( function(event){
    if( event.which == 13 ) {
      let $inputVal = $input.val();
      addTask($inputVal);
      $input.val('');
    }
  });

  // Listen for click events on <li> that are a child of our <ul>
  $('ul').on('click', 'li', function(){
    // $(this) corresponds to whatever element the event is happening on
    // Specifically, whatever <li> we clicked get or removes the class of checked
    $(this).toggleClass("checked");
    let $taskId = $(this).attr('data-id');

    // We need to find the object in the taskList that has teh same ID as the <li> we just clicked on
    let taskStatus = taskList.find( function( taskItem ) {
        return taskItem.id === $taskId;
    });

    // This toggles the status of our tasks within our taskList
    if( taskStatus.completed === false ) {
      taskStatus.completed = true;
    } else {
      taskStatus.completed = false;
    }

    console.log("after: ", taskList)

  });


  $("button#delete-completed").on('click', function(){
    console.log("clicked delete");
    // This only removes the task from the HTML
    // Is this a bug or a feature?
    if( confirm("Are you sure you want to delete all completed tasks?") ) {
      $('li.checked').remove();
    }

  });

  $("button#mark-all").on('click', function(){
    console.log("clicked mark all!");

    // Find all the <li> with a class of task, and apply the same funciton to all of them
    $('li.task').each(function(){
      // Is it true or false that the <li> has a class of checked
      // Make sure the <li> DOESNT have the class
      // The ! inverts the selector
      let theClass = !$(this).hasClass("checked");
      console.log(theClass);

      if ( theClass === true ) {
        $('li.task').addClass('checked');
      }

    });

  });

  // This function will handle the process of adding a task and saving it
  function addTask(input) {

    let taskObject = {
      id : uniqueId(),
      content : input,
      completed : false
    };

    taskList.push(taskObject);

    // Add the task to the Document Object Model
    let $newTask = $(`<li data-id="${ taskObject.id }" class="task">${ input }</li>`);

    if ( input === "" ) {
      alert("You didn't enter a task.");
    } else {
      $('ul').append( $newTask );
    }

    console.log(taskList)

  }

  // This function will generate a unique ID for each task object
  function uniqueId() {
    return Math.random().toString(36).substring(2, 9);
  }

});
