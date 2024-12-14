import type { TodoState, TodoAction } from "@/lib/types";

const todoReducer = (state: TodoState, action: TodoAction) => {
  const { type, payload } = action;
  const { todos } = state;
  switch (type) {
    case "add":
      return {...state, todos: [...todos, payload]};
    case "delete":
      return {...state, todos: todos.filter((todo) => todo.id !== payload)};
    case "filter":
      return { ...state, filter: payload };
    case "nextPage":
      return { ...state, currentPage: payload };
    case "updateItem":
      return { ...state, todos: todos.map(todo => {
        if(todo.id === payload.id){
          return { ...todo, title: payload.title, content: payload.content }
        }
        return todo;
      }) }
    case "checkItem":
      return { ...state, todos: state.todos.map(todo => {
        if(todo.id === payload.id){
          return { ...todo, type: payload.type }
        }
        return todo;
      }) }
    default:
      return state;
  }
};

export default todoReducer;
