import { gql } from 'graphql-request'

const pageQuery = gql`
  query PageQuery($locale: Locale!, $slug: String!) {
    page(locales: [$locale, en], where: { slug: $slug }) {
      blocks {
        __typename
        ... on Breakpoint {
          id
          buttons {
            id
            href
            label
            theme
          }
          subtitle
          title
        }
        ... on GridCardSection {
        sectionTitle: title
        backgroundColor {
          hex
        }
        gridCards {
          image {
            url
          }
          cardTitle: title
          description
          link
        }
        }
        ... on Newsletter {
          id
          ctaLabel
          subtitle
          title
        }
      }
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      hero {
        id
        title
        description
        buttons {
          id
          href
          label
          theme
        }
        image {
          id
          height
          url
          width
        }
      }
      id
      marketing {
        __typename
        ... on Banner {
          id
          content
          href
          slug
          theme
        }
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
    }
  }
`

const genericPageQuery = gql`
  query GenericPageQuery($locale: Locale!, $slug: String!) {
    genericPage(locales: [$locale, en], where: { slug: $slug }) {
      blocks {
        __typename
        ... on Breakpoint {
          id
          buttons {
            id
            href
            label
            theme
          }
          subtitle
          title
        }
        ... on GridCardSection {
        sectionTitle: title
        backgroundColor {
          hex
        }
        gridCards {
          image {
            url
          }
          cardTitle: title
          description
          link
        }
        }
        ... on Newsletter {
          id
          ctaLabel
          subtitle
          title
        }
      }
      footer {
        id
        primaryLinks {
          id
          navigationLabel
          slug
        }
        secondaryLinks {
          id
          navigationLabel
          slug
        }
        slug
        title
      }
      hero {
        id
        title
        description
        buttons {
          id
          href
          label
          theme
        }
        image {
          id
          height
          url
          width
        }
      }
      id
      marketing {
        __typename
        ... on Banner {
          id
          content
          href
          slug
          theme
        }
      }
      navigation {
        id
        slug
        pages(where: { slug_not: "home" }) {
          id
          navigationLabel
          slug
        }
      }
      seo {
        id
        description
        image {
          id
          height
          url
          width
        }
        keywords
        noIndex
        title
      }
    }
  }
`

const siteConfigurationQuery = gql`
  query SiteConfiguration($brandName: String!) {
    siteConfiguration(where: {brandName: $brandName}) {
      id
      brandName
      mainBrandColor {
        hex
      }
      navBackground {
        hex
      }
      navFontColor {
        hex
      }
      bannerBackground {
        hex
      }
      bannerFontColor {
        hex
      }
      primaryButtonBackground {
        hex
      }
      primaryButtonFontColor {
        hex
      }
      secondaryButtonBackground {
        hex
      }
      secondaryButtonFontColor {
        hex
      }
      titlesFontColor {
        hex
      }
      logo {
        url
      }
    }
  }
`

export { 
  pageQuery, 
  genericPageQuery,
  siteConfigurationQuery,
}
