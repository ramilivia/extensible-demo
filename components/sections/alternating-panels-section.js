import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'

import Button from '@/components/blocks/button'

export default function AlternatingPanels({ buttons, image, alternatingPanelsTitle, description, assetPosition = 'right', backgroundColor, textColor, variants = [], siteConfiguration }) {

  const siteConfig = siteConfiguration

  return (
    <Box position="relative" bg={variants.length > 0 ? variants[0].backgroundColor?.hex : backgroundColor?.hex || siteConfig?.backgroundColor?.hex || 'unset' } minH={{ base: 'auto' }} py={{ base: 8, md: 30, lg: 50 }}>
      <Box maxW="7.5xl" mx="auto" py={{ base: 12, lg: 16 }} px={{ base: 0, lg: 0 }}>
        <Flex
          direction={{ base: 'column', lg: assetPosition === 'right' ? 'row' : 'row-reverse' }}
          align={{ base: 'flex-start', lg: 'center' }}
          justify={{ base: 'flex-start', lg: 'space-between' }}
          gap={{ base: 8, lg: 12 }}
          minH={{ base: 'auto', lg: '350px' }}
          px={{ base: 4, md: 6, lg: 0 }}
        >
          {/* Content Section */}
          <Stack 
            spacing={6} 
            maxW={{ base: '100%', lg: '40%' }}
            textAlign="left"
            justify="flex-start"
            h="full"
            w="full"
          >
            <Heading
              as="h1"
              fontSize={{ base: '2.25rem', md: '2.75rem', lg: '3.5rem', '2xl': '4.8rem' }}
              fontWeight="bold"
              lineHeight="1.05"
              letterSpacing="-0.04em"
              fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
              color={variants.length > 0 ? variants[0].textColor?.hex : textColor?.hex || siteConfig?.textColor?.hex}
            >
              {variants.length > 0 ? variants[0].alternatingPanelsTitle : alternatingPanelsTitle}
            </Heading>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color={variants.length > 0 ? variants[0].textColor?.hex : textColor?.hex || siteConfig?.textColor?.hex}
              maxW="2xl"
              whiteSpace="pre-wrap"
            >
              {variants.length > 0 ? variants[0].description : description}
            </Text>

            {buttons && buttons.length > 0 && (
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'flex-start' }}
                pt={4}
              >
                
                {buttons.map((button, index) => (
                  <Button key={index} {...button} siteConfiguration={siteConfiguration}/>
                ))}
              </Stack>
            )}
          </Stack>

          {/* Image Section */}
          <Box
            position="relative"
            w={{ base: '100%', lg: '55%' }}
            h={{ base: 'auto', lg: '100%' }}
            minH={{ base: '180px' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src={variants.length > 0 ? variants[0].image?.url : image?.url}
              alt={image?.alt}
              width={image?.width}
              height={image?.height}
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
      </Box>
    </Box>
  )
}
