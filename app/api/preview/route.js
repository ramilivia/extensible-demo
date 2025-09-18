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
  const { queryFile = defaultPageQuery } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}

  // Get page data using either version-specific or default query
  const { page } = await client.request(queryFile, {
    slug: rootSlug,
    ...(rootSlug && { locale: 'en' })
  })

  if (!page) {
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

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}