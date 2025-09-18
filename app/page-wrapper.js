import { Flex, Box } from '@chakra-ui/react'
import ClientProviders from '@/components/providers/client-providers'
import Wrapper from '@/components/layout/wrapper'
import * as Blocks from '@/components/sections'
import Navigation from '@/components/sections/navigation'
import SEO from '@/components/blocks/seo'
import Banner from '@/components/sections/banner'
import Footer from '@/components/sections/footer'
import Link from 'next/link'

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

export default function PageWrapper({ page, siteConfiguration, preview }) {
  // Add safety checks
  if (!page || !siteConfiguration) {
    return <div>Loading...</div>
  }
  
  const pageBanner = page.marketing?.find((item) => item.__typename === 'Banner');
  const HeroComponent = page.hero ? Blocks[page.hero.__typename] : null;

  return (
    <ClientProviders siteConfiguration={siteConfiguration}>
      <Flex flexDir="column" minH="100vh">
        <PreviewBanner enabled={preview} />
        <Box flexGrow="1">
          <div style={{ minHeight: '100vh', backgroundColor: siteConfiguration?.backgroundColor?.hex || 'white' }}>
            {page?.seo && <SEO {...page.seo} />}
            {pageBanner && <Banner {...pageBanner} siteConfiguration={siteConfiguration} />}
            <Navigation pages={page?.navigation?.[0]?.pages} siteConfiguration={siteConfiguration} />
            {HeroComponent && <HeroComponent {...page.hero} siteConfiguration={siteConfiguration} />}
            <div>
              <Wrapper {...page} siteConfiguration={siteConfiguration} />
            </div>
          </div>
        </Box>
        {page?.footer && <Footer {...page.footer} siteConfiguration={siteConfiguration} />}
      </Flex>
    </ClientProviders>
  )
}
