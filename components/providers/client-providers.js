'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { createTheme } from '../../styles/theme'

export default function ClientProviders({ children, siteConfiguration }) {
  const theme = createTheme(siteConfiguration)
  
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )
}
