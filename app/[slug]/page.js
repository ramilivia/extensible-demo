import { getPageData } from '@/lib/fetchers/page'
import PageWrapper from '../page-wrapper'

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export default async function SlugPage({ params, searchParams }) {
  const data = await getPageData(params.slug, searchParams, { throwOnNotFound: true })
  
  return <PageWrapper {...data} />
}