import '../styles/css/global.css'
import Link from 'next/link'
import { Flex, Box } from '@chakra-ui/react'
import Footer from '@/components/sections/footer'
import QueryParamPreserver from '@/components/layout/query-param-preserver'

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

function PreviewBanner({ enabled = false }) {
  if (!enabled) return null

  return (
    <Box textAlign="center" p="2" backgroundColor="black" textColor="white">
      Preview Mode Enabled (Content served from DRAFT) &mdash;&nbsp;
      <Link href="/api/exit-preview">
        Exit Preview Mode
      </Link>
    </Box>
  )
}

export default function RootLayout({ children }) {
  return (
    <>
      <QueryParamPreserver />
      {children}
    </>
  )
}