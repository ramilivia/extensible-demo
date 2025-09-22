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
  const draft = cookies().get('__prerender_bypass')

  cookies().set('__prerender_bypass', draft?.value, {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    path: '/',
  });

  const redirectUrl = slug === 'home' ? '/' : `/${slug}`

  return NextResponse.redirect(new URL(redirectUrl, request.url))
}