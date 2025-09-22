import { cookies } from 'next/headers'

/**
 * Check if custom preview mode is enabled
 * @returns {boolean} True if preview mode is enabled
 */
export function isPreviewEnabled() {
  try {
    const cookieStore = cookies();
    const previewCookie = cookieStore.get('hygraph_preview_enabled');
    return previewCookie?.value === 'true';
  } catch (error) {
    // In case cookies() fails (e.g., in static generation)
    console.warn('Failed to check preview mode:', error);
    return false;
  }
}
