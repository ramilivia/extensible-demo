import { getPageData } from '@/lib/fetchers/page'
import { generateSEOMetadata } from '@/lib/metadata'
import { Flex, Box, Text, Badge } from '@chakra-ui/react'
import { getCurrentSegment, isPersonalizationEnabled } from '@/lib/segment'
import ChakraThemeProvider from '@/components/layout/chakra-provider'
import SectionMapper from '@/components/layout/section-mapper'
import * as Blocks from '@/components/sections'
import Navigation from '@/components/sections/navigation'
import Banner from '@/components/sections/banner'
import Footer from '@/components/sections/footer'
import Link from 'next/link'
import { InspectorProvider } from '@/lib/inspector'

function PreviewBanner({ enabled = false }) {
  if (!enabled) return null

  return (
    <Box textAlign="center" p="2" backgroundColor="black" textColor="white">
      Preview Mode Enabled (Content served from DRAFT) &mdash;&nbsp;
      <Link href="/api/exit-preview">
        Exit Preview Mode
      </Link>
    </Box>
  )
}

function SegmentBanner({ segment, personalizationEnabled }) {
  // Only show in development or when personalization is enabled
  if (!personalizationEnabled && process.env.NODE_ENV === 'production') return null

  return (
    <Box textAlign="center" p="2" backgroundColor="blue.50" borderBottom="1px" borderColor="blue.200">
      <Text fontSize="sm" color="blue.800">
        Current Segment: {' '}
        {segment ? (
          <Badge colorScheme="blue">{segment}</Badge>
        ) : (
          <Badge colorScheme="gray">Default</Badge>
        )}
        {process.env.NODE_ENV === 'development' && (
          <Text as="span" ml={2} fontSize="xs" color="blue.600">
            (Cookie-based personalization active)
          </Text>
        )}
      </Text>
    </Box>
  )
}

// Use server-side rendering to support dynamic cookie-based personalization
export const dynamic = 'force-dynamic'

/*export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}*/

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'
  const slug = resolvedParams?.slug?.[0] || 'home'
  // Note: searchParams no longer used for segment - cookies only
  const data = await getPageData(slug, {}, { throwOnNotFound: false, locale })

  if (!data?.page?.seo) return {}

  const pathname = resolvedParams?.slug ? `/${resolvedParams.slug.join('/')}` : '/'
  return generateSEOMetadata(data.page.seo, pathname)
}

export default async function SlugPage({ params, searchParams }) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || 'en'

  // Get current segment using utility
  const currentSegment = getCurrentSegment()
  const personalizationEnabled = isPersonalizationEnabled()

  // Handle root route (/) as home page, otherwise use the first slug segment
  const slug = resolvedParams?.slug?.[0] || 'home'

  // Build current pathname for navigation
  const currentPathname = resolvedParams?.slug ? `/${resolvedParams.slug.join('/')}` : '/'

  const data = await getPageData(slug, {}, { throwOnNotFound: slug !== 'home', locale })

  const { page, siteConfiguration, preview } = data

  // Add safety checks
  if (!page || !siteConfiguration) {
    return <div>Loading...</div>
  }

  const pageBanner = page.marketing?.find((item) => item.__typename === 'Banner');
  const HeroComponent = page.hero ? Blocks[page.hero.__typename] : null;

  return (
    <ChakraThemeProvider siteConfiguration={siteConfiguration}>
      <InspectorProvider>
      <Flex flexDir="column" minH="100vh">
        <PreviewBanner enabled={preview} />
        <Box flexGrow="1">
          <div style={{ minHeight: '100vh', backgroundColor: siteConfiguration?.backgroundColor?.hex || 'white' }}>
            {pageBanner && <Banner {...pageBanner} siteConfiguration={siteConfiguration} />}
            <Navigation 
              pages={page?.navigation?.[0]?.pages} 
              siteConfiguration={siteConfiguration} 
              currentPathname={currentPathname}
              currentLocale={locale}
            />
            {HeroComponent && <HeroComponent {...page.hero} siteConfiguration={siteConfiguration} />}
            <div>
              <SectionMapper {...page} siteConfiguration={siteConfiguration} />
            </div>
            </div>
          </Box>
          {page?.footer && <Footer {...page.footer} siteConfiguration={siteConfiguration} currentSegment={currentSegment} currentLocale={locale} />}
        </Flex>
      </InspectorProvider>
    </ChakraThemeProvider>
  )
}