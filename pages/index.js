import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery, siteConfigurationQuery as defaultSiteConfigQuery, segmentsQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function IndexPage({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, preview = false }) {
  const client = hygraphClient(preview)
  
  // Load version-specific queries with fallback to defaults
  const { 
    queryFile = defaultPageQuery, 
    configurationFile = defaultSiteConfigQuery,
    segmentsFile = segmentsQuery
  } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}

  // Get site configuration using either version-specific or default query
  const { siteConfiguration: config } = await client.request(configurationFile, {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME
  })

  let segments = [];
  if (process.env.NEXT_PUBLIC_PERSONALIZATION === 'true') {
    segments = await client.request(segmentsFile);
  }

  // Get page data using either version-specific or default query
  const { page } = await client.request(queryFile, {
    locale,
    slug: 'home'
  })

  const parsedPageData = await parsePageData(page)
   console.log('PARSED PAGE DATA', parsedPageData);
  return {
    props: {
      page: parsedPageData,
      siteConfiguration: {...config, ...segments},
      preview
    },
    revalidate: 60
  }
}

IndexPage.getLayout = getPageLayout
