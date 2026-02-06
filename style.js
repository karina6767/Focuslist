const taskInput = document.getElementById("taskInput");
const categoryInput = document.getElementById("categoryInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const progress = document.getElementById("progress");
const darkToggle = document.getElementById("darkToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

if (darkMode) document.body.classList.add("dark");

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
}

function updateProgress() {
  const done = tasks.filter(t => t.completed).length;
  progress.textContent = `${done}/${tasks.length} tasks completed`;
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <strong>${task.text}</strong>
      <div class="task-meta">
        ${task.category || "No category"} • ${task.date || "No due date"}
      </div>
    `;

    li.addEventListener("click", () => {
      task.completed = !task.completed;
      save();
      renderTasks();
    });

    const del = document.createElement("button");
    del.textContent = "X";
    del.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      save();
      renderTasks();
    };

    li.appendChild(del);
    taskList.appendChild(li);
  });

  updateProgress();
}

function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({
    text: taskInput.value,
    category: categoryInput.value,
    date: dateInput.value,
    completed: false
  });

  taskInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";

  save();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

darkToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.classList.toggle("dark");
  save();
});

renderTasks();
