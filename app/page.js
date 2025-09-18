import { draftMode } from 'next/headers'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery, siteConfigurationQuery as defaultSiteConfigQuery, segmentsQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import PageWrapper from './page-wrapper'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

async function getPageData() {
  try {
    const { isEnabled } = draftMode()
    const client = hygraphClient(isEnabled)
  
  // Load version-specific queries with fallback to defaults
  const { 
    queryFile = defaultPageQuery, 
    personalizationQueryFile,
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
  let pageResult = null;
  if (process.env.NEXT_PUBLIC_PERSONALIZATION === 'true') {
    const { page } = await client.request(personalizationQueryFile, {
      locale: 'en',
      slug: 'home',
      segment: ''
    });
    pageResult = page;
  } else {
    const { page } = await client.request(queryFile, {
      locale: 'en',
      slug: 'home'
    })
    pageResult = page;
  }

  const parsedPageData = await parsePageData(pageResult)
  
  return {
    page: parsedPageData,
    siteConfiguration: {...config, ...segments},
    preview: isEnabled
  }
  } catch (error) {
    console.error('Error fetching page data:', error)
    // Return fallback data
    return {
      page: { blocks: [] },
      siteConfiguration: {
        backgroundColor: { hex: '#ffffff' },
        navBackground: { hex: '#ffffff' },
        navFontColor: { hex: '#000000' }
      },
      preview: false
    }
  }
}

export default async function HomePage() {
  const data = await getPageData()
  
  return <PageWrapper {...data} />
}
