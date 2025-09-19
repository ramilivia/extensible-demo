'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Set user segment using Next.js Server Actions
 */
export async function setSegment(segment) {
  const cookieStore = cookies()
  
  cookieStore.set('segment', segment, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  // Get current URL from headers and redirect back to the same page
  const headersList = headers()
  const referer = headersList.get('referer')
  const currentUrl = referer || '/'
  
  redirect(currentUrl)
}

/**
 * Clear user segment using Next.js Server Actions
 */
export async function clearSegment() {
  const cookieStore = cookies()
  
  cookieStore.delete('segment')
  
  // Get current URL from headers and redirect back to the same page
  const headersList = headers()
  const referer = headersList.get('referer')
  const currentUrl = referer || '/'
  
  redirect(currentUrl)
}
