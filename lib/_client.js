import { GraphQLClient } from 'graphql-request'

const hygraphClient = (preview = false) => {

  return new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
        Authorization: `Bearer ${
          preview
            ? process.env.GRAPHCMS_PREVIEW_TOKEN
            : process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN
        }`
      })
    }
  })

}
  

export { hygraphClient }
