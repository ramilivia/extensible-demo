import { hygraphClient } from '@/lib/_client'
import { pageQuery, genericPageQuery } from '@/lib/_queries'

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


  console.log('HYGRAPH VERSION', process.env.NEXT_PUBLIC_VERSION);
  const queryFile = await loadQuery(process.env.NEXT_PUBLIC_VERSION);
  console.log('QUERY FILE', queryFile);

  let page;

  if (!queryFile) {
    console.log('NO QUERY FILE');
    const result = await client.request(pageQuery, {
      slug: rootSlug,
      ...(rootSlug && { locale: 'en' })
    });
    page = result.page;
  } else {
    console.log('QUERY FILE ', process.env.NEXT_PUBLIC_HYGRAPH_VERSION);
    const result = await client.request(queryFile, {
      slug: rootSlug,
      ...(rootSlug && { locale: 'en' })
    });
    page = result.page;
  }

  if (!data) {
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
