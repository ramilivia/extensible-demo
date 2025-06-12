import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'
import { useTheme } from '@chakra-ui/react'
import Button from '@/components/blocks/button'

export default function FullBleedVideo({ buttons, asset, title, description }) {
  
  const siteConfig = useSiteConfiguration();
  const theme = useTheme();
  const isVideo = asset?.mimeType?.includes('video/');
  
  return (
    <Box 
      position="relative" 
      w="100%"
      bg="white"
      mb={{ base: 8, md: 16 }}
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
        </GridItem>
      </Grid>
    </Box>
  )
}
