"use client"
import React from 'react'
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Switch, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const TodoForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission
    const todo = {
        userId: 1,
        id: 1,
        title: data.title,
        completed: data.completed || false
    };
    console.log(todo);
  };

  return (
    <Box maxW="md" mx="auto" mt={4} border="">
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