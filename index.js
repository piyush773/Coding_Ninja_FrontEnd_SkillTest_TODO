var todoList = [];
var comList  = [];
var remList  = [];

const addTask = document.getElementById('add-task');
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const eraseAll = document.getElementById('erase-all');

// Event listeners for add and delete

addTask.addEventListener("submit", (event) => {
    event.preventDefault();
    addNewTask();
});

eraseAll.addEventListener("click", (event) => {
    deleteAll();
});

// Event listeners for filters

document.addEventListener('click', (event) => {
    if (event.target.tagName.split(' ')[0] === 'LI') {
        markAsCompleted(event);
    }
    if (event.target.tagName.split(' ')[0] === 'IMG') {
        deleteOne(event)
    }
    if (event.target.id === "all") {
        viewAll();
    }
    if (event.target.id === "pending") {
        viewRemaining();
    }
    if (event.target.id === "completed") {
        viewCompleted();
    }
});


// Adds a new task to the todo list
function addNewTask() {
    var value = inputBox.value.trim();

    if (value === '') {
      alert("You cannot leave it blank. Please enter something...");
      return;
    }
    // Check if the task already exists
    if (todoList.some((item) => item.task === value)) {
      alert("Task already exists. Please try a different task...");
      return;
    }

    todoList.push({
      task: value,
      id: Date.now().toString(),
      complete: false,
    });

    inputBox.value = "";

    update();
    displayTodoLists(todoList);
  }


// Updates the counts and lists of completed and remaining tasks

function update() {
    comList = todoList.filter((ele) => ele.complete);
    remList = todoList.filter((ele) => !ele.complete);
    document.getElementById("total-count").innerText = todoList.length.toString();
    document.getElementById("remain-count").innerText = remList.length.toString();
    document.getElementById("complete-count").innerText = comList.length.toString();
}


// Renders the todo list on the page

function displayTodoLists(todoList) {
    listContainer.innerHTML = "";
    todoList.forEach(element => {
        let list = `<li id=${element.id}>
                        <div>${element.complete ? `<strike>${element.task}</strike>` : element.task}
                            <img class="delete" src="https://cdn-icons-png.flaticon.com/128/2939/2939532.png">
                        </div>
                    </li>`;

        listContainer.innerHTML += list;
        console.log(list);
    });
}


// Marks an individual task as complete or incomplete

function markAsCompleted(event) {
   let taskID = event.target.getAttribute('id');
   console.log(taskID);
    todoList.forEach((obj) => {
        if (obj.id == taskID) {
            if (obj.complete == false) {
                obj.complete = true;

            } else {
                obj.complete = false;
            }
        }
    });
    update();
    displayTodoLists(todoList);
}


// Deletes an individual task

function deleteOne(event) {
    let deleted = event.target.parentElement.parentElement.getAttribute('id');

    todoList = todoList.filter((ele) => ele.id != deleted);
    update();
    displayTodoLists(todoList);
}


// Deletes all tasks

function deleteAll() {
    todoList = [];
    update();
    displayTodoLists(todoList);
}


// Filters and displays completed tasks

function viewCompleted() {
    displayTodoLists(comList);
}

// Filters and displays remaining tasks
function viewRemaining() {
    displayTodoLists(remList);
}

// Displays all tasks
function viewAll() {
    displayTodoLists(todoList);
}

