import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  addTodoService,
  deleteTodoByIDService,
  getTodoByIdService,
  getTodosService,
  updateTodoByIDService
 } from "@/lib/services/todo";
import { Todo } from "@/lib/schema/todoSchema";
import { TODOS_KEY , TODO_KEY_LIST } from "./keys";


// fetching all the task
export function useTodo() {
  return useQuery({
    queryKey: TODOS_KEY,
    queryFn: getTodosService,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1,
  });
}

export function useTodoByID(id : number) {
  return useQuery({
    queryKey: TODO_KEY_LIST(id),
    queryFn: () =>  getTodoByIdService(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 3,
    retryDelay: 1,
  });
}

export function useAddTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: Todo) => addTodoService(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
    retry: 3,
    retryDelay: 1,
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id : number) => deleteTodoByIDService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
    },
    retry: 3,
    retryDelay: 1,
  });
}
export function useUpdateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: number; note: Todo }) =>
      updateTodoByIDService(id, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: TODOS_KEY });
      queryClient.invalidateQueries({ queryKey: TODO_KEY_LIST(data.id) });
    },
  });
}
