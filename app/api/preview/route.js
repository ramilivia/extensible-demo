import { NextResponse } from 'next/server'
import { draftMode, cookies } from 'next/headers'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  console.log('HYGRAPH_PREVIEW_SECRET ENV', process.env.HYGRAPH_PREVIEW_SECRET)
  console.log('HYGRAPH_PREVIEW_SECRET REQ', secret)
  console.log('Request URL:', request.url)
  console.log('User Agent:', request.headers.get('user-agent'))

  if (
    secret !== process.env.HYGRAPH_PREVIEW_SECRET ||
    !slug
  ) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Enable Draft Mode first
  draftMode().enable()

  const redirectUrl = slug === 'home' ? '/' : `/${slug}`
  const response = NextResponse.redirect(new URL(redirectUrl, request.url))

  // Fix for Next.js issues #49433 and #49927
  // Manually set cookies with SameSite=None for iframe compatibility
  const isSecure = request.url.startsWith('https://')
  console.log('Setting cookies with secure:', isSecure)
  
  // Generate a simple bypass token (Next.js uses a more complex one, but this should work)
  const bypassToken = Buffer.from(JSON.stringify({ 
    timestamp: Date.now(),
    random: Math.random() 
  })).toString('base64')

  // Set the bypass cookie directly on the response
  response.cookies.set('__prerender_bypass', bypassToken, {
    httpOnly: true,
    sameSite: 'None',
    secure: isSecure,
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  // Also set a simple preview data cookie
  response.cookies.set('__next_preview_data', 'true', {
    httpOnly: true,
    sameSite: 'None',
    secure: isSecure,
    path: '/',
    maxAge: 60 * 60 * 24 // 24 hours
  });

  console.log('Cookies set, redirecting to:', redirectUrl)
  return response
}