import { cookies } from 'next/headers'

/**
 * Get the current user segment from cookies
 * @returns {string} The current segment or empty string if none set
 */
export function getCurrentSegment() {
  const cookieStore = cookies()
  return cookieStore.get('segment')?.value || 'no-segment'
}

/**
 * Check if personalization is enabled
 * @returns {boolean} True if personalization is enabled
 */
export function isPersonalizationEnabled() {
  return process.env.NEXT_PUBLIC_PERSONALIZATION === 'true'
}
