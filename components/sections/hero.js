import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem, useTheme } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function Hero({ buttons, asset, title, description }) {
  const siteConfig = useSiteConfiguration()
  const theme = useTheme()

  return (
    <Box 
      position="relative" 
      w="100%"
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
      h={{ base: 'auto', lg: `auto` }}
    >
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        templateRows={{ base: 'auto', lg: '1fr' }}
        position="relative"
        h="100%"
        minH="inherit"
        gap={{ base: 4, lg: 0 }}
      >
        {/* Image/Video Section - Full Width on Mobile, Half Width on Desktop */}
        <GridItem
          position="relative"
          minH={{ base: '300px', md: '400px', lg: 'inherit' }}
          h={{ base: 'auto', lg: '100%' }}
          display="block"
          order={{ base: 2, lg: 1 }}
          mb={0}
        >
          {asset?.mimeType?.includes('video') ? (
            <Box
              as="video"
              src={asset.url}
              autoPlay
              muted
              loop
              playsInline
              w="100%"
              h="100%"
              minH={{ base: '400px', lg: '100%' }}
              objectFit="cover"
              objectPosition="center"
              style={{ display: 'block' }}
            />
          ) : (
            <Box
              as="img"
              src={asset?.url}
              alt={asset?.alt}
              w="100%"
              h="100%"
              minH={{ base: '400px', lg: '100%' }}
              objectFit="cover"
              objectPosition="center"
              style={{ display: 'block' }}
            />
          )}
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
          minH={{ base: 'auto', lg: 'inherit' }}
          mb={0}
        >
          <Container 
            maxW="container.xl" 
            h="100%"
            display="flex"
            alignItems="center"
            py={{ base: 16, md: 32 }}
            px={{ base: 4, md: 12 }}
            bg={siteConfig?.backgroundColor?.hex || 'white'}
          >
            <Stack 
              spacing={{ base: 8, md: 10 }} 
              maxW={{ base: '100%', md: '630px' }}
              textAlign="left"
              color={siteConfig?.textColor?.hex || 'gray.800'}
              h="auto"
              w="100%"
            >
              <Heading
                as="h1"
                fontSize={{ base: 'var(--heading-size, clamp(2.5rem, 8vh, 5.5rem))', lg: '5rem' }}
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
