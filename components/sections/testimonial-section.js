import { Box, Container, Flex, Stack, Heading, Text, Avatar, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'

export default function TestimonialSection({
    title,
    content,
    personName,
    personProfession,
    personImage,
    siteConfiguration,
    id,
}) {
  const siteConfig = siteConfiguration
  // Responsive font size for the heading
  const headingFontSize = useBreakpointValue({ base: '2xl', md: '3xl', lg: '4xl' })

  // Handle content that might be an object with markdown/mdx
  const testimonialContent = typeof content === 'object' 
    ? (content.markdown || content.mdx || '') 
    : content

  return (
    <Box bg={siteConfig?.backgroundColor?.hex || '#f9f6f5'} borderRadius="2xl" py={{ base: 12, md: 20 }} px={{ base: 6, md: 8 }}>
      <Container maxW="8xl">
        <Flex
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 12, md: 16, lg: 16 }}
        >
          {/* Testimonial Content */}
          <Box flex={1} position="relative" w="full" order={{ base: 1, md: 1, lg: 2 }}>
            <Heading
              as="h2"
              fontSize={headingFontSize}
              fontWeight="bold"
              color={siteConfig?.titlesFontColor?.hex || 'brand.900'}
              mb={6}
              fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
              data-hygraph-entry-id={id}
              data-hygraph-field-api-id="sectionTitle"
            >
              {title}
            </Heading>
            <Box display="flex" alignItems="flex-start" mb={2}>
              {/* Opening quote */}
              <Box 
                as="span" 
                color={siteConfig?.titlesFontColor?.hex || 'red.400'} 
                fontSize={{ base: '6xl', md: '7xl' }} 
                mr={2} 
                mt={{ base: -4, md: -6 }}
                fontWeight="light"
                opacity={0.9}
                lineHeight="1"
                transform="rotate(-5deg)"
                style={{ fontFamily: siteConfig?.typography === 'serif' ? "'Times New Roman', serif" : 'Helvetica, Arial, sans-serif' }}
              >
                &#x201C;
              </Box>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                color={siteConfig?.textColor?.hex || 'gray.700'}
                fontWeight="medium"
                lineHeight="1.8"
                pl={2}
                data-hygraph-entry-id={id}
                data-hygraph-field-api-id="content"
              >
                {testimonialContent}
              </Text>
            </Box>
            {/* Closing quote, aligned to the right */}
            <Box display="flex" justifyContent="flex-end" mt={2} pr={0}>
              <Box 
                as="span" 
                color={siteConfig?.titlesFontColor?.hex || 'red.400'} 
                fontSize={{ base: '6xl', md: '7xl' }}
                fontWeight="light"
                opacity={0.9}
                lineHeight="1"
                mt={{ base: -8, md: -10 }}
                transform="rotate(5deg)"
                style={{ fontFamily: siteConfig?.typography === 'serif' ? "'Times New Roman', serif" : 'Helvetica, Arial, sans-serif' }}
                ml="auto"
                mr={-4}
              >
                &#x201D;
              </Box>
            </Box>
          </Box>

          {/* Expert Info */}
          <Stack align="center" spacing={4} minW={{ md: '280px' }} order={{ base: 2, md: 2, lg: 1 }}>
            <Box
              borderRadius="full"
              overflow="hidden"
              w={{ base: '140px', md: '180px' }}
              h={{ base: '140px', md: '180px' }}
              boxShadow="md"
              bg={siteConfig?.backgroundColor?.hex || 'white'}
              data-hygraph-entry-id={id}
              data-hygraph-field-api-id="personImage"
            >
              {personImage?.url ? (
                <Image
                  src={personImage.url}
                  alt={personImage.alt || personName}
                  width={personImage.width || 180}
                  height={personImage.height || 180}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  priority
                />
              ) : (
                <Avatar name={personName} size="2xl" />
              )}
            </Box>
            <Heading as="h3" fontSize="xl" fontWeight="semibold" color={siteConfig?.titlesFontColor?.hex || 'brand.900'} textAlign="center" data-hygraph-entry-id={id} data-hygraph-field-api-id="personName">
              {personName}
            </Heading>
            <Text color={siteConfig?.titlesFontColor?.hex || 'red.400'} fontSize="md" textAlign="center" data-hygraph-entry-id={id} data-hygraph-field-api-id="personProfession">
              {personProfession}
            </Text>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}
