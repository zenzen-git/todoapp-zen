import "@/globals.css";
import type { TodoAction, TodoState } from "@/lib/types";
import { cn } from "@/lib/utils";

/* Reducer */
import todoReducer from "@/reducer/todoReducer";

/* Context */
import { ErrorProvider, useErrorContext } from "@/context/errorContext";
import { SuccessProvider, useSuccessContext } from "@/context/successContext";

/* Components */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import TodoPagination from "./components/todoPagination";

/* States */
import React, { useReducer, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

/* Controller */
import { addTodo, checkTodo, deleteTodo, updateTodo } from "@/lib/controller";

function Header({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<TodoAction>;
  state: TodoState;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { error, setError } = useErrorContext();
  const { success, setSuccess } = useSuccessContext();

  useEffect(() => {
    if (title.trim() || content.trim()) {
      setSuccess("");
    }
  }, [title, content]);

  useEffect(() => {
    if (success) {
      setTitle("");
      setContent("");
      setError("");
    }
  }, [success, setSuccess]);

  const handleCopyTodo = () => {
    navigator.clipboard.writeText(JSON.stringify(state.todos));
  }

  return (
    <header>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Todoapp</h1>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add📝</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="grid gap-3">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    onChange={(e: React.FormEvent<HTMLInputElement>) =>
                      setTitle(e.currentTarget.value)
                    }
                    value={title}
                    className={cn(
                      error.includes("Title") && "border-2 border-destructive"
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Content</Label>
                  <Textarea
                    name="content"
                    onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                      setContent(e.currentTarget.value)
                    }
                    value={content}
                    className={cn(
                      error.includes("Content") && "border-2 border-destructive"
                    )}
                    rows={4}
                  />
                </div>
                <Button
                  onClick={() => {
                    addTodo(
                      {
                        title,
                        content,
                      },
                      dispatch,
                      setError,
                      setSuccess
                    );
                  }}
                  className="w-full"
                >
                  Add Todo
                </Button>
                {error && (
                  <div>
                    <small className="text-destructive">{error && error}</small>
                  </div>
                )}
                {success && (
                  <div>
                    <small className="text-emerald-500">
                      Added successfully🥳
                    </small>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Button title="copy todos" onClick={handleCopyTodo} variant="secondary" size="icon">
            📋
          </Button>
        </div>
      </div>
    </header>
  );
}

function TodoList({
  state,
  dispatch,
}: {
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}) {
  const postsPerPage = 6;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { error, setError } = useErrorContext();
  const { success, setSuccess } = useSuccessContext();

  const indexOfLastPost = state.currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentTodos = state.todos.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page: number) => {
    dispatch({ type: "nextPage", payload: page });
  };

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [title, content]);

  return (
    <div>
      <TodoPagination
        postsPerPage={postsPerPage}
        totalPosts={state.todos.length}
        paginate={paginate}
      />
      {currentTodos.length > 0 && (
        <div>
          <ul className="colums-1 sm:columns-2 auto-rows-fr">
            {currentTodos.map((todo) => (
              <div key={todo.id} className="inline-block w-full break-words mt-4">
                <Card
                  className={cn(
                    "relative",
                    todo.type === "done" && "border border-emerald-500"
                  )}
                >
                  <CardHeader>
                    <CardTitle>{todo.title}</CardTitle>
                    <CardDescription>{todo.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="w-[300px] pt-2">
                    <p>{todo.content}</p>
                    <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
                      <Button
                        onClick={() =>
                          checkTodo(
                            {
                              id: todo.id,
                              type: "done",
                            },
                            dispatch,
                            setError,
                            setSuccess
                          )
                        }
                        variant="secondary"
                        size="icon"
                      >
                        ✅
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="secondary" size="icon">
                            ✏️
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Todo</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid gap-3">
                              <Label>Title</Label>
                              <Input
                                type="text"
                                name="title"
                                onChange={(
                                  e: React.FormEvent<HTMLInputElement>
                                ) => setTitle(e.currentTarget.value)}
                                defaultValue={todo.title}
                                className={cn(
                                  error.includes("Title") &&
                                    "border-2 border-destructive"
                                )}
                              />
                            </div>
                            <div className="grid gap-3">
                              <Label>Content</Label>
                              <Textarea
                                name="content"
                                onChange={(
                                  e: React.FormEvent<HTMLTextAreaElement>
                                ) => setContent(e.currentTarget.value)}
                                defaultValue={todo.content}
                                className={cn(
                                  error.includes("Content") &&
                                    "border-2 border-destructive"
                                )}
                                rows={4}
                              />
                            </div>
                            <Button
                              onClick={() =>
                                updateTodo(
                                  {
                                    id: todo.id,
                                    title: title,
                                    content: content,
                                  },
                                  dispatch,
                                  setError,
                                  setSuccess
                                )
                              }
                              className="w-full"
                            >
                              Update
                            </Button>
                            {error && (
                              <div>
                                <small className="text-destructive">
                                  {error && error}
                                </small>
                              </div>
                            )}
                            {success && (
                              <div>
                                <small className="text-emerald-500">
                                  Updated successfully🥳
                                </small>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        onClick={() =>
                          deleteTodo(todo.id, dispatch, setError, setSuccess)
                        }
                        variant="destructive"
                        size="icon"
                        className="col-start-2"
                      >
                        🗑️
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </ul>
        </div>
      )}
      {currentTodos.length === 0 && (
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-center mt-4 py-12 md:py-24 bg-card w-full">
          <div className="relative w-52 h-52">
            <img
              src="./jho.jpg"
              alt="jho"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h6 className="text-[6rem] text-destructive">204</h6>
            <p className="text-3xl">No Todo Found😭</p>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useLocalStorage("todo");
  const [state, dispatch] = useReducer(todoReducer, {
    todos: value,
    filter: "default",
    currentPage: 1,
  });
  useEffect(() => {
    setValue(state.todos);
  }, [state]);

  return (
    <SuccessProvider>
      <ErrorProvider>
        <div className="p-8 pt-8 md:p-0 md:pt-8">
          <div className="max-w-3xl w-full mx-auto space-y-4">
            <Header state={state} dispatch={dispatch} />
            <TodoList state={state} dispatch={dispatch} />
          </div>
        </div>
      </ErrorProvider>
    </SuccessProvider>
  );
}

export default App;
