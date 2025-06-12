import { getSiteLayout } from '@/layout'
import * as Blocks from '@/components/sections'
import Navigation from '@/components/sections/navigation'
import SEO from '@/components/blocks/seo'
import Banner from '@/components/sections/banner'



export default function PageLayout({ children, page, siteConfiguration }) {
  const pageBanner = page.marketing.find((item) => item.__typename === 'Banner');
  const HeroComponent = Blocks[page.hero.__typename]
  
  
  return (
    <>
      {page?.seo && <SEO {...page.seo} />}
      {pageBanner && <Banner {...pageBanner} />}
      <Navigation pages={page?.navigation[0]?.pages} siteConfiguration={siteConfiguration} />
      {HeroComponent && <HeroComponent {...page.hero} />}

      <div>
        {children}
      </div>
    </>
  )
}

export const getLayout = (page) => {
  return getSiteLayout(<PageLayout {...page.props}>{page}</PageLayout>)
}
