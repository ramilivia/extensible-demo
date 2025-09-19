import { cookies } from 'next/headers'

/**
 * Get the current user segment from cookies
 * @returns {string} The current segment or empty string if none set
 */
export function getCurrentSegment() {
  try {
    const cookieStore = cookies()
    return cookieStore.get('segment')?.value || 'no-segment'
  } catch (error) {
    // During static generation, cookies() will throw an error
    // Return default segment for static generation
    return 'no-segment'
  }
}

/**
 * Check if personalization is enabled
 * @returns {boolean} True if personalization is enabled
 */
export function isPersonalizationEnabled() {
  return process.env.NEXT_PUBLIC_PERSONALIZATION === 'true'
}
