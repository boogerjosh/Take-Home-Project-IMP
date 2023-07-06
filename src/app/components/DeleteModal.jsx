"use client"
import React from 'react'
import {
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from '@chakra-ui/react';

const DeleteModal = ({ isOpen, onClose, onConfirmDelete, todo }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Todo</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete the todo?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirmDelete} marginRight={2}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteModal