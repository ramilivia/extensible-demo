import { Box, Flex, Text } from '@chakra-ui/react'
import Button from '@/components/blocks/button'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

export default function Banner({ content, button }) {
  
  if (!content || !button) return null

  const siteConfig = useSiteConfiguration()
  

  return (
    <Box
      bg={siteConfig?.bannerBackground?.hex}
      color={siteConfig?.bannerFontColor?.hex}
      h={{ base: 'auto', md: '7vh' }}
    >
      <Box maxW="7.5xl" mx="auto" py={3} px={[3, 6, null, 8]}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Flex flex="1 1 0" alignItems="center">
            <Text fontWeight="medium" color={siteConfig?.bannerFontColor?.hex}>
              {content}
            </Text>
          </Flex>
          <Box w={['full', 'auto']} order={[3, 2]} mt={[2, 0]} flexShrink="0">
            <Box borderRadius="md" boxShadow="sm">
              <Button
                href={button?.href}
                label={button?.label}
                size="SMALL"
                {...button}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
