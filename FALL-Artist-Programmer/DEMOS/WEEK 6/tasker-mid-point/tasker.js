// $ = jQuery
// Look at the document, wait for it to be ready and loaded, then execute the code
// https://api.jquery.com/ready/
$(document).ready(function(){
  console.log("ready");

  // This is where we'll store our tasks
  let taskList = [];

  // User a jQuery selector get the button with an id of new-task
  let $newTaskButton = $("button#new-task");

  // NEW TASK BUTTON EVENT HANDLER
  // Whenever someone clicks on the new task button, execute a function
  $newTaskButton.on('click', function(){

    // Captures the value that the user inputs into the the input field in html
    let $inputVal = $('input').val();
    let id = uniqueId();
    addTask(id, $inputVal);
    // Pass an empty string to the input
    $('input').val('')

  });
  // END NEW TASK BUTTON EVENT HANDLER

  // ENTER KEY EVENT HANDLER
  $("input").keypress(function(event) {
    // enter key has a numerical value of 13
    // So, "if the enter key pressed..." do something
    if( event.which == 13 ) {
      let $inputVal = $('input').val();
      let id = uniqueId();
      addTask(id, $inputVal);
      // Pass an empty string to the input
      $('input').val('')
    }
  });
  // END ENTER KEY EVENT HANDLER

  // MARK TASKS DONE
  // Listening for clicks on list items that are children of unordered lists
  $('ul').on('click', 'li', function(){
    // $(this) is a representation of the thing that was just clicked
    $(this).toggleClass('checked');
    let $taskId = $(this).attr('data-id');
    // console.log($taskId);

    // Look through the taskList and find the object that has the same ID as the ID
    // that we just captured from the click
    let taskStatus = taskList.find( function(taskItem) {
      return taskItem.id === $taskId;
    });

    // console.log(taskList)
    // console.log(taskStatus)

    // We're updating the key completed on our task objects when we check them
    if ( taskStatus.completed === false ) {
      taskStatus.completed = true
    } else {
      taskStatus.completed = false
    }

    console.log(taskStatus)

  });
  // END MARK TASKS DONE

  // START UNIQUE ID
  function uniqueId() {
    // This will produce reliable 7 digit unique combination of numbers of letters
    // with an underscore prepended
    return '_' + Math.random().toString(36).substr(2, 9)
  }
  // END UNIQUE ID

  // ADD TASK FUNCTION
  function addTask(taskId, input) {

    let task = {
      id: taskId,
      content: input,
      completed: false
    }

    // Add the new task to the unordered list
    // If input is an empty string, give an alert
    if( input === '' ) {
      alert("You didn't enter anything...")
    } else {
      // Stores our new task in our array
      taskList.push(task)
      // Example: <li data-id='1234' class='task'>Input Value</li>
      let $newTask = $(`<li data-id='${taskId}' class='task'>${input}</li>`);
      $('ul').append($newTask);
    }

  }
  // END ADD TASK FUNCTION

});
