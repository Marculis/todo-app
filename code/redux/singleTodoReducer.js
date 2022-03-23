import { singleTodoAPI } from "./API/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk(
  "singleTodoReducer/getTasks",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await singleTodoAPI.getTasksOfList(
        getState().toDoReducer.choosenTodoTitleId
      );
      dispatch(setTasks(response.data));
    } catch {
      return rejectWithValue("Auth request error!");
    }
  }
);

export const addTask = createAsyncThunk(
  "singleTodoReducer/addTask",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await singleTodoAPI.postTask(
        getState().toDoReducer.choosenTodoTitleId,
        getState().singleTodoReducer.newTaskTitle
      );
      if (response.data.resultCode === 0) dispatch(getTasks());
    } catch {
      return rejectWithValue("Add task error!");
    }
  }
);

export const editTask = createAsyncThunk(
  "singleTodoReducer/editTask",
  async (body, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await singleTodoAPI.putTask(
        getState().toDoReducer.choosenTodoTitleId,
        getState().singleTodoReducer.taskId,
        body
      );
      if (response.data.resultCode === 0) dispatch(getTasks());
    } catch {
      return rejectWithValue("Add task error!");
    }
  }
);

export const deleteTask = createAsyncThunk(
  "singleTodoReducer/deleteTask",
  async (taskId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await singleTodoAPI.deleteTask(
        getState().toDoReducer.choosenTodoTitleId,
        taskId
      );
      if (response.data.resultCode === 0) dispatch(getTasks());
    } catch {
      return rejectWithValue("Delete task error!");
    }
  }
);

export const reorderTask = createAsyncThunk(
  "singleTodoReducer/reorderTask",
  async (afterId, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await singleTodoAPI.reorderTask(
        getState().toDoReducer.choosenTodoTitleId,
        afterId,
        getState().singleTodoReducer.taskId
      );
      if (response.data.resultCode === 0) dispatch(getTasks());
    } catch {
      return rejectWithValue("Reorder task error!");
    }
  }
);

const setLoadingTrue = (state) => {
  state.isLoading = true;
};

const setLoadingFalse = (state) => {
  state.isLoading = false;
};

export const singleTodoReducer = createSlice({
  name: "singleTodoReducer",
  initialState: {
    tasksList: [],
    newTaskTitle: null,
    isLoading: false,
    taskId: null,
    taskTitle: null,
    taskDescr: null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasksList = action.payload.items;
    },
    setTaskData: (state, action) => {
      state.taskTitle = action.payload.title;
      state.taskDescr = action.payload.description;
      state.taskId = action.payload.id;
    },
    titleOnchange: (state, action) => {
      state.taskTitle = action.payload;
    },
    descrOnchange: (state, action) => {
      state.taskDescr = action.payload;
    },
    newTaskTitleOnchange: (state, action) => {
      state.newTaskTitle = action.payload;
    },
    setTaskId: (state, action) => {
      state.taskId = action.payload;
    },
  },
  extraReducers: {
    [deleteTask.pending]: setLoadingTrue,
    [editTask.pending]: setLoadingTrue,
    [addTask.pending]: setLoadingTrue,
    [getTasks.pending]: setLoadingTrue,

    [deleteTask.fulfilled]: setLoadingFalse,
    [editTask.fulfilled]: setLoadingFalse,
    [getTasks.fulfilled]: setLoadingFalse,
    [addTask.fulfilled]: (state) => {
      state.newTaskTitle = "";
    },
    setLoadingFalse,
  },
});

export const {
  setTasks,
  setTaskData,
  titleOnchange,
  descrOnchange,
  newTaskTitleOnchange,
  setTaskId,
} = singleTodoReducer.actions;
export default singleTodoReducer.reducer;
