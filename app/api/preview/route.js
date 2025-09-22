import { NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

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

  // Enable Draft Mode immediately after secret validation
  draftMode().enable()

  const redirectUrl = slug === 'home' ? '/' : `/${slug}`

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}