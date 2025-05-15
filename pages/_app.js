import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { SiteLayout } from '@/layout'
import { defaultSEO } from '../next-seo.config'
import { createTheme } from '../styles/theme'
import { useSiteConfig } from '@/lib/useSiteConfig'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const { siteConfig } = useSiteConfig()
  const theme = createTheme(siteConfig)
  
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
