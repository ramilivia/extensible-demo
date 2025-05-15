import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'
import Navigation from '@/components/sections/navigation'

export default function Hero({ buttons, image, title, description }) {
  const isMobile = useBreakpointValue({ base: true, md: false })
  const siteConfig = useSiteConfiguration()

  return (
    <Box 
      position="relative" 
      w="100vw" 
      h={{ base: '70vh', md: '85vh' }}
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      overflow="hidden"
      bg="black"
    >
      {/* Image Section - Full Width */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        w="100%"
        h="100%"
        opacity={0.85}
      >
        <Image
          src={image.url}
          alt={image.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority
          quality={100}
        />
        {/* Subtle Gradient Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 100%)"
        />
      </Box>

      {/* Content Section - Overlay */}
      <Container 
        maxW="container.xl" 
        position="relative" 
        zIndex={2}
        h="full"
        display="flex"
        alignItems="center"
        py={{ base: 20, md: 32 }}
      >
        <Stack 
          spacing={{ base: 8, md: 10 }} 
          maxW={{ base: '100%', md: '60%' }}
          textAlign="left"
          color="white"
          pl={{ base: 0, md: 12 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: '3.5rem', md: '4.8rem', lg: '5.5rem' }}
            fontWeight="bold"
            lineHeight="1.05"
            letterSpacing="-0.04em"
            fontFamily="serif"
            color="white"
            mb={2}
          >
            {title}
          </Heading>
          
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            maxW="2xl"
            fontWeight="normal"
            color="white"
            lineHeight="1.8"
            letterSpacing="0.02em"
            textShadow="0 1px 2px rgba(0,0,0,0.3)"
            opacity={0.95}
          >
            {description}
          </Text>

          {buttons && buttons.length > 0 && (
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              spacing={8}
              pt={4}
            >
              {buttons.map((button, index) => (
                <Button 
                  key={index} 
                  {...button} 
                  colorScheme="whiteAlpha"
                  size="LARGE"
                  fontWeight="normal"
                  letterSpacing="0.1em"
                  fontSize="sm"
                  textTransform="uppercase"
                  _hover={{ 
                    bg: 'whiteAlpha.200',
                    transform: 'translateY(-1px)'
                  }}
                  _active={{
                    bg: 'whiteAlpha.300'
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
