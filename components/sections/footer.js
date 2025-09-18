'use client'

import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Grid,
  Heading,
  FormLabel,
  Select,
  Container
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter, usePathname, useParams } from 'next/navigation'
import { 
  InstagramIcon, 
  PinterestIcon, 
  FacebookIcon, 
  TwitterIcon,
  LinkedInIcon,
  SlackIcon,
  GithubIcon 
} from '@/assets/icons'
import { LOCALES } from '@/lib/constants'
function GridColumnHeading({ children, siteConfiguration }) {
  const siteConfig = siteConfiguration
  return (
    <Heading
      as="h3"
      fontSize={{ base: "md", md: "xl", lg: "xl" }}
      fontWeight="bold"
      color={siteConfig?.titlesFontColor?.hex || "gray.900"}
      letterSpacing="-0.04em"
      fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
      mb={6}
    >
      {children}
    </Heading>
  )
}

function GridColumn({ links, title, siteConfiguration, currentLocale }) {
  const siteConfig = siteConfiguration

  return (
    <div>
      <GridColumnHeading siteConfiguration={siteConfiguration}>{title}</GridColumnHeading>

      <Stack as="ul" spacing={4}>
        {links && links.map((link) => (
          <li key={link.id}>
            <ChakraLink
              as={Link}
              href={currentLocale === 'en' ? `/${link.slug}` : `/${currentLocale}/${link.slug}`}
              color={siteConfig?.textColor?.hex || "gray.600"}
              fontSize="md"
              fontWeight="normal"
              letterSpacing="0.02em"
              _hover={{
                color: siteConfig?.titlesFontColor?.hex || "gray.900",
                textDecoration: "none"
              }}
            >
              {link.navigationLabel ||
                link.slug.charAt(0).toUpperCase() + link.slug.slice(1)}
            </ChakraLink>
          </li>
        ))}
      </Stack>
    </div>
  )
}

function SocialMediaLink({ href, title, icon, siteConfiguration }) {
  const siteConfig = siteConfiguration

  return (
    <ChakraLink
      href={href}
      isExternal
      color={siteConfig?.textColor?.hex || "gray.600"}
      _hover={{
        color: siteConfig?.titlesFontColor?.hex || "gray.900"
      }}
      mx={2}
    >
      <VisuallyHidden>{title}</VisuallyHidden>
      <Box as={icon} w={5} h={5} opacity={0.8} />
    </ChakraLink>
  )
}

