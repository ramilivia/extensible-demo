import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'
import { hygraphClient } from '@/lib/_client'
import { pageQuery as defaultPageQuery } from '@/lib/_queries'
import { loadQuery } from '@/lib/queryLoader'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  console.log('HYGRAPH_PREVIEW_SECRET ENV', process.env.HYGRAPH_PREVIEW_SECRET)
  console.log('HYGRAPH_PREVIEW_SECRET REQ', secret)

  if (
    secret !== process.env.HYGRAPH_PREVIEW_SECRET ||
    !slug
  ) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  const client = hygraphClient(true)

  const [rootSlug, nestedSlug] = slug.split('/')

  // Load version-specific query with fallback to default
  const { queryFile = defaultPageQuery, alternatingPanelWithVariantsFile } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}
  
  let pageResult = null;
  if (slug.includes('alternating-panels')) {
    // Extract ID from slug like: components/alternating-panels/cmbteehk5ikfn07usus2l206g?inspector
    const idMatch = slug.match(/alternating-panels\/([^?]+)/)
    const panelId = idMatch ? idMatch[1] : slug
    
    const { alternatingPanelsSection } = await client.request(alternatingPanelWithVariantsFile, {
      id: panelId,
      locale: 'en',
      segment: 'Commuter'
    });

    pageResult = alternatingPanelsSection;
  } else {  
   // Get page data using either version-specific or default query
    const { page } = await client.request(queryFile, {
      slug: rootSlug,
      ...(rootSlug && { locale: 'en' })
    })
    pageResult = page;
  }

  if (!pageResult) {
    return NextResponse.json(
      { message: 'Slug not found - cannot enter preview mode' },
      { status: 401 }
    )
  }
 
  // Enable Draft Mode
  draftMode().enable()

  const redirectUrl = nestedSlug
    ? `/${slug}`
    : rootSlug === 'home'
    ? '/'
    : `/${rootSlug}`

    console.log('REDIRECT URL', redirectUrl)

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}