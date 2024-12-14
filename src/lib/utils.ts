import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Todo } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sortByDate(items: Todo[]){
  if(items.length !== null){
    return items.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
    })
  }
  return []
}