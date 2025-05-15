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
    <Box position="relative" bg="gray.50" minH={{ base: 'auto', md: '60vh' }} py={{ base: 8, md: 12 }}>
      <Container maxW="container.xl" h="full">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 8, md: 12 }}
          minH={{ base: 'auto'}}
        >
          {/* Content Section */}
          <Stack 
            spacing={6} 
            maxW={{ base: '100%', md: '40%' }}
            textAlign={{ base: 'center', md: 'left' }}
            justify="center"
            h="full"
          >
            <Heading
              as="h1"
              size="2xl"
              fontWeight="bold"
              color={siteConfig?.titlesFontColor?.hex}
              lineHeight="1.2"
            >
              {title}
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={siteConfig?.textColor?.hex}
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
            w={{ base: '100%', md: '55%' }}
            h={{ base: '300px', md: '100%' }}
            minH={{ base: '300px', md: '50vh' }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              style={{
                objectFit: 'cover',
                borderRadius: '12px',
                height: '100%',
                width: '100%'
              }}
              priority
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
