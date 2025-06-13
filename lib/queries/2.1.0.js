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
        ... on AlternatingPanelsSection {
          id
          alternatingPanelsTitle: title
          description
          assetPosition
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
          backgroundColor {
            hex
          }
          textColor {
            hex
          }
        }
        ... on GridCardSection {
          sectionTitle: title
          columnsNumber
          areImagesSameHeight
          middleCrop
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
        ... on TestimonialSection {
          sectionTitle: title
          content 
          personName
          personProfession
          personImage {
            url
          }
        }
        ... on GallerySection {
          id
          galleryTitle: title
          description
          images {
            id
            url
            width
            height
          }
        }
        ... on FeaturedCarouselSection {
          id
          featuredCarouselTitle: title
          description
          buttons {
            id
            href
            label
            theme
          }
          cards {
            title
            description 
            image {
              url
              width
              height
            }
          }
          backgroundColor {
            hex
          }
          textColor {
            hex
          }
        }
        ... on Newsletter {
          id
          subtitle
          title
          button {
            id
            href
            label
            theme
          }
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
        __typename
        ... on Hero {
        id
        title
        description
        buttons {
          id
          href
          label
          theme
        }
        asset {
          id
          height
          url
          width
          mimeType
        }
      }
      ... on HeroRemoteSource {
        id
        title
        description
        buttons {
          id
          href
          label
          theme
        }
        image 
      }
      ... on HeroFullBleed {
        id
        title
        description
        buttons {
          id
          href
          label
          theme
        }
        asset {
          id
          height
          url
          width
          mimeType
        }
        opaque
        textColor {
          hex
        }
        contentPosition
      }
      }
      id
      marketing {
        __typename
        ... on Banner {
          id
          content
          button {
            id
            href
            label
            theme
          }
        }
      }
      navigation {
        id
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
    siteConfiguration(where: { brandName: $brandName }) {
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
      textColor {
        hex
      }
      logo {
        url
      }
      maxLogoWidthPx
    }
  }
`

export {
  pageQuery,
  siteConfigurationQuery,
}
