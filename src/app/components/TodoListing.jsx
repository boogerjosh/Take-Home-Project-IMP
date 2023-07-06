"use client"

import { useDisclosure, Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import React from 'react'
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import DeleteModal from './DeleteModal';

const fetchTodos = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: {
        _limit: 10, // Limiting to 10 results
        _sort: 'id', // Sorting by ID in ascending order (assuming higher IDs are newer)
        _order: 'desc' // Sorting in descending order to get the newest data first
        }
    });
    return response.data;
};

const deleteTodo = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
};

const TodoListing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = React.useState(null);
  const { data: todos, isLoading, error, refetch } = useQuery('todos', fetchTodos);
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      refetch();
      onClose();
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
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => handleEdit(todo.id)}>
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