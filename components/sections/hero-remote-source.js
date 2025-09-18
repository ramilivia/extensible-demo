import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem, useTheme } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function HeroRemoteSource({ buttons, image, title, description }) {
  const siteConfig = useSiteConfiguration()
  const theme = useTheme()

  return (
    <Box 
      position="relative" 
      w="100vw" 
      left="50%"
      right="50%"
      marginLeft="-50vw"
      marginRight="-50vw"
      overflow="hidden"
      bg={siteConfig?.backgroundColor?.hex || 'white'}
      mb={0}
      sx={{
        '--container-height': '100%',
        '@container (min-height: 400px)': {
          '--heading-size': 'clamp(2.5rem, 8vh, 5.5rem)',
        },
        '@container (min-height: 600px)': {
          '--heading-size': 'clamp(3.8rem, 10vh, 5.5rem)',
        },
        '@container (min-height: 800px)': {
          '--heading-size': '5.5rem',
        },
      }}
      containerType="size"
      minH={{ base: 'auto', lg: `calc(100vh - ${theme.navigationHeight} - ${theme.bannerHeight})` }}
      h={{ base: 'auto', lg: `calc(100vh - ${theme.navigationHeight} - ${theme.bannerHeight})` }}
    >
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        templateRows={{ base: 'auto', lg: '1fr' }}
        position="relative"
        h={{ base: 'auto', lg: '100%' }}
        gap={{ base: 4, lg: 0 }}
      >
        {/* Image Section - Full Width on Mobile, Half Width on Desktop */}
        <GridItem
          position="relative"
          minH={{ base: '300px', md: '400px', lg: '100%' }}
          h={{ base: 'auto', lg: '100%' }}
          display="block"
          order={{ base: 2, lg: 1 }}
          mb={0}
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
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              position="relative"
              w="100%"
              h="100%"
            >
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                priority
                quality={100}
                style={{ height: '100%', width: '100%' }}
              />
            </Box>
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
          bg={siteConfig?.backgroundColor?.hex || 'white'} 
          display="flex"
          alignItems="center"
          order={{ base: 1, lg: 2 }}
          h={{ base: 'auto', lg: '100%' }}
          mb={0}
        >
          <Container 
            maxW="container.xl" 
            h="auto"
            display="flex"
            alignItems="center"
            py={{ base: 16, md: 32 }}
            px={{ base: 4, md: 12 }}
          >
            <Stack 
              spacing={{ base: 8, md: 10 }} 
              maxW={{ base: '100%', md: '630px' }}
              textAlign="left"
              color={siteConfig?.textColor?.hex || 'gray.800'}
              h="auto"
            >
              <Heading
                as="h1"
                fontSize={{ base: 'var(--heading-size, clamp(2.5rem, 8vh, 5.5rem))', lg: '5rem' }}
                fontWeight="bold"
                lineHeight={{ base: '1.2', md: '1.05' }}
                letterSpacing="-0.04em"
                fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
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
                  w="100%"
                  maxW="100%"
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
                      w={{ base: '100%', lg: 'auto' }}
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
