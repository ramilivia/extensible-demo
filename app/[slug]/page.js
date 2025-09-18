import { getSlugPageData } from '@/lib/fetchers/page'
import PageWrapper from '../page-wrapper'

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export default async function SlugPage({ params, searchParams }) {
  const data = await getSlugPageData(params.slug, searchParams)
  
  return <PageWrapper {...data} />
}