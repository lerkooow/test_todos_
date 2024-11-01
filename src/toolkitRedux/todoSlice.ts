import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  task: string;
  checked: boolean;
}

interface TodoState {
  todo: Todo[];
  deletedTodo: Todo[];
  nextId: number;
}

export const initialState: TodoState = {
  todo: JSON.parse(localStorage.getItem("todo")!) || [],
  deletedTodo: JSON.parse(localStorage.getItem("deletedTodo")!) || [],
  nextId: JSON.parse(localStorage.getItem("nextId")!) || 1,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      const newTask: Todo = {
        id: state.nextId,
        task: action.payload,
        checked: false,
      };
      state.todo.push(newTask);
      state.nextId += 1;
      localStorage.setItem("todo", JSON.stringify(state.todo));
      localStorage.setItem("nextId", JSON.stringify(state.nextId));
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const todo = state.todo.find((item) => item.id === todoId);
      if (todo) {
        todo.checked = !todo.checked;
        localStorage.setItem("todos", JSON.stringify(state.todo));
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      const deletedTask = state.todo.find((item) => item.id === todoId);
      if (deletedTask) {
        state.todo = state.todo.filter((item) => item.id !== todoId);
        state.deletedTodo.push(deletedTask);
        localStorage.setItem("todo", JSON.stringify(state.todo));
        localStorage.setItem("deletedTodo", JSON.stringify(state.deletedTodo));
      }
    },
    clearAll(state) {
      state.deletedTodo.push(...state.todo);
      state.todo = [];
      localStorage.setItem("todos", JSON.stringify(state.todo));
      localStorage.setItem("deletedTodo", JSON.stringify(state.deletedTodo));
    },
    removeFromDeleted(state, action: PayloadAction<number>) {
      const todoId = action.payload;
      state.deletedTodo = state.deletedTodo.filter((item) => item.id !== todoId);
      localStorage.setItem("deletedTodo", JSON.stringify(state.deletedTodo));
    },
  },
});

export const selectAllTodo = (state: { todo: TodoState }) => state.todo.todo;
export const selectDeletedTodo = (state: { todo: TodoState }) => state.todo.deletedTodo;

export default todoSlice.reducer;
export const { addTodo, toggleTodo, deleteTask, clearAll, removeFromDeleted } = todoSlice.actions;
