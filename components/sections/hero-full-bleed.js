import { Box, Container, Heading, Stack, Text, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import Button from '@/components/blocks/button'
import { LAYOUT_CONSTANTS } from '@/lib/constants'

export default function FullBleedVideo({ buttons, asset, title, description, opaque, textColor, contentPosition, siteConfiguration }) {
  
  const siteConfig = siteConfiguration;
  const isVideo = asset?.mimeType?.includes('video/');
  
  return (
    <Box 
      position="relative" 
      w="100%"
      bg={siteConfig?.backgroundColor?.hex || 'white'}
      mb={{ base: 8, md: 0 }}
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
      minH={{ base: `calc(100vh - ${LAYOUT_CONSTANTS.navigationHeight} - ${LAYOUT_CONSTANTS.bannerHeight})`, lg: `calc(100vh - ${LAYOUT_CONSTANTS.navigationHeight} - ${LAYOUT_CONSTANTS.bannerHeight})` }}
      h={{ base: `calc(100vh - ${LAYOUT_CONSTANTS.navigationHeight} - ${LAYOUT_CONSTANTS.bannerHeight})`, lg: `calc(100vh - ${LAYOUT_CONSTANTS.navigationHeight} - ${LAYOUT_CONSTANTS.bannerHeight})` }}
    >
      <Grid
        templateColumns="1fr"
        position="relative"
        h="100%"
      >
        {/* Media Section - Full Width */}
        <GridItem
          position="relative"
          minH="100%"
          h="100%"
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
                src={asset?.url}
                alt={title || 'Hero image'}
                layout="fill"
                objectFit="cover"
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
            alignItems={contentPosition === 'bottom_left' ? 'flex-end' : 'center'}
            justifyContent={contentPosition === 'bottom_left' ? 'flex-start' : 'center'}
            zIndex="1"
          >
            <Container 
              maxW="container.xl" 
              h="auto"
              display="flex"
              alignItems={contentPosition === 'bottom_left' ? 'flex-end' : 'center'}
              justifyContent={contentPosition === 'bottom_left' ? 'flex-start' : { base: 'center', lg: 'flex-start', '2xl': 'center' }}
              py={{ base: contentPosition === 'bottom_left' ? 8 : 16, md: contentPosition === 'bottom_left' ? 16 : 32 }}
              px={{ base: contentPosition === 'bottom_left' ? 4 : 4, md: contentPosition === 'bottom_left' ? 8 : 12 }}
              ml={contentPosition === 'bottom_left' ? { base: 0, md: '-4' } : { base: 0, lg: '8', '2xl': 0 }}
            >
              <Stack 
                spacing={{ base: contentPosition === 'bottom_left' ? 4 : 8, md: contentPosition === 'bottom_left' ? 6 : 10 }} 
                maxW={{ base: '100%', md: contentPosition === 'bottom_left' ? '400px' : '630px' }}
                textAlign="left"
                color={textColor?.hex || siteConfig?.textColor?.hex || 'white'}
                h="auto"
                ml={contentPosition === 'bottom_left' ? { base: 6, md: 12 } : 0}
              >
                <Heading
                  as="h1"
                  fontSize={{ 
                    base: contentPosition === 'bottom_left' 
                      ? 'var(--heading-size, clamp(2rem, 6vh, 4rem))' 
                      : 'var(--heading-size, clamp(2.5rem, 8vh, 4.5rem))', 
                    lg: contentPosition === 'bottom_left' ? '4rem' : '5rem' 
                  }}
                  fontWeight="bold"
                  lineHeight={{ base: '1.2', md: '1.05' }}
                  letterSpacing="-0.04em"
                  fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
                  mb={{ base: contentPosition === 'bottom_left' ? 2 : 4, md: contentPosition === 'bottom_left' ? 1 : 2 }}
                  color={textColor?.hex || siteConfig?.titlesFontColor?.hex}
                >
                  {title}
                </Heading>
                
                <Text
                  fontSize={{ base: contentPosition === 'bottom_left' ? 'xs' : 'sm', md: contentPosition === 'bottom_left' ? 'md' : 'lg' }}
                  maxW="2xl"
                  fontWeight="normal"
                  color={textColor?.hex || siteConfig?.textColor?.hex}
                  lineHeight={{ base: '1.6', md: '1.8' }}
                  letterSpacing="0.02em"
                  opacity={0.95}
                  mb={{ base: contentPosition === 'bottom_left' ? 4 : 6, md: 0 }}
                >
                  {description}
                </Text>

                {buttons && buttons.length > 0 && (
                  <Stack
                    direction={{ base: 'column', lg: contentPosition === 'bottom_left' ? 'row' : 'row' }}
                    spacing={contentPosition === 'bottom_left' ? 4 : 8}
                    pt={contentPosition === 'bottom_left' ? 2 : 4}
                    w="100%"
                    maxW="100%"
                  >
                    {buttons.map((button, index) => (
                      <Button 
                        key={index} 
                        {...button} 
                        colorScheme="whiteAlpha"
                        size={contentPosition === 'bottom_left' ? 'MEDIUM' : 'LARGE'}
                        fontWeight="normal"
                        letterSpacing="0.1em"
                        fontSize={contentPosition === 'bottom_left' ? 'xs' : 'sm'}
                        textTransform="uppercase"
                        w={{ base: '100%', lg: 'auto' }}
                        _hover={{ 
                          bg: 'whiteAlpha.200',
                          transform: 'translateY(-1px)'
                        }}
                        _active={{
                          bg: 'whiteAlpha.300'
                        }}
                        siteConfiguration={siteConfiguration}
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
