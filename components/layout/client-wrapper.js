'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { SiteLayout } from '@/layout'
import { defaultSEO } from '../../next-seo.config'
import { createTheme } from '../../styles/theme'
import { SiteConfigurationProvider } from '@/lib/context/SiteConfigurationContext'

export default function ClientWrapper({ children, siteConfiguration }) {
  const theme = createTheme(siteConfiguration)

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      <SiteConfigurationProvider siteConfiguration={siteConfiguration}>
        <SiteLayout>{children}</SiteLayout>
      </SiteConfigurationProvider>
    </ChakraProvider>
  )
}
