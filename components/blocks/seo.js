'use client'

import { NextSeo } from 'next-seo'
import { usePathname } from 'next/navigation'

import { defaultUrl } from '../../next-seo.config'

export default function SEO({
  id,
  image,
  keywords,
  noIndex: noindex = false,
  ...props
}) {
  const pathname = usePathname()

  const SEO = {
    ...(keywords && { keywords: keywords.toString() }),
    noindex,
    openGraph: {
      ...(image && {
        images: [
          {
            alt: props.title,
            ...image
          }
        ]
      }),
      url: defaultUrl + pathname,
      ...props
    },
    ...props
  }

  return <NextSeo {...SEO} />
}
