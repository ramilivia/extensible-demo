import { NextResponse } from 'next/server'
import { draftMode, cookies } from 'next/headers'

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


  // Known Next.js issue: https://github.com/vercel/next.js/issues/49433
  // Force refresh the draft mode cookies to ensure they work across environments
  const draft = cookies().get('__prerender_bypass')
  const nonce = cookies().get('__next_preview_data')

  // Adapt cookie settings based on environment
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (draft?.value) {
    cookies().set('__prerender_bypass', draft.value, {
      httpOnly: true,
      sameSite: isProduction ? 'None' : 'Lax',
      secure: isProduction,
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });
  }

  if (nonce?.value) {
    cookies().set('__next_preview_data', nonce.value, {
      httpOnly: true,
      sameSite: isProduction ? 'None' : 'Lax', 
      secure: isProduction,
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });
  }

  const redirectUrl = slug === 'home' ? '/' : `/${slug}`

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}