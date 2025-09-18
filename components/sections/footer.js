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
import { useRouter } from 'next/router'
import { 
  InstagramIcon, 
  PinterestIcon, 
  FacebookIcon, 
  TwitterIcon,
  LinkedInIcon,
  SlackIcon,
  GithubIcon 
} from '@/assets/icons'
import { locales } from '@/lib/_locales'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

function GridColumnHeading({ children }) {
  const siteConfig = useSiteConfiguration()
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

function GridColumn({ links, title }) {
  const siteConfig = useSiteConfiguration()

  return (
    <div>
      <GridColumnHeading>{title}</GridColumnHeading>

      <Stack as="ul" spacing={4}>
        {links && links.map((link) => (
          <li key={link.id}>
            <ChakraLink
              as={Link}
              href={`/${link.slug}`}
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

function SocialMediaLink({ href, title, icon }) {
  const siteConfig = useSiteConfiguration()

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

export default function Footer({ primaryLinks, secondaryLinks }) {
  const router = useRouter()
  const siteConfig = useSiteConfiguration()

  const activeLocale = locales.find((locale) => locale.value === router.locale)

  const setLocale = (event) => {
    router.push(router.asPath, router.asPath, { locale: event.target.value })
  }

  const setSegment = (event) => {
    const selectedSegment = event.target.value
    if (selectedSegment === 'no-segment') {
      // Remove segment from query when "No Segment" is selected
      const { segment, ...queryWithoutSegment } = router.query
      router.push({ pathname: router.pathname, query: queryWithoutSegment })
    } else {
      router.push({ pathname: router.pathname, query: { ...router.query, segment: selectedSegment } })
    }
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
            />

            <GridColumn
              links={secondaryLinks.length && secondaryLinks}
              title="Secondary"
            />
          </Grid>

          <Box 
            mt={{ base: 12, xl: 0 }}
            gridColumn={{ xl: siteConfig?.segments?.length > 0 ? 'auto' : 'span 1 / span 1' }}
          >
            <GridColumnHeading>Language</GridColumnHeading>

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
                    {locales.map((locale) => (
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
            <GridColumnHeading>Segment Simulator</GridColumnHeading>
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
                    value={router.query.segment || 'no-segment'}
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
            />
            <SocialMediaLink
              title="Slack"
              icon={SlackIcon}
              href="https://slack.hygraph.com"
            />
            <SocialMediaLink
              title="Twitter"
              icon={TwitterIcon}
              href="https://twitter.com/Hygraphcom"
            />
            <SocialMediaLink
              title="GitHub"
              icon={GithubIcon}
              href="https://github.com/Hygraph/reference-nextjs-marketing"
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
