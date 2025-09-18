import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import Button from '@/components/blocks/button'

export default function Breakpoint({ buttons, subtitle, title, siteConfiguration }) {
  const siteConfig = siteConfiguration
  if (!(buttons || buttons.length)) return null

  return (
    <Box bg={siteConfig?.backgroundColor?.hex || 'white'}>
      <Box maxW="7.5xl" mx="auto" py={[12, null, 16, 20]} px={{ base: 4, md: 6, lg: 0 }}>
        <Heading
          as="h2"
          fontSize={{ base: '1.75rem', md: '2.75rem', lg: '3.5rem' }}
          fontWeight="bold"
          lineHeight="1.05"
          letterSpacing="-0.04em"
          fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
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
              <Button {...button} siteConfiguration={siteConfiguration} />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
