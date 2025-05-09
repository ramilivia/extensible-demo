import { GraphQLClient } from 'graphql-request'

const hygraphClient = (preview = false) => {
  console.log('TITOMAN')
  console.log(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN)
  console.log(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT)
  return new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT, {
    headers: {
      ...(process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN && {
        Authorization: `Bearer ${
          preview
            ? process.env.NEXT_PUBLIC_GRAPHCMS_PREVIEW_TOKEN
            : process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN
        }`
      })
    }
  })

}
  

export { hygraphClient }
