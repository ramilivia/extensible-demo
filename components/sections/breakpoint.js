import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function Breakpoint({ buttons, subtitle, title }) {
  const siteConfig = useSiteConfiguration()
  if (!(buttons || buttons.length)) return null

  return (
    <Box bg="white">
      <Box maxW="7.5xl" mx="auto" py={[12, null, 16, 20]} px={{ base: 4, md: 6, lg: 0 }}>
        <Heading
          as="h2"
          fontSize={{ base: '1.75rem', md: '2.75rem', lg: '3.5rem' }}
          fontWeight="bold"
          lineHeight="1.05"
          letterSpacing="-0.04em"
          fontFamily="serif"
          color={siteConfig?.textColor?.hex}
        >
          <Text as="span" display="block" color={siteConfig?.titlesFontColor?.hex}>
            {title}
          </Text>
          <Text as="span" display="block" color={siteConfig?.textColor?.hex}>
            {subtitle}
          </Text>
        </Heading>
        <Stack display="flex" direction="row" mt={8} spacing={3}>
          {buttons.map((button) => (
            <Box
              key={button.id}
              display="inline-flex"
              borderRadius="md"
              boxShadow="md"
            >
              <Button {...button} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
