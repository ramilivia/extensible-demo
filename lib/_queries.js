import { gql } from 'graphql-request'

const blogPageQuery = gql`
  fragment BlogPostFields on BlogPost {
    id
    category
    content
    coverImage {
      id
      height
      url
      width
    }
    excerpt
    published
    slug
    title
  }

  query BlogPageQuery($locale: Locale!) {
    page(locales: [$locale, en], where: { slug: "blog" }) {
      id
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
      subtitle
      title
    }
    posts: blogPosts(orderBy: published_DESC) {
      ...BlogPostFields
    }
  }
`

const blogPostQuery = gql`
  query BlogPostQuery($locale: Locale!, $slug: String!) {
    allPosts: blogPosts(locales: [$locale, en], orderBy: published_ASC) {
      id
      slug
      title
    }
    page(where: { slug: "blog" }) {
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
    post: blogPost(where: { slug: $slug }) {
      id
      category
      content
      coverImage {
        id
        height
        url
        width
      }
      excerpt
      published
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
      slug
      title
    }
  }
`

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
      logo {
        url
      }
    }
  }
`

export { 
  blogPageQuery, 
  blogPostQuery, 
  pageQuery, 
  siteConfigurationQuery,
}
