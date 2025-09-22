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


  // Fix for Next.js issues #49433 and #49927
  // Next.js changed draft mode cookies from SameSite=None to SameSite=Lax
  // This breaks iframe-based CMS preview functionality
  const draft = cookies().get('__prerender_bypass')
  const nonce = cookies().get('__next_preview_data')

  // Always use SameSite=None for iframe compatibility with CMS
  // This is required for cross-site cookie setting in preview iframes
  const isSecure = request.url.startsWith('https://')
  
  if (draft?.value) {
    cookies().set('__prerender_bypass', draft.value, {
      httpOnly: true,
      sameSite: 'None',
      secure: isSecure,
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });
  }

  if (nonce?.value) {
    cookies().set('__next_preview_data', nonce.value, {
      httpOnly: true,
      sameSite: 'None',
      secure: isSecure,
      path: '/',
      maxAge: 60 * 60 * 24 // 24 hours
    });
  }

  const redirectUrl = slug === 'home' ? '/' : `/${slug}`

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}