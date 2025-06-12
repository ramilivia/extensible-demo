import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem, useTheme } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'
import Button from '@/components/blocks/button'

export default function FullBleedVideo({ buttons, asset, title, description, opaque, textColor }) {
  
  const siteConfig = useSiteConfiguration();
  const theme = useTheme();
  const isVideo = asset?.mimeType?.includes('video/');
  
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
          '--heading-size': '5.5rem',
        },
      }}
      containerType="size"
      minH={{ base: '400px', lg: `calc(100vh - ${theme.navigationHeight} - ${theme.bannerHeight})` }}
      h={{ base: 'auto', lg: `calc(100vh - ${theme.navigationHeight} - ${theme.bannerHeight})` }}
    >
      <Grid
        templateColumns="1fr"
        position="relative"
        h={{ base: 'auto', lg: '100%' }}
      >
        {/* Media Section - Full Width */}
        <GridItem
          position="relative"
          minH={{ base: '400px', lg: '100%' }}
          h={{ base: 'auto', lg: '100%' }}
          display="block"
        >
          {isVideo ? (
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
              position="relative"
              w="100%"
              h="100%"
              minH={{ base: '400px', lg: '100%' }}
            >
              <Image
                src={asset.url}
                alt={title || 'Hero image'}
                width="100%"
                height="100%"
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                priority
              />
            </Box>
          )}

          {/* Content Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg={`rgba(0, 0, 0, ${opaque ? 0.35 : 0})`}
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="1"
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
                color="white"
                h="auto"
              >
                <Heading
                  as="h1"
                  fontSize={{ base: 'var(--heading-size, clamp(2.5rem, 8vh, 5.5rem))', lg: '5rem' }}
                  fontWeight="bold"
                  lineHeight={{ base: '1.2', md: '1.05' }}
                  letterSpacing="-0.04em"
                  fontFamily="serif"
                  mb={{ base: 4, md: 2 }}
                  color={textColor?.hex || siteConfig?.titlesFontColor?.hex}
                >
                  {title}
                </Heading>
                
                <Text
                  fontSize={{ base: 'sm', md: 'lg' }}
                  maxW="2xl"
                  fontWeight="normal"
                  color={textColor?.hex || siteConfig?.textColor?.hex}
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
                        colorScheme="whiteAlpha"
                        size="LARGE"
                        fontWeight="normal"
                        letterSpacing="0.1em"
                        fontSize="sm"
                        textTransform="uppercase"
                        w={{ base: '100%', lg: 'auto' }}
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
        </GridItem>
      </Grid>
    </Box>
  )
}
