const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <div class="actions">
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  saveTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  taskInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
    