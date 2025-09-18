'use client'

import { ChakraProvider, Flex, Box } from '@chakra-ui/react'
import { SiteConfigurationProvider } from '@/lib/context/SiteConfigurationContext'
import { createTheme } from '../styles/theme'
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
  
  const theme = createTheme(siteConfiguration)
  const pageBanner = page.marketing?.find((item) => item.__typename === 'Banner');
  const HeroComponent = page.hero ? Blocks[page.hero.__typename] : null;

  return (
    <ChakraProvider theme={theme}>
      <SiteConfigurationProvider siteConfiguration={siteConfiguration}>
        <Flex flexDir="column" minH="100vh">
          <PreviewBanner enabled={preview} />
          <Box flexGrow="1">
            <div style={{ minHeight: '100vh', backgroundColor: siteConfiguration?.backgroundColor?.hex || 'white' }}>
              {page?.seo && <SEO {...page.seo} />}
              {pageBanner && <Banner {...pageBanner} />}
              <Navigation pages={page?.navigation?.[0]?.pages} siteConfiguration={siteConfiguration} />
              {HeroComponent && <HeroComponent {...page.hero} />}
              
              <div>
                <Wrapper {...page} />
              </div>
            </div>
          </Box>
          {page?.footer && <Footer {...page.footer} />}
        </Flex>
      </SiteConfigurationProvider>
    </ChakraProvider>
  )
}
