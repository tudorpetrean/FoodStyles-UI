import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface CounterState {
  toDos: any;
}

const initialState: CounterState = {
  toDos: null,
};

export const getToDos = createAsyncThunk(
  "get_todos",
  async () => await axios.get<any>(`http://localhost:3000/todos/`)
);

export const updateToDoStatus = createAsyncThunk(
  "set_completed",
  async (id: number) => axios.post<any>(`http://localhost:3000/todos/${id}`)
);

export const addNewToDo = createAsyncThunk(
  "set_new_todo",
  async (data: string) =>
    axios.post<any>(`http://localhost:3000/todos/`, { content: data })
);

export const deleteToDo = createAsyncThunk("delete_todo", async (id: number) =>
  axios.delete<any>(`http://localhost:3000/todos/${id}`)
);

export const toDoSlice = createSlice({
  name: "toDo",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getToDos.fulfilled, (state, action) => {
      state.toDos = action.payload.data;
    });
    builder.addCase(updateToDoStatus.fulfilled, (state, action) => {
      state.toDos = action.payload.data;
    });
    builder.addCase(addNewToDo.fulfilled, (state, action) => {
      state.toDos = action.payload.data;
    });
    builder.addCase(deleteToDo.fulfilled, (state, action) => {
      state.toDos = action.payload.data;
    });
  },
});

export const {} = toDoSlice.actions;

export const selectToDos = (state: RootState) => state.toDo.toDos;

export default toDoSlice.reducer;
