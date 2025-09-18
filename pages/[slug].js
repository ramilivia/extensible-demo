import { gql } from 'graphql-request'

import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery, siteConfigurationQuery as defaultSiteConfigQuery, segmentsQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function Page({ page }) {
  return <Wrapper {...page} />
}

export async function getServerSideProps({ locale, params, query, preview = false }) {
  const client = hygraphClient(preview)
  
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
      locale,
      slug: params.slug,
      segment: query.segment || ''
    });
    pageResult = page;
  } else {
    const { page } = await client.request(queryFile, {
      locale,
      slug: params.slug
    })
    pageResult = page;
  }
 
  if (!pageResult) {
    return {
      notFound: true
    }
  }

  const parsedPageData = await parsePageData(pageResult)

  return {
    props: {
      page: parsedPageData,
      preview,
      siteConfiguration: {...config, ...segments}
    }
  }
}

// Remove getStaticPaths since we're using getServerSideProps now

Page.getLayout = getPageLayout
