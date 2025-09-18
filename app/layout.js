import '../styles/css/global.css'

const description = `Learn how to build modern marketing websites, with localization and SEO, using Hygraph, NextJS, Chakra UI, and Vercel.`
const title = `Build Modern Marketing Websites with a Headless CMS`
const url = `https://marketing-websites.withheadlesscms.com`

export const metadata = {
  title: {
    template: '%s | Hygraph',
    default: title
  },
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    url,
  },
  twitter: {
    creator: '@Hygraphcom',
    site: '@Hygraphcom',
  },
  metadataBase: new URL(url),
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@tailwindcss/typography@0.2.x/dist/typography.min.css"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}