const apiGetTasks = async () => {
  try {
    const result = await fetch(`${API_URL}.json`, { method: "GET" });

    const data = await result.json();

    let tasks = Object.keys(data).map((key) => ({
      id: key,
      description: data[key].description,
      done: data[key].done,
    }));

    return tasks;
  } catch (error) {
    console.log(error);
  }
};

const apiAddTask = async (task) => {
  try {
    let data = JSON.stringify(task);

    const result = await fetch(`${API_URL}.json`, {
      method: "POST",
      body: data,
    });

    data = await result.json();

    return { id: data.name };
  } catch (error) {
    console.log(error);
  }
};

const apiDeleteTask = async (id) => {
  try {
    const result = await fetch(`${API_URL}/${id}.json`, { method: "DELETE" });
  } catch (error) {
    console.log(error);
  }
};
