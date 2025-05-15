import {
  Box,
  Heading,
  Text,
  FormLabel,
  VisuallyHidden,
  Input
} from '@chakra-ui/react'
import Button from '@/components/blocks/button'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

export default function NewsletterSignup({ ctaLabel, subtitle, title, button }) {
  const siteConfig = useSiteConfiguration()
  
  return (
    <Box bg="white">
      <Box maxW="7xl" mx="auto" py={{ base: 12, lg: 16 }} px={[4, 6, null, 8]}>
        <Heading
          as="h2"
          fontSize={['3xl', '4xl']}
          lineHeight="shorter"
          fontWeight="extrabold"
          display={['inline', 'block']}
          letterSpacing="tight"
          color="gray.900"
        >
          {title}
        </Heading>
        <Text
          fontSize={['3xl', '4xl']}
          lineHeight="shorter"
          fontWeight="extrabold"
          display={['inline', 'block']}
          letterSpacing="tight"
          color={siteConfig?.titlesFontColor?.hex}
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
            borderColor="gray.300"
            _placeholder={{
              color: 'gray.500'
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
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
