import React from "react";

export type Todo = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  type: "done" | "in progress";
};

export type TodoState = {
  todos: Todo[];
  filter: Todo["type"] | "default";
  currentPage: number;
};

export type TodoAction =
  | { type: "add"; payload: Todo }
  | { type: "delete"; payload: string }
  | { type: "filter"; payload: Todo["type"] | "default" }
  | { type: "nextPage"; payload: number }
  | { type: "updateItem"; payload: Omit<Todo, "createdAt" | "type"> }
  | { type: "checkItem"; payload: Pick<Todo, "id" | "type"> };

export type ErrorContext = {
  setError: React.Dispatch<React.SetStateAction<string>>,
  error: string
}

export type SucessContext = {
  setSuccess: React.Dispatch<React.SetStateAction<string>>,
  success: string
}
