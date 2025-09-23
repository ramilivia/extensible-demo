import {
  VisuallyHidden,
  Link as ChakraLink,
  Text,
  Stack,
  Box,
  Grid,
  Heading,
  Container
} from '@chakra-ui/react'
import Link from 'next/link'
import { 
  InstagramIcon, 
  PinterestIcon, 
  FacebookIcon, 
  XIcon,
  LinkedInIcon,
  SlackIcon,
  GithubIcon 
} from '@/assets/icons'
import SegmentSelector from '@/components/blocks/segment-selector'
import LanguageSelector from '@/components/blocks/language-selector'
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

function SocialMediaLink({ href, title, children, siteConfiguration }) {
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
      {children}
    </ChakraLink>
  )
}

export default function Footer({ primaryLinks, secondaryLinks, siteConfiguration, currentSegment, currentLocale }) {
  const siteConfig = siteConfiguration


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
            xl: 'repeat(5, 1fr)'
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
            gridColumn={{ xl: 'auto' }}
          >
            <GridColumnHeading siteConfiguration={siteConfiguration}>Language</GridColumnHeading>
            <LanguageSelector siteConfiguration={siteConfiguration} currentLocale={currentLocale} />
          </Box>
          <SegmentSelector 
            siteConfiguration={siteConfiguration} 
            currentSegment={currentSegment} 
          />
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
              href="https://linkedin.com/company/hygraph"
              siteConfiguration={siteConfiguration}
            >
              <LinkedInIcon width={20} height={20} style={{ opacity: 0.8 }} />
            </SocialMediaLink>
            <SocialMediaLink
              title="Slack"
              href="https://slack.hygraph.com"
              siteConfiguration={siteConfiguration}
            >
              <SlackIcon width={20} height={20} style={{ opacity: 0.8 }} />
            </SocialMediaLink>
            <SocialMediaLink
              title="X"
              href="https://x.com/Hygraph"
              siteConfiguration={siteConfiguration}
            >
              <XIcon width={20} height={20} style={{ opacity: 0.8 }} />
            </SocialMediaLink>
            <SocialMediaLink
              title="GitHub"
              href="https://github.com/Hygraph/reference-nextjs-marketing"
              siteConfiguration={siteConfiguration}
            >
              <GithubIcon width={20} height={20} style={{ opacity: 0.8 }} />
            </SocialMediaLink>
          </Stack>

          <Text
            mt={[8, null, 0]}
            fontSize="sm"
            color={siteConfig?.textColor?.hex || "gray.500"}
            order={{ md: 1 }}
            letterSpacing="0.02em"
          >
            © {new Date().getFullYear()} Hygraph. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  )
}
