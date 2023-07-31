const state = {
  tasks: [],
  weekDay: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
};

var addBtn = document.getElementById("addBtn");
var taskList = document.getElementById("taskLists");
var inputContainer = document.getElementById("inputContainer");
addBtn.addEventListener("click", () => {
  inputContainer.style.display = "block";
  inputContainer.style.top = "0vh";
});
document.getElementById("cancelBtn").addEventListener("click", () => {
  inputContainer.style.top = "-100vh";
  clearInput();
});
document.getElementById("createBtn").addEventListener("click", addTask);
function clearInput() {
  var title = document.getElementById("titleText");
  var des = document.getElementById("desText");
  title.value = "";
  des.value = "";
}

function addTask() {
  var currdate = new Date();
  var mins = currdate.getMinutes();
  var hrs = currdate.getHours();
  var week = currdate.getDay();

  var title = document.getElementById("titleText").value;
  var des = document.getElementById("desText").value;
  if (title == "" || des == "") {
    alert("Please fill in the boxes");
    return;
  }

  var obj = {
    id: Date.now(),
    hours: hrs,
    minutes: mins,
    title: title,
    description: des,
    week: week,
    status: 0,
  };
  state.tasks.push(obj);

  localStorage.setItem("tasks", JSON.stringify(state.tasks));

  inputContainer.style.top = "-100vh";
  clearInput();
  getFromLocalStorage();
  displayTasks();
  return;
}

function deleteItem(id) {
  var index = state.tasks.findIndex((item) => {
    return item.id === id;
  });
  state.tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  getFromLocalStorage();
  return displayTasks();
}
function completeTask(id) {
  const index = state.tasks.findIndex((item) => {
    return item.id === id;
  });
  state.tasks[index].status = 1;
  localStorage.setItem("tasks", JSON.stringify(state.tasks));
  getFromLocalStorage();
  return displayTasks();
}
function getFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");

  state.tasks = tasks ? JSON.parse(tasks) : [];
  return;
}

function displayTasks() {
  const container = document.getElementById("taskLists");
  container.innerHTML = "";
  if (state.tasks.length > 0) {
    state.tasks.forEach((task) => {
      container.innerHTML += `
        <div class="listItem" style="background: ${task.status === 1 ? 'green' : 'unset'}">
            <div class='sideDate'>
            <span class='weekDay'>${state.weekDay[task.week]}</span>
            <span class='time'>${task.hours}:${task.minutes}</span>   </div>
            <div class='mainSide'>
            <span class='titleSpan'>${task.title}</span>
            <span class='desSpan'>${task.description}</span>
            </div>
            <div class="sideBtn">
            <button class='btn btn-primary completedBtn' onclick="completeTask(${task.id})">Completed</button>
            <button class='btn btn-danger deleteBtn' onclick="deleteItem(${task.id})">Delete</button>
            </div>
        </div>
        `;
    });
    return;
  }
  return (container.innerHTML = `<h3>No tasks yet.</h3>`);
}

document.getElementById("showAllBtn").addEventListener("click", () => {
    getFromLocalStorage();
    displayTasks();
    return;
});
document.getElementById("showCompletedBtn").addEventListener("click", () => {
    getFromLocalStorage();
    state.tasks = state.tasks.filter(task => {
        return task.status === 1;
    })
    displayTasks();
    return;
});
document.getElementById("showPendingBtn").addEventListener("click", () => {
    getFromLocalStorage();
    state.tasks = state.tasks.filter(task => {
        return task.status === 0;
    })
    displayTasks();
    return;
});

getFromLocalStorage();
displayTasks();