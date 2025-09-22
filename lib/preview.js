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

/**
 * Get preview data if available
 * @returns {object|null} Preview data or null if not available
 */
export function getPreviewData() {
  try {
    const cookieStore = cookies();
    const previewDataCookie = cookieStore.get('hygraph_preview_data');
    
    if (!previewDataCookie?.value) {
      return null;
    }
    
    return JSON.parse(previewDataCookie.value);
  } catch (error) {
    console.warn('Failed to get preview data:', error);
    return null;
  }
}

/**
 * Check if preview mode is enabled with additional validation
 * @returns {object} Preview status with additional info
 */
export function getPreviewStatus() {
  const isEnabled = isPreviewEnabled();
  const data = getPreviewData();
  
  return {
    isEnabled,
    data,
    enabledAt: data?.enabledAt,
    isValid: isEnabled && data !== null
  };
}
