import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

import Button from '@/components/button'
import Navigation from '@/components/blocks/navigation'

export default function Hero({ buttons, image, title, description }) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <Box position="relative" bg="gray.50" py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 8, md: 12 }}
        >
          {/* Content Section */}
          <Stack 
            spacing={6} 
            maxW={{ base: '100%', md: '50%' }}
            textAlign={{ base: 'center', md: 'left' }}
          >
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color="gray.900"
              lineHeight="1.2"
            >
              {title}
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.600"
              maxW="2xl"
            >
              {description}
            </Text>

            {buttons && buttons.length > 0 && (
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'flex-start' }}
                pt={4}
              >
                
                {buttons.map((button, index) => (
                  <Button key={index} {...button}/>
                ))}
              </Stack>
            )}
          </Stack>

          {/* Image Section */}
          <Box
            position="relative"
            w={{ base: '100%', md: '45%' }}
            h={{ base: '300px', md: '500px' }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
              }}
              priority
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
