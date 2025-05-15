import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery, siteConfigurationQuery } from '@/lib/_queries'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function IndexPage({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, preview = false }) {
  const client = hygraphClient(preview)

  const { siteConfiguration } = await client.request(siteConfigurationQuery, {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME
  })
  
  const { page } = await client.request(pageQuery, {
    locale,
    slug: 'home'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      siteConfiguration,
      preview
    },
    revalidate: 60
  }
}

IndexPage.getLayout = getPageLayout
