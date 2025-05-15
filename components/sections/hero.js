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
      h={{ base: '70vh', md: '85vh' }}
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      overflow="hidden"
      bg="white"
    >
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        h="100%"
        position="relative"
      >
        {/* Image Section - Half Width */}
        <GridItem
          position="relative"
          h="100%"
          display={{ base: 'none', md: 'block' }}
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
          bg={{ base: 'white', md: 'transparent' }}
          display="flex"
          alignItems="center"
        >
          <Container 
            maxW="container.xl" 
            h="full"
            display="flex"
            alignItems="center"
            py={{ base: 20, md: 32 }}
            px={{ base: 6, md: 12 }}
          >
            <Stack 
              spacing={{ base: 8, md: 10 }} 
              maxW={{ base: '100%', md: '90%' }}
              textAlign="left"
              color="gray.800"
            >
              {/* Mobile Image */}
              {isMobile && (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  zIndex={-1}
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
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.8) 100%)"
                  />
                </Box>
              )}
              
              <Heading
                as="h1"
                fontSize={{ base: '3.5rem', md: '4.8rem', lg: '5.5rem' }}
                fontWeight="bold"
                lineHeight="1.05"
                letterSpacing="-0.04em"
                fontFamily="serif"
                color={siteConfig?.titlesFontColor?.hex || 'gray.800'}
                mb={2}
              >
                {title}
              </Heading>
              
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                maxW="2xl"
                fontWeight="normal"
                color={siteConfig?.textColor?.hex || 'gray.600'}
                lineHeight="1.8"
                letterSpacing="0.02em"
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
