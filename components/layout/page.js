import { Box, Container, Heading } from '@chakra-ui/react'
import { getSiteLayout } from '@/layout'
import Navigation from '@/components/sections/navigation'
import SEO from '@/components/blocks/seo'
import Hero from '@/components/sections/hero'
import Banner from '@/components/sections/banner'



export default function PageLayout({ children, page, siteConfiguration }) {
  const pageBanner = page?.marketing?.find(
    (block) => block.__typename === 'Banner'
  )

  return (
    <>
      {page?.seo && <SEO {...page.seo} />}
      {pageBanner && <Banner {...pageBanner} />}
      <Navigation {...page?.navigation} siteConfiguration={siteConfiguration} />
      {page?.hero && <Hero {...page.hero} />}
      <div>
        {children}
      </div>
    </>
  )
}

export const getLayout = (page) => {
  return getSiteLayout(<PageLayout {...page.props}>{page}</PageLayout>)
}
