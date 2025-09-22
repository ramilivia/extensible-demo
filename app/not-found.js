'use client'

import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { FONT_SIZES } from '@/lib/constants'

export default function NotFound() {
  return (
    <ChakraProvider>
      <Box 
        minH="100vh" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg="gray.50"
      >
        <VStack spacing={6} textAlign="center" p={8}>
          <Heading as="h1" fontSize={FONT_SIZES.H1} color="gray.700">
            404
          </Heading>
          <Heading as="h2" size="lg" color="gray.600">
            Page Not Found
          </Heading>
          <Text color="gray.500" maxW="md">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Text>
          <Button as={Link} href="/" colorScheme="blue" size="lg">
            Go Home
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
