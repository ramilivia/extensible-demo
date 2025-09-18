import { getHomepageData } from '@/lib/fetchers/page'
import PageWrapper from './page-wrapper'


export default async function HomePage() {
  const data = await getHomepageData()
  
  return <PageWrapper {...data} />
}
