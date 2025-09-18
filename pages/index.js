import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery, siteConfigurationQuery as defaultSiteConfigQuery, segmentsQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function IndexPage({ page }) {
  return <Wrapper {...page} />
}

export async function getServerSideProps({ locale, preview = false, query }) {
  const client = hygraphClient(preview)
  
  // Load version-specific queries with fallback to defaults
  const { 
    queryFile = defaultPageQuery, 
    personalizationQueryFile,
    configurationFile = defaultSiteConfigQuery,
    segmentsFile = segmentsQuery
  } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}

  console.log('VERSION', process.env.NEXT_PUBLIC_VERSION)
  // Get site configuration using either version-specific or default query
  const { siteConfiguration: config } = await client.request(configurationFile, {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME
  })

  let segments = [];
  if (process.env.NEXT_PUBLIC_PERSONALIZATION === 'true') {
    segments = await client.request(segmentsFile);
  }

  // Get page data using either version-specific or default query
  let pageResult = null;
  if (process.env.NEXT_PUBLIC_PERSONALIZATION === 'true') {
    const { page } = await client.request(personalizationQueryFile, {
      locale,
      slug: 'home',
      segment: query.segment || ''
    });
    pageResult = page;
  } else {
    const { page } = await client.request(queryFile, {
      locale,
      slug: 'home'
    })
    pageResult = page;
  }

  const parsedPageData = await parsePageData(pageResult)
   //console.log('PARSED PAGE DATA', parsedPageData);
  return {
    props: {
      page: parsedPageData,
      siteConfiguration: {...config, ...segments},
      preview
    }
  }
}

IndexPage.getLayout = getPageLayout
