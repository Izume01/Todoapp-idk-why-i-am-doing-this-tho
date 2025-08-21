"use client"

import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Checkbox } from './ui/checkbox'
import { Todo, todoSchema } from '@/lib/schema/todoSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import useStore from '@/store/todoStore'

const AddTask = () => {

    const {applyUpdates} = useStore()

    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: {
            title: '',
            description: '',
            completed: false
        }
    })
    const handleSubmit = (values: Todo) => {
        
        applyUpdates({
            title : values.title,
            description : values.description,
            completed : values.completed
        })
    }
    
    return (
        <Card className="w-full max-w-md mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder='Enter the title' 
                                            className="focus:ring-2 focus:ring-blue-500" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">Description</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder='Enter the Description' 
                                            className="focus:ring-2 focus:ring-blue-500" 
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-sm text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                    <FormControl>
                                        <Checkbox 
                                            checked={field.value} 
                                            onCheckedChange={field.onChange} 
                                            className="data-[state=checked]:bg-blue-500"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-medium">Mark as completed</FormLabel>
                                        <p className="text-sm text-gray-500">Task has already been completed</p>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button 
                            type='submit' 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
                        >
                            Add Task
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default AddTask