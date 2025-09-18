'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SiteConfigurationProvider } from '@/lib/context/SiteConfigurationContext'
import { createTheme } from '../../styles/theme'

export default function ClientProviders({ children, siteConfiguration }) {
  const theme = createTheme(siteConfiguration)
  
  return (
    <ChakraProvider theme={theme}>
      <SiteConfigurationProvider siteConfiguration={siteConfiguration}>
        {children}
      </SiteConfigurationProvider>
    </ChakraProvider>
  )
}
