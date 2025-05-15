import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react'
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
      h={{ base: 'auto', md: '85vh' }}
      minH={{ base: '100vh', md: '85vh' }}
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      overflow="hidden"
      bg="white"
    >
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        templateRows={{ base: 'auto auto', md: '1fr' }}
        h="100%"
        position="relative"
      >
        {/* Image Section - Full Width on Mobile, Half Width on Desktop */}
        <GridItem
          position="relative"
          h={{ base: '50vh', md: '100%' }}
          display="block"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1}
            w="100%"
            h="100%"
            opacity={1}
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
              bg="linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)"
            />
          </Box>
        </GridItem>

        {/* Content Section */}
        <GridItem
          position="relative"
          zIndex={2}
          bg="white"
          display="flex"
          alignItems="center"
        >
          <Container 
            maxW="container.xl" 
            h="full"
            display="flex"
            alignItems="center"
            py={{ base: 16, md: 32 }}
            px={{ base: 4, md: 12 }}
          >
            <Stack 
              spacing={{ base: 8, md: 10 }} 
              maxW={{ base: '100%', md: '90%' }}
              textAlign="left"
              color="gray.800"
            >
              <Heading
                as="h1"
                fontSize={{ base: '2.5rem', md: '3.8rem', lg: '5.5rem' }}
                fontWeight="bold"
                lineHeight={{ base: '1.2', md: '1.05' }}
                letterSpacing="-0.04em"
                fontFamily="serif"
                color={siteConfig?.titlesFontColor?.hex || 'gray.800'}
                mb={{ base: 4, md: 2 }}
              >
                {title}
              </Heading>
              
              <Text
                fontSize={{ base: 'sm', md: 'lg' }}
                maxW="2xl"
                fontWeight="normal"
                color={siteConfig?.textColor?.hex || 'gray.600'}
                lineHeight={{ base: '1.6', md: '1.8' }}
                letterSpacing="0.02em"
                opacity={0.95}
                mb={{ base: 6, md: 0 }}
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
                      colorScheme="gray"
                      size="LARGE"
                      fontWeight="normal"
                      letterSpacing="0.1em"
                      fontSize="sm"
                      textTransform="uppercase"
                      _hover={{ 
                        bg: 'gray.100',
                        transform: 'translateY(-1px)'
                      }}
                      _active={{
                        bg: 'gray.200'
                      }}
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  )
}
