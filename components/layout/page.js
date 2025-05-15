import { Box, Container, Heading } from '@chakra-ui/react'
import { MDXRemote } from 'next-mdx-remote'

import { getSiteLayout } from '@/layout'
import Navigation from '@/components/blocks/navigation'
import SEO from '@/components/seo'
import Hero from '@/components/blocks/hero'
import Banner from '@/components/blocks/banner'
export default function PageLayout({ children, page }) {
  const pageBanner = page?.marketing?.find(
    (block) => block.__typename === 'Banner'
  )

  console.log('HERO', page?.hero)

  return (
    <>
      {page?.seo && <SEO {...page.seo} />}

      {pageBanner && <Banner {...pageBanner} />}
      <Navigation {...page?.navigation} />
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
