import { useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Flex, Stack, Heading, useBreakpointValue, IconButton } from '@chakra-ui/react';
import Button from '@/components/blocks/button'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

export default function FeaturedCarouselSection({ featuredCarouselTitle: title, description, cards, buttons, backgroundColor, textColor }) {
  const sliderRef = useRef(null);
  const siteConfig = useSiteConfiguration();


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    initialSlide: 0,
    slidesToScroll: 2.5,
    arrows: false,
  };

  console.log(cards, 'CARDS')

  // Responsive height for carousel cards
  const cardHeight = useBreakpointValue({ base: '220px', md: '340px', lg: '400px' });

  return (
    <Box bg={backgroundColor?.hex || siteConfig?.backgroundColor?.hex || 'unset' } py={{ base: 8, md: 20 }} px={{ base: 0, md: 0 }} minH={{ base: 'auto', md: '600px' }}>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify={{ base: 'flex-start', lg: 'space-between' }}
        maxW="7.5xl"
        mx="auto"
        px={{ base: 4, md: 8, lg: 0 }}
        gap={{ base: 10, lg: 16 }}
      >
        {/* Left Panel */}
        <Stack
          spacing={6}
          maxW={{ base: '100%', lg: '40%' }}
          textAlign="left"
          justify="center"
          h="full"
          w="full"
          color={textColor?.hex || siteConfig?.textColor?.hex || 'white'}
        >
          <Flex align="center" gap={4} mb={2}>
            <IconButton
              aria-label="Previous"
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              onClick={() => sliderRef.current?.slickPrev()}
              variant="ghost"
              color={textColor?.hex || siteConfig?.textColor?.hex}
              fontSize="2xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              _focus={{ outline: 'none' }}
              minW="auto"
              size="lg"
            />
            <IconButton
              aria-label="Next"
              icon={
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              onClick={() => sliderRef.current?.slickNext()}
              variant="ghost"
              color={textColor?.hex || siteConfig?.textColor?.hex}
              fontSize="2xl"
              _hover={{ bg: 'whiteAlpha.200' }}
              _focus={{ outline: 'none' }}
              minW="auto"
              size="lg"
            />
          </Flex>
          <Heading
              as="h1"
              fontSize={{ base: '2.25rem', md: '2.75rem', lg: '4.8rem' }}
              fontWeight="bold"
              lineHeight="1.05"
              letterSpacing="-0.04em"
              fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
              color={textColor?.hex || siteConfig?.textColor?.hex || 'white'}
            >
            {title}
          </Heading>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color={textColor?.hex || siteConfig?.textColor?.hex || 'white'} maxW="2xl" whiteSpace="pre-wrap">
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

        {/* Right Panel: Carousel */}
        <Box w={{ base: '100%', lg: '55%' }} sx={{
          '.slick-slide': {
            padding: '0 8px',
          },
          '.slick-list': {
            margin: '0 -8px',
          }
        }}>
          <Slider ref={sliderRef} {...settings}>
            {cards && cards.map((card, i) => (
              <Box
                key={i}
                px={0}
                my={4}
                borderRadius="lg"
                overflow="hidden"
                position="relative"
                h={cardHeight}
                boxShadow="md"
                display="flex"
                alignItems="flex-end"
                justifyContent="center"
              >
                <Box
                  as="img"
                  src={card.image.url}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  alt={card.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '12px',
                  }}
                />
                <Box
                  position="absolute"
                  bottom="0"
                  w="100%"
                  bg="rgba(0,0,0,0.6)"
                  py={4}
                  px={2}
                  textAlign="center"
                >
                  <Text fontSize={{ base: 'lg', md: 'xl' }} color={textColor?.hex || siteConfig?.textColor?.hex } maxW="2xl" whiteSpace="pre-wrap">
                    {card.title}
                  </Text>
                  <Text fontSize="md" color={textColor?.hex || siteConfig?.textColor?.hex} mt={2}>
                    {card.description}
                  </Text>
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Flex>
    </Box>
  );
}