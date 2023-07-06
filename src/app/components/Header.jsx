"use client"

import { Box, Container, Flex, HStack, Link } from '@chakra-ui/react'

const Header = () => {
  return (
    <Box bg="gray.300">
        <Container maxW={1400}>
            <Flex justifyContent={"space-between"} alignItems="center" height={10}>
                <Box>Todo App</Box>
                <HStack>
                    <Link mx={4}>About</Link>
                </HStack>
            </Flex>
        </Container>
    </Box>
  )
}

export default Header