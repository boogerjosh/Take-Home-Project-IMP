"use client"

import React, {useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Switch,
  Button,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';

const EditModal = ({ isOpen, onClose, todo, queryClient, todos }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm();

  const editMutation = useMutation({
    mutationFn: (updatedTodo) => {
      const updatedTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
      queryClient.setQueryData('todos', updatedTodos);
    },
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (data) => {
    const updatedTodo = {
      ...todo,
      title: data.title,
      completed: data.completed || false,
    };
    editMutation.mutate(updatedTodo);
  };

  useEffect(() => {
    if (isOpen) {
      reset(todo);
    }
  }, [isOpen, reset, todo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                <Switch id="completed" {...register('completed')} />
              </FormControl>

              <Button colorScheme="teal" type="submit">
                Update
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;