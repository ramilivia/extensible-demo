import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function AlternatingPanels({ buttons, image, alternatingPanelsTitle, description, assetPosition = 'right' }) {

  const siteConfig = useSiteConfiguration()
console.log(alternatingPanelsTitle, 'TITLE')

  return (
    <Box position="relative" bg="gray.50" minH={{ base: 'auto' }} py={{ base: 8, md: 10, lg: 50 }}>
      <Container maxW="container.xl" h="full">
        <Flex
          direction={{ base: 'column', md: assetPosition === 'right' ? 'row' : 'row-reverse' }}
          align={{ base: 'center', md: 'center' }}
          justify="space-between"
          gap={{ base: 8, md: 12 }}
          minH={{ base: 'auto', md: '420px', lg: '600px' }}
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
              fontSize={{ base: '1.75rem', md: '2.75rem', lg: '3.5rem' }}
              fontWeight="bold"
              lineHeight="1.05"
              letterSpacing="-0.04em"
              fontFamily="serif"
              color={siteConfig?.titlesFontColor?.hex}
            >
              {alternatingPanelsTitle}
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
            minH={{ base: '300px' }}
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
