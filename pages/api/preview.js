import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'

export default async function handler(req, res) {

  console.log('HYGRAPH_PREVIEW_SECRET ENV', process.env.HYGRAPH_PREVIEW_SECRET)
  console.log('HYGRAPH_PREVIEW_SECRET REQ', process.env.HYGRAPH_PREVIEW_SECRET)

  if (
    req.query.secret !== process.env.HYGRAPH_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const client = hygraphClient(true)

  const [rootSlug, nestedSlug] = req.query.slug.split('/')

  // Load version-specific query with fallback to default
  const { queryFile = defaultPageQuery } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}

  // Get page data using either version-specific or default query
  const { page } = await client.request(queryFile, {
    slug: rootSlug,
    ...(rootSlug && { locale: 'en' }),
    today: new Date().toISOString()
  })

  if (!page) {
    return res
      .status(401)
      .json({ message: 'Slug not found - cannot enter preview mode' })
  }

  res.setPreviewData({})

  res.writeHead(307, {
    Location: nestedSlug
      ? `/${req.query.slug}`
      : rootSlug === 'home'
      ? '/'
      : `/${rootSlug}`
  })

  res.end()
}
