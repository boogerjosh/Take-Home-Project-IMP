"use client"
import React from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Switch, VStack, Heading } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

const TodoForm = ({todos}) => {
  const queryClient = useQueryClient()  
  const { handleSubmit, register, formState: { errors }, reset } = useForm();

  const addTodo = useMutation({
    mutationFn: (newTodo) => {
      todos.push(newTodo);
      queryClient.setQueryData('todos', todos);
    },
    onSuccess: () => {
      reset(); // Reset the form inputs to empty
    }
  })

  const onSubmit = (data) => {
    // Handle form submission
    const todo = {
        userId: 1,
        id: uuidv4(),
        title: data.title,
        completed: data.completed || false
    };
    
    addTodo.mutate(todo);
  };

  return (
    <Box maxW="md" mx="auto" mt={4} border="">
      <Heading as="h3" size="md" my={4}>
        Create new Todo
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              {...register('title', { required: 'Title is required' })}
              placeholder="Enter title"
            />
            <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="completed">Completed</FormLabel>
            <Switch
              id="completed"
              {...register('completed')}
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">Submit</Button>
        </VStack>
      </form>
    </Box>
  )
}

export default TodoForm