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

  // DELETE ALL TASKS THAT ARE COMPLETE
  // Listening for clicks on the button that has an ID of 'delete-completed'
  $("button#delete-completed").on('click',
    function() {

      // Trigger a dialogue box to ensure the user wants to delete the task
      if( confirm("Are you sure you want to delete that task?") ) {
        // Find all list items that have a class of 'checked'
        // and remove them
        $("li.checked").remove();
        // console.log(taskList)
      }

    }
  );
  // END DELETE ALL TASKS THAT ARE COMPLETE

  // MARK ALL TASKS COMPLETED
  $("button#mark-all").on('click',
    function() {

      // Find all list items with a class of task and do something to them
      $("li.task").each(function(){
        // $(this) references whatever the current item within the loop is,
        // whichever is the current thing being iterated over
        // let theClass = $(this).attr('data-id');
        let theClass = $(this).hasClass("checked");

        if( theClass === false ) {
          $("li.task").addClass('checked');
          // One thing we haven't done is marked the tasks completed in the array
          // Maybe another time
          // Justin: do this for next semester 
        }

      });

    }
  );
  // END MARK ALL TASKS COMPLETED

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
    // console.log("task", task)

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
      // console.log(taskList)
    }

  }
  // END ADD TASK FUNCTION

});
