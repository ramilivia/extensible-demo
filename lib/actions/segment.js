'use server'

import { cookies } from 'next/headers'
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
  
  // Redirect to current page to refresh with new segment
  redirect('/')
}

/**
 * Clear user segment using Next.js Server Actions
 */
export async function clearSegment() {
  const cookieStore = cookies()
  
  cookieStore.delete('segment')
  
  // Redirect to current page to refresh without segment
  redirect('/')
}
