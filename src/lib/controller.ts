import type { Todo, TodoAction } from "@/lib/types";

export const addTodo = (
  todo: Pick<Todo, "title" | "content">,
  dispatch: React.Dispatch<TodoAction>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!todo.title) {
    setError("Title field is required to be filled out!");
    return;
  }
  if (!todo.content) {
    setError("Content field is required to be filled out!");
    return;
  }
  if (todo.title.length > 25) {
    setError("The title cannot exceed 25 characters!");
    return;
  }
  if (todo.content.length > 120) {
    setError("The content cannot exceed 120 characters!");
    return;
  }
  setError("200");
  setSuccess("200");
  return dispatch({
    type: "add",
    payload: {
      id: crypto.randomUUID(),
      title: todo.title,
      content: todo.content,
      createdAt: new Date(),
      type: "in progress",
    },
  });
};

export const deleteTodo = (
  id: string,
  dispatch: React.Dispatch<TodoAction>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!id) {
    setError("Todo do not exist!");
  }
  setSuccess("200");
  return dispatch({ type: "delete", payload: id });
};

export const updateTodo = (
  todo: Pick<Todo, "id" | "title" | "content">,
  dispatch: React.Dispatch<TodoAction>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!todo.id) {
    setError("Todo do not exist!");
  }
  if (!todo.title) {
    setError("Title field is required to be filled out!");
    return;
  }
  if (!todo.content) {
    setError("Content field is required to be filled out!");
    return;
  }
  if (todo.title.length > 25) {
    setError("The title cannot exceed 25 characters.");
    return;
  }
  if (todo.content.length > 120) {
    setError("The content cannot exceed 120 characters.");
    return;
  }
  setSuccess("200");
  return dispatch({
    type: "updateItem",
    payload: {
      id: todo.id,
      title: todo.title,
      content: todo.content,
    },
  });
};

export const checkTodo = (
  todo: Pick<Todo, "id" | "type">,
  dispatch: React.Dispatch<TodoAction>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setSuccess: React.Dispatch<React.SetStateAction<string>>
) => {
  if (!(todo.id && todo.type)) {
    setError("Todo do not exist!");
  }
  setSuccess("200");
  return dispatch({
    type: "checkItem",
    payload: {
      id: todo.id,
      type: "done",
    },
  });
};
