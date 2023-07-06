"use client"

import { useDisclosure, Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import DeleteModal from './DeleteModal';

const deleteTodo = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

const TodoListing = ({todos, isLoading, error}) => {
  const queryClient = useQueryClient()  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = React.useState(null);

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      const updatedTodos = todos.filter((todo) => todo.id !== selectedTodo);
      queryClient.setQueryData('todos', updatedTodos); 
    },
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }

  const handleDelete = (todoId) => {
    setSelectedTodo(todoId);
    onOpen();
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedTodo);
    onClose();
  };

  return (
    <Box padding={5}>
      <Heading as="h1" size="2xl" my={4}>
        Todo List
      </Heading>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Status</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {todos.map((todo) => (
            <Tr key={todo.id}>
              <Td>{todo.title}</Td>
              <Td>{todo.completed ? 'Completed' : 'Pending'}</Td>
              <Td>
                <Button colorScheme="teal" size="sm" mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(todo.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirmDelete={handleConfirmDelete}
        todo={selectedTodo}
      />
    </Box>
  )
}

export default TodoListing