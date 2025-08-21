"use client"

import React, { useState } from 'react'
import { useTodo, useDeleteTodo, useUpdateTodo } from '@/hooks/queries/todos'

interface TodoItem {
  id: number
  title: string
  description?: string
  completed: boolean
}

const ListTodo = () => {
  const { data: todos, isLoading, isError } = useTodo()
  const deleteTodo = useDeleteTodo()
  const updateTodo = useUpdateTodo()
  const [editId, setEditId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleDelete = (id: number) => {
    deleteTodo.mutate(id)
  }

  const handleToggleComplete = (id: number, completed: boolean, title: string, description?: string) => {
    updateTodo.mutate({ 
      id, 
      note: { 
        title, 
        completed: !completed,
        description 
      } 
    })
  }

  const handleEdit = (id: number, title: string, description?: string) => {
    setEditId(id)
    setEditTitle(title)
    setEditDescription(description || '')
  }

  const handleUpdate = () => {
    if (editId) {
      const currentTodo = todos?.find((todo: TodoItem) => todo.id === editId)
      updateTodo.mutate({ 
        id: editId, 
        note: {
          title: editTitle,
          completed: currentTodo?.completed || false,
          description: editDescription || undefined
        }
      })
      setEditId(null)
    }
  }

  if (isLoading) return <div className="text-center py-4">Loading...</div>
  if (isError) return <div className="text-center py-4 text-red-500">Error loading todos</div>

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>
      
      
      <ul className="mt-6 space-y-2">
        {todos && todos.length > 0 ? (
          todos.map((todo: TodoItem) => (
            <li key={todo.id} className="flex items-center justify-between p-3 bg-white rounded shadow">
              {editId === todo.id ? (
                <div className="flex flex-col w-full space-y-2">
                  <input 
                    type="text" 
                    value={editTitle} 
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    className="p-2 border rounded"
                  />
                  <input 
                    type="text" 
                    value={editDescription} 
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="p-2 border rounded"
                  />
                  <button 
                    onClick={handleUpdate}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo.id, todo.completed, todo.title, todo.description)}
                      className="mr-2"
                    />
                    <div className={todo.completed ? 'line-through text-gray-500' : ''}>
                      <div className="font-medium">{todo.title}</div>
                      {todo.description && (
                        <div className="text-sm text-gray-600">{todo.description}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <button 
                      onClick={() => handleEdit(todo.id, todo.title, todo.description)}
                      className="px-2 py-1 text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(todo.id)}
                      className="px-2 py-1 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No todos yet. Add one above!</p>
        )}
      </ul>
    </div>
  )
}

export default ListTodo