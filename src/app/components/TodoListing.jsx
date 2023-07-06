"use client"

import { useDisclosure, Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { EditModal, DeleteModal } from '../components';

const TodoListing = ({ todos, isLoading, error }) => {
  const queryClient = useQueryClient();
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState(null);

  const deleteMutation = useMutation({
    mutationFn: (todoId) => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      queryClient.setQueryData('todos', updatedTodos);
    },
  });

  const handleDelete = (todoId) => {
    setSelectedTodo(todoId);
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    deleteMutation.mutate(selectedTodo);
    closeDeleteModal();
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    openEditModal();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error occurred: {error.message}</Text>;
  }

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
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => handleEdit(todo)}>
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
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirmDelete={handleConfirmDelete}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        todo={selectedTodo}
        queryClient={queryClient}
        todos={todos}
      />
    </Box>
  );
};

export default TodoListing;
