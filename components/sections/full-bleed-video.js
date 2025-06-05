import { Box, Container, Heading, Stack, Text, Flex, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react'
import Image from 'next/image'
import { useSiteConfiguration } from '@/lib/context/SiteConfigurationContext'

import Button from '@/components/blocks/button'

export default function FullBleedVideo({ buttons, video, title, description }) {
  const siteConfig = useSiteConfiguration()

  console.log('VIDEO', video)

  return (
    <Box>
    </Box>
  )
}
