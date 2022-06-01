const getTasks = async () => {
  const tasks = await apiGetTasks();

  const ul = document.getElementById("todo-list");

  const listItems = tasks.map((task) => {
    const li = document.createElement("li");
    li.innerHTML = task.description;
    const button = document.createElement("button");
    button.value = task.id;
    button.className = "delete-btn";
    button.addEventListener("click", deleteTask);
    li.appendChild(button);
    return li;
  });

  listItems.forEach((task) => {
    ul.appendChild(task);
  });
};

const removeTasksDOM = () => {
  const ul = document.getElementById("todo-list");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
};

const refreshTasksDOM = () => {
  removeTasksDOM();
  getTasks();
};

const addTask = async () => {
  const input = document.getElementById("input-description");
  const description = input.value;
  if (description != "") {
    const task = {
      description: description,
      done: false,
    };
    const taskResult = await apiAddTask(task);

    input.value = "";
    refreshTasksDOM();
  }
};

const deleteTask = async (event) => {
  const id = event.target.value;

  if (id != "") {
    await apiDeleteTask(id);
    refreshTasksDOM();
  }
};

const buttonAddTask = document.getElementById("btn-add-task");
buttonAddTask.addEventListener("click", addTask);

getTasks();
