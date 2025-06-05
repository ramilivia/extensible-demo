import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery, siteConfigurationQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/layout/wrapper'

export default function IndexPage({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, preview = false }) {
  const client = hygraphClient(preview)


  const { queryFile, configurationFile} = await loadQuery(process.env.NEXT_PUBLIC_VERSION);

  let siteConfiguration;
  if (!configurationFile) {
    const { siteConfiguration: config } = await client.request(siteConfigurationQuery, {
      brandName: process.env.NEXT_PUBLIC_BRAND_NAME
    })
    siteConfiguration = config;
  } else {
    const { siteConfiguration: config } = await client.request(configurationFile, {
      brandName: process.env.NEXT_PUBLIC_BRAND_NAME
    })
    siteConfiguration = config;
  }
  
  console.log('LOCALE', locale);

  console.log('HYGRAPH VERSION', process.env.NEXT_PUBLIC_VERSION);
  
  //console.log('QUERY FILE', queryFile);

  let page;



  if (!queryFile) {
    console.log('NO QUERY FILE');
    const result = await client.request(pageQuery, {
      locale,
      slug: 'home'
    });
    page = result.page;
  } else {
    console.log('QUERY FILE LOADED');
    const result = await client.request(queryFile, {
      locale,
      slug: 'home'
    });
    page = result.page;
  }

  const parsedPageData = await parsePageData(page)
   console.log('PARSED PAGE DATA', parsedPageData);
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
