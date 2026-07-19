//note: querySelecor use time also to be remember add this # sing....

//note: querySelecor use time also to be remember add this # sing....

let taskInput = document.querySelector("#taskInput");
let button = document.querySelector("#btn");
let tasklist = document.querySelector("#taskList");
let taskCount = document.querySelector("#taskCount");
let emptyMessage = document.querySelector("#emptyMessage");
let completeCount = document.querySelector("#completeCount");
let pendingCount = document.querySelector("#pendingCount");
let completedTasksCount = 0;
let tasks = [];

let savedTasks = localStorage.getItem("tasks");

if (savedTasks) {
    tasks = JSON.parse(savedTasks);

    tasks.forEach(function(task){
        displayTask(task);
    });

    updatedTaskCount();
    checkEmptyState();
}

function checkEmptyState() {
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function updatedTaskCount() {
    taskCount.textContent = tasks.length;
    completeCount.textContent = completedTasksCount;
    pendingCount.textContent = tasks.length - completedTasksCount;
}

function displayTask(task) {

    let newtask = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    let container = document.createElement("div");

    container.classList.add("task-card");
    deleteBtn.classList.add("delete-btn");
    editBtn.classList.add("edit-btn");

    newtask.textContent = task;

    deleteBtn.textContent = "🗑️ Delete";
    editBtn.textContent = "✏️ Edit";

    tasklist.appendChild(container);
    container.appendChild(newtask);
    container.appendChild(deleteBtn);
    container.appendChild(editBtn);

    newtask.addEventListener("click", function () {

        newtask.classList.toggle("completed");

        if (newtask.classList.contains("completed")) {
            completedTasksCount++;
        } else {
            completedTasksCount--;
        }

        updatedTaskCount();

    });

    deleteBtn.addEventListener("click", function () {

        let answer = confirm("Delete this task?");

        if (answer) {

            tasks = tasks.filter(function (item) {
                return item !== task;
            });

            localStorage.setItem("tasks", JSON.stringify(tasks));

            container.remove();

            updatedTaskCount();

            checkEmptyState();
        }

    });

    editBtn.addEventListener("click", function () {

        let updatedTask = prompt("Enter new task", task);

        if (updatedTask === null || updatedTask.trim() === "") {
            return;
        }

        let index = tasks.indexOf(task);

        tasks[index] = updatedTask;

        localStorage.setItem("tasks", JSON.stringify(tasks));

        newtask.textContent = updatedTask;

    });

}



button.addEventListener("click", function () {

    let text = taskInput.value.trim();



    if (text === "") {
        alert("Please enter a task!")
        return;
    }

    tasks.push(text);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    displayTask(text);

    updatedTaskCount();
    checkEmptyState();
    //  browser me permanently save this 


    taskInput.value = "";
    taskInput.focus();

});

taskInput.addEventListener("keydown",function (event) {
     
       if(event.key === "Enter"){
           button.click();
       }
    
});