'use client'

import {
  VisuallyHidden,
  FormLabel,
  Select,
  Box,
  Heading
} from '@chakra-ui/react'
import { setSegment, clearSegment } from '@/lib/actions/segment'

// Client-safe version of personalization check
function isPersonalizationEnabled() {
  return process.env.NEXT_PUBLIC_PERSONALIZATION === 'true'
}

function GridColumnHeading({ children, siteConfiguration }) {
  const siteConfig = siteConfiguration
  return (
    <Heading
      as="h3"
      fontSize={{ base: "md", md: "xl", lg: "xl" }}
      fontWeight="bold"
      color={siteConfig?.titlesFontColor?.hex || "gray.900"}
      letterSpacing="-0.04em"
      fontFamily={siteConfig?.typography === 'serif' ? 'serif' : 'sans-serif'}
      mb={6}
    >
      {children}
    </Heading>
  )
}

export default function SegmentSelector({ siteConfiguration, currentSegment }) {
  const siteConfig = siteConfiguration

  const handleSegmentChange = async (formData) => {
    const selectedSegment = formData.get('segment')
    
    if (selectedSegment === 'no-segment') {
      await clearSegment()
    } else {
      await setSegment(selectedSegment)
    }
  }

  // Only render if segments exist or personalization is enabled
  if (!(siteConfig?.segments?.length > 0 || isPersonalizationEnabled())) {
    return null
  }

  return (
    <Box mt={{ base: 12, xl: 0 }}>
      <GridColumnHeading siteConfiguration={siteConfiguration}>User Segment</GridColumnHeading>
      <Box as="form" action={handleSegmentChange} mt={2} maxW={{ sm: 'xs' }}>
        <Box as="fieldset" w="full">
          <VisuallyHidden as={FormLabel} htmlFor="segment">
            User Segment
          </VisuallyHidden>

          <Box position="relative">
            <Select
              id="segment"
              name="segment"
              color={siteConfig?.textColor?.hex || "gray.900"}
              bg={siteConfig?.backgroundColor?.hex || "white"}
              borderColor="gray.200"
              fontSize="md"
              defaultValue={currentSegment || 'no-segment'}
              onChange={(e) => e.target.closest('form').requestSubmit()}
              _hover={{ borderColor: "gray.300" }}
              borderRadius="md"
            >
              <Box
                as="option"
                bg={siteConfig?.backgroundColor?.hex || "white"}
                color={siteConfig?.textColor?.hex || "gray.900"}
                value="no-segment"
              >
                Default
              </Box>
              {siteConfig?.segments?.length > 0 && (
                siteConfig.segments.map((segment) => (
                  <Box
                    as="option"
                    bg={siteConfig?.backgroundColor?.hex || "white"}
                    color={siteConfig?.textColor?.hex || "gray.900"}
                    key={segment.id}
                    value={segment.name}
                  >
                    {segment.name}
                  </Box>
                ))
              )}
            </Select>
          </Box>    
        </Box>
      </Box>
    </Box>
  )
}
