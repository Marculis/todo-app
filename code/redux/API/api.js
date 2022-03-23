const axios = require("axios").default;

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "7f9d8199-145b-4be9-a880-a02b952595cc",
  },
});

export const AppAPI = {
  getAuth: () => {
    return instance.get("auth/me").then((response) => {
      return response.data;
    });
  },
  postLogin: (loginData) => {
    return instance.post("auth/login/", loginData).then((response) => {
      return response;
    });
  },
  deleteLogin: () => {
    return instance.delete("auth/login/").then((response) => {
      return response;
    });
  },
};

export const toDoAPI = {
  getAllTodos: () => {
    return instance.get("todo-lists").then((response) => {
      return response;
    });
  },
  postTodoList: (title) => {
    return instance.post("todo-lists", { title }).then((response) => {
      return response;
    });
  },
  deleteTodo: (todolistId) => {
    return instance
      .delete(`todo-lists/${todolistId}`, { todolistId })
      .then((response) => {
        return response;
      });
  },
  editTodo: (todolistId, title) => {
    return instance
      .put(`/todo-lists/${todolistId}`, { title })
      .then((response) => {
        return response;
      });
  },
  reorderTodo: (todolistId, putAfterItemId) => {
    return instance
      .put(`/todo-lists/${todolistId}/reorder`, { putAfterItemId })
      .then((response) => {
        return response;
      });
  },
};

export const singleTodoAPI = {
  getTasksOfList: (todolistId) => {
    return instance.get(`/todo-lists/${todolistId}/tasks`).then((response) => {
      return response;
    });
  },
  postTask: (todolistId, title) => {
    return instance
      .post(`/todo-lists/${todolistId}/tasks`, { title })
      .then((response) => {
        return response;
      });
  },
  putTask: (todolistId, taskId, body) => {
    return instance
      .put(`/todo-lists/${todolistId}/tasks/${taskId}`, body)
      .then((response) => {
        return response;
      });
  },
  deleteTask: (todolistId, taskId) => {
    return instance
      .delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
      .then((response) => {
        return response;
      });
  },
  reorderTask: (todolistId, taskId, putAfterItemId) => {
    debugger;
    return instance
      .put(`todo-lists/${todolistId}/tasks/${taskId}/reorder`, {
        putAfterItemId,
      })
      .then((response) => {
        return response;
      });
  },
};
