import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery, siteConfigurationQuery } from '@/lib/_queries'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/wrapper'

export default function IndexPage({ page, siteConfiguration }) {
  return <Wrapper {...page} {...siteConfiguration} />
}

export async function getStaticProps({ locale, preview = false }) {
  const client = hygraphClient(preview)

  const { page } = await client.request(pageQuery, {
    locale,
    slug: 'home'
  })

  const { siteConfiguration } = await client.request(siteConfigurationQuery)

  console.log('siteConfiguration', siteConfiguration)
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