export default function Footer({ primaryLinks, secondaryLinks, siteConfiguration }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const siteConfig = siteConfiguration

  // Get current locale from URL params
  const currentLocale = params?.locale || 'en'
  const activeLocale = LOCALES.find((locale) => locale.value === currentLocale) || LOCALES[0]

  const setLocale = (event) => {
    const newLocale = event.target.value
    
    // Get the base path without the current locale
    let pathWithoutLocale
    
    if (currentLocale === 'en') {
      // For English (no prefix), the pathname is already the base path
      pathWithoutLocale = pathname
    } else {
      // For other locales, remove the locale prefix
      pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/'
    }
    
    // Construct the new URL with the selected locale
    let newPath
    if (newLocale === 'en') {
      // For English, don't add a locale prefix
      newPath = pathWithoutLocale
    } else {
      // For other locales, add the locale prefix
      newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    }
    
    // Navigate to the new locale path
    router.push(newPath)
  }

  const setSegment = (event) => {
    const selectedSegment = event.target.value
    // In App Router, segment switching would be handled differently
    // For now, just log the selection
    console.log('Segment change requested:', selectedSegment)
  }

  return (
    <Box 
      as="footer" 
      bg={siteConfig?.navBackground?.hex || "white"}
      aria-labelledby="footerHeading"
    >
      <VisuallyHidden as="h2" id="footerHeading">
        Footer
      </VisuallyHidden>

      <Container maxW="7.5xl" py={{ base: 16, lg: 20 }} px={{ base: 4, md: 4, lg: 6, xl: 8 }} pl={{ base: 6, md: 10, lg: 0 }}>
        <Box
          pb={12}
          display={{ xl: 'grid' }}
          gridTemplateColumns={{ 
            xl: siteConfig?.segments?.length > 0 ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)'
          }}
          gridGap={{ xl: 16 }}
        >
          <Grid
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            gridGap={{ base: 8, md: 12, lg: 16 }}
            gridColumn={{ lg: 'span 3 / span 3' }}
          >
            <GridColumn
              links={primaryLinks.length && primaryLinks}
              title="Primary"
              siteConfiguration={siteConfiguration}
              currentLocale={currentLocale}
            />

            <GridColumn
              links={secondaryLinks.length && secondaryLinks}
              title="Secondary"
              siteConfiguration={siteConfiguration}
              currentLocale={currentLocale}
            />
          </Grid>

          <Box 
            mt={{ base: 12, xl: 0 }}
            gridColumn={{ xl: siteConfig?.segments?.length > 0 ? 'auto' : 'span 1 / span 1' }}
          >
            <GridColumnHeading siteConfiguration={siteConfiguration}>Language</GridColumnHeading>

            <Box as="form" mt={2} maxW={{ sm: 'xs' }}>
              <Box as="fieldset" w="full">
                <VisuallyHidden as={FormLabel} htmlFor="language">
                  Language
                </VisuallyHidden>

                <Box position="relative">
                  <Select
                    id="language"
                    name="language"
                    color={siteConfig?.textColor?.hex || "gray.900"}
                    bg={siteConfig?.backgroundColor?.hex || "white"}
                    borderColor="gray.200"
                    fontSize="md"
                    value={activeLocale.value}
                    onChange={setLocale}
                    _hover={{ borderColor: "gray.300" }}
                    borderRadius="md"
                  >
                    {LOCALES.map((locale) => (
                      <Box
                        as="option"
                        bg={siteConfig?.backgroundColor?.hex || "white"}
                        color={siteConfig?.textColor?.hex || "gray.900"}
                        key={locale.value}
                        value={locale.value}
                      >
                        {locale.label}
                      </Box>
                    ))}
                  </Select>
                </Box>    
              </Box>
            </Box>
          </Box>
          {siteConfig?.segments?.length > 0 && (
          <Box mt={{ base: 12, xl: 0 }}>
            <GridColumnHeading siteConfiguration={siteConfiguration}>Segment Simulator</GridColumnHeading>
            <Box as="form" mt={2} maxW={{ sm: 'xs' }}>
              <Box as="fieldset" w="full">
                <VisuallyHidden as={FormLabel} htmlFor="segment-simulator">
                  Segment Simulator
                </VisuallyHidden>

                <Box position="relative">
                  <Select
                    id="segment-simulator"
                    name="segment-simulator"
                    color={siteConfig?.textColor?.hex || "gray.900"}
                    bg={siteConfig?.backgroundColor?.hex || "white"}
                    borderColor="gray.200"
                    fontSize="md"
                    value={'no-segment'}
                    onChange={setSegment}
                    _hover={{ borderColor: "gray.300" }}
                    borderRadius="md"
                  >
                    <Box
                      as="option"
                      bg={siteConfig?.backgroundColor?.hex || "white"}
                      color={siteConfig?.textColor?.hex || "gray.900"}
                      value="no-segment"
                    >
                      No Segment
                    </Box>
                    {siteConfig?.segments?.map((segment) => (
                      <Box
                        as="option"
                        bg={siteConfig?.backgroundColor?.hex || "white"}
                        color={siteConfig?.textColor?.hex || "gray.900"}
                        key={segment.id}
                        value={segment.name}
                      >
                        {segment.name}
                      </Box>
                    ))}
                  </Select>
                </Box>    
              </Box>
            </Box>
          </Box>
          )}
        </Box>

        <Box
          mt={12}
          pt={8}
          borderTopWidth="1px"
          borderColor="gray.100"
          display={{ md: 'flex' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack direction="row" display="flex" spacing={4} order={{ md: 2 }}>
          <SocialMediaLink
              title="LinkedIn"
              icon={LinkedInIcon}
              href="https://linkedin.com/company/hygraph"
              siteConfiguration={siteConfiguration}
            />
            <SocialMediaLink
              title="Slack"
              icon={SlackIcon}
              href="https://slack.hygraph.com"
              siteConfiguration={siteConfiguration}
            />
            <SocialMediaLink
              title="Twitter"
              icon={TwitterIcon}
              href="https://twitter.com/Hygraphcom"
              siteConfiguration={siteConfiguration}
            />
            <SocialMediaLink
              title="GitHub"
              icon={GithubIcon}
              href="https://github.com/Hygraph/reference-nextjs-marketing"
              siteConfiguration={siteConfiguration}
            />
          </Stack>

          <Text
            mt={[8, null, 0]}
            fontSize="sm"
            color={siteConfig?.textColor?.hex || "gray.500"}
            order={{ md: 1 }}
            letterSpacing="0.02em"
          >
            © {new Date().getFullYear()} All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
