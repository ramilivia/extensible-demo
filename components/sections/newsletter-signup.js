import {
  Box,
  Heading,
  Text,
  FormLabel,
  VisuallyHidden,
  Input
} from '@chakra-ui/react'
import Button from '@/components/blocks/button'

export default function NewsletterSignup({ id, ctaLabel, subtitle, title, button, siteConfiguration }) {
  const siteConfig = siteConfiguration
  
  return (
    <Box bg={siteConfig?.backgroundColor?.hex || 'white'}>
      <Box maxW="7.5xl" mx="auto" py={{ base: 12, lg: 16 }} px={{ base: 4, md: 6, lg: 6 }}>
        <Heading
          as="h2"
          fontSize={{ base: '2.75rem', md: '2.75rem', lg: '3.5rem' }}
          fontWeight="bold"
          lineHeight="1.05"
          letterSpacing="-0.04em"
          fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
          color={siteConfig?.textColor?.hex || 'gray.900'}
          data-hygraph-entry-id={id}
          data-hygraph-field-api-id="title"
        >
          {title}
        </Heading>
        <Text
          mt={{ base: 6, md: 0 }}
          fontSize={{ base: '2.75rem', md: '2.75rem', lg: '3.5rem' }}
          fontWeight="bold"
          lineHeight="1.05"
          letterSpacing="-0.04em"
          fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
          color={siteConfig?.titlesFontColor?.hex}
          data-hygraph-entry-id={id}
          data-hygraph-field-api-id="subtitle"
        >
          {subtitle}
        </Text>
        <Box as="form" mt={8} display={{ sm: 'flex' }}>
          <VisuallyHidden as={FormLabel} htmlFor="emailAddress">
            Email address
          </VisuallyHidden>
          <Input
            id="emailAddress"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Enter your email"
            width="full"
            height="50px"
            maxW={{ sm: 'xs' }}
            px={5}
            py={3}
            borderColor={siteConfig?.textColor?.hex || 'gray.300'}
            _placeholder={{
              color: siteConfig?.textColor?.hex || 'gray.500'
            }}
          />
          <Box
            mt={[3, 0]}
            ml={{ sm: 3 }}
            flexShrink={{ sm: 0 }}
            width={{ base: 'full', sm: 'auto' }}
          >
            <Button
              type="submit"
              size={button?.size || "MEDIUM"}
              theme={button?.theme || "PRIMARY"}
              label={button?.label || ctaLabel || 'Submit'}
              siteConfiguration={siteConfiguration}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
