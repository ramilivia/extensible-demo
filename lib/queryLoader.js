import { gql } from 'graphql-request'

export async function loadQuery(filename) {
  try {
    const queryModule = await import(`./queries/${filename}.js`)
    return {
      queryFile: queryModule.pageQuery,
      configurationFile: queryModule.siteConfigurationQuery,
      personalizationQueryFile: queryModule.personalizationPageQuery,
      alternatingPanelWithVariantsFile: queryModule.alternatingPanelWithVariantsQuery,
      segmentsFile: queryModule.segmentsQuery,
    }
  } catch (error) {
    return null;
  }
}

export function createQuery(queryString) {
  return gql`${queryString}`
} 