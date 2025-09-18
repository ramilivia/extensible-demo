import { getPageData } from '@/lib/fetchers/page'
import PageWrapper from './page-wrapper'


export default async function HomePage() {
  const data = await getPageData('home')
  
  return <PageWrapper {...data} />
}
