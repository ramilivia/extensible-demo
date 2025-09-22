import { Box, SimpleGrid, Heading, Image, Link, Text, Stack } from '@chakra-ui/react'
import Button from '@/components/blocks/button'
import { FONT_SIZES } from '@/lib/constants'

export default function GridCardSection({ id, gridCards: cards, sectionTitle: gridTitle, description, columnsNumber, cardTextAlignment, areImagesSameHeight, middleCrop, siteConfiguration }) {
  const siteConfig = siteConfiguration

  if (!cards || !cards.length) return null
  
  const columns = columnsNumber === 'THREE' ? 3 : columnsNumber === 'FOUR' ? 4 : 3

  return (
    <Box bg={siteConfig?.backgroundColor?.hex || 'white'}>
      <Box maxW="7.5xl" mx="auto" py={[12, 16]}>
        {gridTitle && (
          <Heading 
            as="h2" 
            fontSize={FONT_SIZES.TITLE_MEDIUM}
            px={{ base: 4, md: 6, lg: 0 }}
            marginLeft={{ base: 4, md: 0 }}
            fontWeight="bold"
            lineHeight="1.05"
            letterSpacing="-0.04em"
            fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
            color={siteConfig?.textColor?.hex} 
            mb={10}
            data-hygraph-entry-id={id}
            data-hygraph-field-api-id="title"
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
            data-hygraph-entry-id={id}
            data-hygraph-field-api-id="description"
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
              bg={siteConfig?.backgroundColor?.hex || 'white'}
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
                  data-hygraph-entry-id={id}
                  data-hygraph-field-api-id="image"
                  h={areImagesSameHeight ? 'auto' : 56 }
                  objectFit={middleCrop ? 'cover' : 'contain'}
                />
              </Link>
              <Box mt={4} w="100%" textAlign={cardTextAlignment || 'left'}>
                <Link
                  href={card.link}
                  color={siteConfig?.titlesFontColor?.hex}
                  fontWeight="bold"
                  fontSize="2xl"
                  mb={2}
                  display="inline-block"
                  data-hygraph-entry-id={id}
                  data-hygraph-field-api-id="title"
                >
                  {card.cardTitle}
                </Link>
                <Text 
                  color={siteConfig?.textColor?.hex} 
                  fontSize="md" mt={4}
                  data-hygraph-entry-id={id}
                  data-hygraph-field-api-id="description"
                >
                  {card.description}
                </Text>
                {card.button && (
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    spacing={4}
                    justify={{ base: 'center', md: 'flex-start' }}
                    mt={4}
                    data-hygraph-entry-id={id}
                    data-hygraph-field-api-id="buttons"
                  >
                    <Button {...card.button} siteConfiguration={siteConfiguration} />
                  </Stack>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
} 