import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { SiteLayout } from '@/layout'
import { defaultSEO } from '../next-seo.config'
import { createTheme } from '../styles/theme'
import { SiteConfigurationProvider } from '@/lib/context/SiteConfigurationContext'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const theme = createTheme(pageProps.siteConfiguration)
  
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      <SiteConfigurationProvider siteConfiguration={pageProps.siteConfiguration}>
        {getLayout(<Component {...pageProps} />)}
      </SiteConfigurationProvider>
    </ChakraProvider>
  )
}
