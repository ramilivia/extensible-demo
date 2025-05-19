import { Box, SimpleGrid, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

export default function GridCardSection({ gridCards: cards, sectionTitle: gridTitle }) {
  const siteConfig = useSiteConfiguration()

  if (!cards || !cards.length) return null
  
  return (
    <Box bg="white">
      <Box maxW="8xl" mx="auto" py={[12, 16]}>
        {gridTitle && (
          <Heading 
            as="h2" 
            fontSize={{ base: '2.25rem', md: '2.75rem', lg: '3.5rem' }}
            marginLeft={{ base: 4, md: 0 }}
            fontWeight="bold"
            lineHeight="1.05"
            letterSpacing="-0.04em"
            fontFamily="serif"
            color={siteConfig?.textColor?.hex} 
            mb={10}
          >
            {gridTitle}
          </Heading>
        )}
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 3 }}
          spacing={{ base: 8, md: 12 }}
          px={{ base: 4, md: 8, lg: 0 }}
          justifyItems="center"
        >
          {cards.map((card) => (
            <Box
              key={card.cardTitle}
              bg="white"
              borderRadius="lg"
              w="100%"
              maxW="400px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              overflow="hidden"
            >
              <Link href={card.link} w="100%" display="flex" justifyContent="center">
                <Image
                  src={card?.image?.url}
                  alt={card.cardTitle}
                  w="100%"
                  h={56}
                  objectFit="cover"
                />
              </Link>
              <Box mt={4} w="100%" textAlign="left">
                <Link
                  href={card.link}
                  color={siteConfig?.titlesFontColor?.hex}
                  fontWeight="bold"
                  fontSize="2xl"
                  mb={2}
                  display="inline-block"
                >
                  {card.cardTitle}
                </Link>
                <Text color={siteConfig?.textColor?.hex} fontSize="md" mt={4}>
                  {card.description}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
} 