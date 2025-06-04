import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function Hero({ buttons, image, title, description }) {
  const siteConfig = useSiteConfiguration()

  return (
    <Box 
      position="relative" 
      w="100%"
      bg="white"
      mb={{ base: 8, md: 16 }}
      sx={{
        '--container-height': '100%',
        '@container (min-height: 400px)': {
          '--heading-size': 'clamp(2.5rem, 8vh, 5.5rem)',
        },
        '@container (min-height: 600px)': {
          '--heading-size': 'clamp(3.8rem, 10vh, 5.5rem)',
        },
        '@container (min-height: 800px)': {
          '--heading-size': 'clamp(4.5rem, 12vh, 5.5rem)',
        },
      }}
      containerType="size"
      minH={{ base: '400px', lg: 'calc(100vh - 111px - 61px)' }}
      h={{ base: 'auto', lg: 'calc(100vh - 111px - 61px)' }}
    >
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        templateRows={{ base: 'auto', lg: '1fr' }}
        position="relative"
        h={{ base: 'auto', lg: '100%' }}
      >
        {/* Image Section - Full Width on Mobile, Half Width on Desktop */}
        <GridItem
          position="relative"
          minH={{ base: '400px', lg: '100%' }}
          h={{ base: 'auto', lg: '100%' }}
          display="block"
          order={{ base: 2, lg: 1 }}
        >
          <Box
            as="img"
            src={image?.url}
            alt={image?.alt}
            w="100%"
            h="100%"
            minH={{ base: '400px', lg: '100%' }}
            objectFit="cover"
            objectPosition="center"
            style={{ display: 'block' }}
          />
        </GridItem>

        {/* Content Section */}
        <GridItem
          position="relative"
          zIndex={2}
          bg="white" 
          display="flex"
          alignItems="center"
          order={{ base: 1, lg: 2 }}
          h={{ base: 'auto', lg: '100%' }}
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
              maxW={{ base: '100%', md: '720px' }}
              textAlign="left"
              color="gray.800"
              h="auto"
            >
              <Heading
                as="h1"
                fontSize="var(--heading-size, clamp(2.5rem, 8vh, 5.5rem))"
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
