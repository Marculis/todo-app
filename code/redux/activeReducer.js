import { toDoAPI } from "./API/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllTodos = createAsyncThunk(
  "toDoReducer/getAllTodos",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await toDoAPI.getAllTodos();
      dispatch(setTodos(response));
    } catch {
      return rejectWithValue("Todos request error!");
    }
  }
);

export const postTodoList = createAsyncThunk(
  "toDoReducer/postTodoList",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await toDoAPI.postTodoList(
        getState().toDoReducer.taskTitle
      );
      if (response.data.resultCode === 0) dispatch(getAllTodos());
    } catch {
      return rejectWithValue("Todo create error!");
    }
  }
);

export const deleteTodoList = createAsyncThunk(
  "toDoReducer/deleteTodoList",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await toDoAPI.deleteTodo(id);
      if (response.data.resultCode === 0) {
        dispatch(getAllTodos());
      }
    } catch {
      return rejectWithValue("Todo create error!");
    }
  }
);

export const editTodoList = createAsyncThunk(
  "toDoReducer/editTodoList",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await toDoAPI.editTodo(
        getState().toDoReducer.choosenTodoTitleId,
        getState().toDoReducer.choosenTodoTitle
      );
      if (response.data.resultCode === 0) {
        dispatch(getAllTodos());
      }
    } catch {
      return rejectWithValue("Todo edit error!");
    }
  }
);

export const reorderTodo = createAsyncThunk(
  "toDoReducer/reorderTodo",
  async (reorderTodoId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await toDoAPI.reorderTodo(
        reorderTodoId,
        getState().toDoReducer.choosenTodoTitleId
      );
      if (response.data.resultCode === 0) {
        dispatch(getAllTodos());
      }
    } catch {
      return rejectWithValue("Todo reorder error!");
    }
  }
);

const setLoadingTrue = (state) => {
  state.isLoading = true;
};

const setLoadingFalse = (state) => {
  state.isLoading = false;
};

const activeReducer = createSlice({
  name: "toDoReducer",
  initialState: {
    todoList: [],
    isEmpty: true,
    taskTitle: null,
    choosenTodoTitle: null,
    choosenTodoTitleId: null,
    isLoading: false,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todoList = action.payload.data;
      action.payload.data.length === 0
        ? (state.isEmpty = true)
        : (state.isEmpty = false);
    },
    chooseTodo: (state, action) => {
      state.choosenTodoTitleId = action.payload.id;
      state.choosenTodoTitle = action.payload.title;
    },
    changeEditedTitle: (state, action) => {
      state.choosenTodoTitle = action.payload;
    },
    changeTaskTitle: (state, action) => {
      state.taskTitle = action.payload;
    },
  },
  extraReducers: {
    [getAllTodos.pending]: setLoadingTrue,
    [postTodoList.pending]: setLoadingTrue,
    [editTodoList.pending]: setLoadingTrue,
    [deleteTodoList.pending]: setLoadingTrue,
    [reorderTodo.pending]: setLoadingTrue,

    [getAllTodos.fulfilled]: setLoadingFalse,
    [editTodoList.fulfilled]: setLoadingFalse,
    [deleteTodoList.fulfilled]: setLoadingFalse,
    [reorderTodo.fulfilled]: setLoadingFalse,
    [postTodoList.fulfilled]: (state) => {
      state.taskTitle = "";
    },
    setLoadingFalse,
  },
});

export const { setTodos, chooseTodo, changeEditedTitle, changeTaskTitle } =
  activeReducer.actions;

export default activeReducer.reducer;
