'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SiteLayout } from '@/layout'
import { createTheme } from '../../styles/theme'

export default function ClientWrapper({ children, siteConfiguration }) {
  const theme = createTheme(siteConfiguration)

  return (
    <ChakraProvider theme={theme}>
      <SiteLayout>{children}</SiteLayout>
    </ChakraProvider>
  )
}
