import { Todo } from "../schema/todoSchema";

const BASE_URL = "/api/v1/notes";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }
  return res.json();
}

export const addTodoService = async (note: Todo) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse(res);
};

export const deleteTodoByIDService = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
};

export const getTodoByIdService = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
  });
  return handleResponse(res);
};

export const getTodosService = async () => {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });
  return handleResponse(res);
};

export const updateTodoByIDService = async (id: number, note: Todo) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT", // or PATCH if partial update
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return handleResponse(res);
};
