import { gql } from 'graphql-request'

import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { genericPageQuery, siteConfigurationQuery, pageQuery } from '@/lib/_queries'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function Page({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, params, preview = false }) {
  
  const client = hygraphClient(preview)
  
  const { siteConfiguration } = await client.request(siteConfigurationQuery, {
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME
  })

  const { page } = await client.request(pageQuery, {
    locale,
    slug: params.slug
  })

  if (!page) {
    return {
      notFound: true
    }
  }

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      preview,
      siteConfiguration
    },
    revalidate: 60
  }
}

export async function getStaticPaths({ locales }) {
  let paths = []

  const client = hygraphClient()

  const { pages } = await client.request(gql`
    {
      pages(where: { slug_not_in: ["home"] }) {
        slug
      }
    }
  `)

  console.log('LOCALIZED PIBIN', pages);

  for (const locale of locales) {
    paths = [
      ...paths,
      ...pages.map((page) => ({ params: { slug: page.slug }, locale }))
    ]
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

Page.getLayout = getPageLayout
