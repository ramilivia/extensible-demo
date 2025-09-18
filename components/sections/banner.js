import { Box, Flex, Text } from '@chakra-ui/react'
import Button from '@/components/blocks/button'
import { LAYOUT_CONSTANTS } from '@/lib/constants'

export default function Banner({ content, button, siteConfiguration }) {
  const siteConfig = siteConfiguration
  
  if (!content || !button) return null

  return (
    <Box
      bg={siteConfig?.bannerBackground?.hex}
      color={siteConfig?.bannerFontColor?.hex}
      h={{ base: 'auto', md: LAYOUT_CONSTANTS.bannerHeight }}
    >
      <Box maxW="7.5xl" mx="auto" py={[3, 1]} px={[4, 6]}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Flex flex="1 1 0" alignItems="center">
            <Text fontWeight="medium" color={siteConfig?.bannerFontColor?.hex} fontSize="sm">
              {content}
            </Text>
          </Flex>
          <Box w={['full', 'auto']} order={[3, 2]} mt={[2, 0]} flexShrink="0">
            <Box borderRadius="md" boxShadow="sm">
              <Button
                href={button?.href}
                label={button?.label}
                size="SMALL"
                siteConfiguration={siteConfiguration}
                {...button}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
