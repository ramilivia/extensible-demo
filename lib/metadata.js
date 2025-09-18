const defaultUrl = `https://marketing-websites.withheadlesscms.com`

/**
 * Generate metadata for Next.js pages based on SEO data
 * @param {Object} seoData - SEO data from CMS
 * @param {string} pathname - Current pathname
 * @returns {Object} Next.js metadata object
 */
export function generateSEOMetadata(seoData, pathname = '') {
  if (!seoData) return {}

  const { 
    title, 
    description, 
    keywords, 
    image, 
    noIndex = false 
  } = seoData

  const url = `${defaultUrl}${pathname}`

  return {
    ...(title && { title }),
    ...(description && { description }),
    ...(keywords && { keywords: keywords.toString() }),
    ...(noIndex && { robots: { index: false } }),
    openGraph: {
      ...(title && { title }),
      ...(description && { description }),
      url,
      ...(image && {
        images: [{
          url: image.url || image.src,
          width: image.width,
          height: image.height,
          alt: title || image.alt,
        }]
      }),
    },
    twitter: {
      ...(title && { title }),
      ...(description && { description }),
      ...(image && {
        images: [image.url || image.src]
      }),
    },
  }
}
