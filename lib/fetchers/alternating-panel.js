import { notFound } from 'next/navigation'
import { hygraphClient } from '@/lib/_client'
import { loadQuery } from '@/lib/queryLoader'
import { parsePageData } from '@/utils/_parsePageData'
import { getCurrentSegment, isPersonalizationEnabled } from '@/lib/segment'
import { isPreviewEnabled } from '@/lib/preview'

export async function getAlternatingPanelWithVariantsData(id, searchParams = {}, options = {}) {
  const { throwOnNotFound = false, locale = 'en' } = options
  const previewEnabled = isPreviewEnabled()
  const client = hygraphClient(previewEnabled)
  const segment = getCurrentSegment()
  try {
    
    if (!isPersonalizationEnabled()) {
        throw new Error('Personalization is not enabled')
    }
  
    const { 
      alternatingPanelWithVariantsFile,
      configurationFile
    } = await loadQuery(process.env.NEXT_PUBLIC_VERSION) ?? {}
  
    // Get both alternating panel data and site configuration
    const [panelResult, configResult] = await Promise.all([
      client.request(alternatingPanelWithVariantsFile, {
        locale: locale,
        id: id,
        segment: segment
      }),
      client.request(configurationFile, {
        brandName: process.env.NEXT_PUBLIC_BRAND_NAME
      })
    ]);
      
    return {
      alternatingPanelsSection: panelResult.alternatingPanelsSection,
      siteConfiguration: configResult.siteConfiguration
    };
    
  } catch (error) {
    console.error('Error fetching alternating panel data:', error)
    
    return {
      alternatingPanelsSection: null,
      siteConfiguration: null
    }
  }
}
