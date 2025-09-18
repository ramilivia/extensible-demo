import { getSiteLayout } from '@/layout'
import * as Blocks from '@/components/sections'
import Navigation from '@/components/sections/navigation'
import SEO from '@/components/blocks/seo'
import Banner from '@/components/sections/banner'

export default function PageLayout({ children, page, siteConfiguration }) {
  const pageBanner = page.marketing.find((item) => item.__typename === 'Banner');
  const HeroComponent = page.hero ? Blocks[page.hero.__typename] : null;
  
  console.log(siteConfiguration)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: siteConfiguration?.backgroundColor?.hex || 'white' }}>
      {page?.seo && <SEO {...page.seo} />}
      {pageBanner && <Banner {...pageBanner} siteConfiguration={siteConfiguration} />}
      <Navigation pages={page?.navigation[0]?.pages} siteConfiguration={siteConfiguration} />
      {HeroComponent && <HeroComponent {...page.hero} siteConfiguration={siteConfiguration} />}
      <div>
        {children}
      </div>
    </div>
  )
}

export const getLayout = (page) => {
  return getSiteLayout(<PageLayout {...page.props}>{page}</PageLayout>)
}
