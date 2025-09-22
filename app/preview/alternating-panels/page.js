'use client'

import { Box } from '@chakra-ui/react'
import ChakraThemeProvider from '@/components/layout/chakra-provider'
import { AlternatingPanelsSection } from '@/components/sections'

// Mock site configuration
const mockSiteConfiguration = {
  id: "preview-site",
  brandName: "Preview Site",
  typography: "sans-serif",
  backgroundColor: {
    hex: "#ffffff"
  },
  textColor: {
    hex: "#1a202c"
  },
  primaryButtonBackground: {
    hex: "#3182ce"
  },
  primaryButtonFontColor: {
    hex: "#ffffff"
  },
  secondaryButtonBackground: {
    hex: "#e2e8f0"
  },
  secondaryButtonFontColor: {
    hex: "#2d3748"
  },
  titlesFontColor: {
    hex: "#1a202c"
  },
  navBackground: {
    hex: "#ffffff"
  },
  navFontColor: {
    hex: "#2d3748"
  },
  mainBrandColor: {
    hex: "#3182ce"
  },
}

// Mock data for alternating panels - Left positioned
const mockAlternatingPanelsLeft = {
  id: "preview-alternating-panels-left",
  alternatingPanelsTitle: "Transform Your Business with AI",
  description: "Discover how our cutting-edge artificial intelligence solutions can revolutionize your workflow, increase productivity, and drive innovation across your entire organization.",
  assetPosition: "left",
  backgroundColor: {
    hex: "#f7fafc"
  },
  textColor: {
    hex: "#2d3748"
  },
  buttons: [
    {
      id: "btn-1",
      href: "#",
      label: "Get Started",
      theme: "PRIMARY"
    },
    {
      id: "btn-2", 
      href: "#",
      label: "Learn More",
      theme: "SECONDARY"
    }
  ],
  image: {
    id: "preview-image-1",
    url: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Team collaboration with AI technology",
    width: 800,
    height: 600
  }
}

// Mock data for alternating panels - Right positioned
const mockAlternatingPanelsRight = {
  id: "preview-alternating-panels-right",
  alternatingPanelsTitle: "Seamless Integration",
  description: "Our platform integrates effortlessly with your existing tools and workflows. No disruption, just enhancement. Connect with over 100+ popular business applications.",
  assetPosition: "right",
  backgroundColor: {
    hex: "#edf2f7"
  },
  textColor: {
    hex: "#2d3748"
  },
  buttons: [
    {
      id: "btn-3",
      href: "#",
      label: "View Integrations",
      theme: "PRIMARY"
    }
  ],
  image: {
    id: "preview-image-2", 
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    alt: "Dashboard showing business analytics",
    width: 800,
    height: 600
  }
}

// Mock data with variants
const mockAlternatingPanelsWithVariants = {
  id: "preview-alternating-panels-variants",
  alternatingPanelsTitle: "Default Title",
  description: "Default description that will be overridden by variants",
  assetPosition: "right",
  backgroundColor: {
    hex: "#ffffff"
  },
  textColor: {
    hex: "#2d3748"
  },
  buttons: [
    {
      id: "btn-4",
      href: "#",
      label: "Default Button",
      theme: "PRIMARY"
    }
  ],
  image: {
    id: "preview-image-3",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    alt: "Team meeting in modern office",
    width: 800,
    height: 600
  },
  variants: [
    {
      alternatingPanelsTitle: "Personalized Experience",
      description: "This content is dynamically personalized based on user preferences and behavior. Experience tailored messaging that resonates with your specific needs and interests.",
      backgroundColor: {
        hex: "#fef5e7"
      },
      textColor: {
        hex: "#744210"
      },
      image: {
        id: "preview-image-variant",
        url: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Personalized user interface",
        width: 800,
        height: 600
      }
    }
  ]
}

export default function AlternatingPanelsPreview() {
  return (
    <ChakraThemeProvider siteConfiguration={mockSiteConfiguration}>
      <Box minH="100vh" bg="white">
        {/* Page Header */}
        <Box bg="gray.50" py={8} px={4} borderBottom="1px" borderColor="gray.200">
          <Box maxW="7xl" mx="auto">
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#2d3748',
              marginBottom: '0.5rem'
            }}>
              Alternating Panels Preview
            </h1>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#4a5568'
            }}>
              Preview of the alternating panels section component with different configurations
            </p>
          </Box>
        </Box>

        {/* Preview Sections */}
        <Box>
          {/* Section 1: Asset on Left */}
          <Box py={4} px={4} bg="white" borderBottom="1px" borderColor="gray.100">
            <Box maxW="7xl" mx="auto" mb={4}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '0.25rem'
              }}>
                Asset Position: Left
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                Image positioned on the left, content on the right
              </p>
            </Box>
            <AlternatingPanelsSection 
              {...mockAlternatingPanelsLeft} 
              siteConfiguration={mockSiteConfiguration} 
            />
          </Box>

          {/* Section 2: Asset on Right */}
          <Box py={4} px={4} bg="white" borderBottom="1px" borderColor="gray.100">
            <Box maxW="7xl" mx="auto" mb={4}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '0.25rem'
              }}>
                Asset Position: Right
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                Image positioned on the right, content on the left
              </p>
            </Box>
            <AlternatingPanelsSection 
              {...mockAlternatingPanelsRight} 
              siteConfiguration={mockSiteConfiguration} 
            />
          </Box>

          {/* Section 3: With Variants */}
          <Box py={4} px={4} bg="white" borderBottom="1px" borderColor="gray.100">
            <Box maxW="7xl" mx="auto" mb={4}>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: '#2d3748',
                marginBottom: '0.25rem'
              }}>
                With Variants (Personalization)
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#718096' }}>
                Shows variant content when variants array is provided
              </p>
            </Box>
            <AlternatingPanelsSection 
              {...mockAlternatingPanelsWithVariants} 
              siteConfiguration={mockSiteConfiguration} 
            />
          </Box>
        </Box>
      </Box>
    </ChakraThemeProvider>
  )
}
