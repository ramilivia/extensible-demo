import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery, siteConfigurationQuery as defaultSiteConfigQuery, segmentsQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import { getCurrentSegment, isPersonalizationEnabled } from '@/lib/segment'

export async function getPageData(slug = 'home', searchParams = {}, options = {}) {
  const { throwOnNotFound = false, locale = 'en' } = options
  
  try {
    const { isEnabled } = draftMode()
    const client = hygraphClient(isEnabled)
    const segment = getCurrentSegment()
  
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
    if (isPersonalizationEnabled()) {
      segments = await client.request(segmentsFile);
    }

    // Get page data using either version-specific or default query
    let pageResult = null;
    if (isPersonalizationEnabled()) {
      const { page } = await client.request(personalizationQueryFile, {
        locale: locale,
        slug: slug,
        segment: segment
      });
      pageResult = page;
    } else {
      const { page } = await client.request(queryFile, {
        locale: locale,
        slug: slug
      })
      pageResult = page;
    }

    if (!pageResult) {
      if (throwOnNotFound) {
        notFound()
      }
      
      return null
    }

    const parsedPageData = await parsePageData(pageResult)
    
    return {
      page: parsedPageData,
      siteConfiguration: {...config, ...segments},
      preview: isEnabled
    }
  } catch (error) {
    console.error('Error fetching page data:', error)
    
    if (throwOnNotFound) {
      notFound()
    }
    
    return null
  }
}
