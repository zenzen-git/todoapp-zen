import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types";

const DEFAULT_KEY = "todos";

function useLocalStorage(
  key: string = DEFAULT_KEY
): [Todo[] | [], React.Dispatch<React.SetStateAction<Todo[] | []>>] {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key ?? DEFAULT_KEY);
    return item ? JSON.parse(item) : [];
  });
  useEffect(() => {
    localStorage.setItem(key ?? DEFAULT_KEY, JSON.stringify(value));
  }, [value, setValue]);
  return [value, setValue];
}

export default useLocalStorage;