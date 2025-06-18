import { Box, SimpleGrid, Heading, Image, Link, Text } from '@chakra-ui/react'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

// Helper function to format date nicely
const formatEventDate = (dateString) => {
  if (!dateString) return ''
  
  try {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  } catch (error) {
    // Fallback to original date string if parsing fails
    return dateString
  }
}

export default function GridEventsSection({ eventCards: cards, sectionTitle: gridTitle, description, columnsNumber }) {
  const siteConfig = useSiteConfiguration()

  if (!cards || !cards.length) return null
  
  const columns = columnsNumber === 'THREE' ? 3 : columnsNumber === 'FOUR' ? 4 : 3

  return (
    <Box bg="white">
      <Box maxW="7.5xl" mx="auto" py={[12, 16]}>
        {gridTitle && (
          <Heading 
            as="h2" 
            fontSize={{ base: '2.25rem', md: '2.75rem', lg: '3.5rem', '2xl': '4.8rem' }}
            px={{ base: 4, md: 8, lg: 0 }}
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
        {description && (
          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            color={siteConfig?.textColor?.hex}
            maxW="2xl"
            whiteSpace="pre-wrap"
            mb={10}
          >
            {description}
          </Text>
        )}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: columns|| 3 }}
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
                />
              </Link>
              <Box mt={4} w="100%" textAlign={'left'}>
                <Link
                  href={card.link}
                  color={siteConfig?.titlesFontColor?.hex}
                  fontWeight="bold"
                  fontSize="2xl"
                  mb={0}
                  display="inline-block"
                >
                  {card.cardTitle}
                </Link>
                <Text color={siteConfig?.textColor?.hex} fontSize="md" mt={4}>
                  {formatEventDate(card.date)} {card.recurrence && `/ ${card.recurrence.charAt(0).toUpperCase() + card.recurrence.slice(1)}`}
                </Text>
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