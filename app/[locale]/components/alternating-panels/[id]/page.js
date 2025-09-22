import { getAlternatingPanelWithVariantsData } from '@/lib/fetchers/alternating-panel';
import ChakraThemeProvider from '@/components/layout/chakra-provider';
import { InspectorProvider } from '@/lib/inspector';
import AlternatingPanelsSection from '@/components/sections/alternating-panels-section';

export default async function Page({ params }) {
  const resolvedParams = await params;

  const data = await getAlternatingPanelWithVariantsData(resolvedParams.id);
  
  const { alternatingPanelsSection, siteConfiguration } = data || {};

  // Handle loading/error states
  if (!alternatingPanelsSection || !siteConfiguration) {
    return <div>Loading...</div>;
  }
  
  return (
    <ChakraThemeProvider siteConfiguration={siteConfiguration}>
      <InspectorProvider>
        <div style={{ minHeight: '100vh', backgroundColor: siteConfiguration?.backgroundColor?.hex || 'white' }}>
          <AlternatingPanelsSection 
            {...alternatingPanelsSection} 
            siteConfiguration={siteConfiguration}
          />
        </div>
      </InspectorProvider>
    </ChakraThemeProvider>
  );
}