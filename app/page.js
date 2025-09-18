import { getHomepageData } from '@/lib/fetchers/page'
import PageWrapper from './page-wrapper'

// Force dynamic rendering
export const dynamic = 'force-dynamic'


export default async function HomePage() {
  const data = await getHomepageData()
  
  return <PageWrapper {...data} />
}
