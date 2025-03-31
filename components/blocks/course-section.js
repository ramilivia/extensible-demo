import { Box, Heading, Text } from "@chakra-ui/react"
import Head from "next/head"

export default function CourseSection({ heading, description, salesforceCourses }) {
  console.log(salesforceCourses.records)

  return (
    <Box
      px={[4, 6, null, 8]}
      my={16}
      mx="auto"
      maxW="7xl"
    >
      <Heading
        mt={2}
        fontSize={['3xl', '4xl']}
        fontWeight="extrabold"
        letterSpacing="tight"
        lineHeight="9"
        color="gray.900"
      >
        {heading}
      </Heading>
      <Text
        fontSize="xl"
        color="gray.500"
      >
        {description}</Text>
      <Box mt={8} display="flex" justifyContent={"space-between"} flexWrap="wrap" gap={4}>
        {salesforceCourses.records.map((course) => (
          <Box
            key={course.Name}
            border="3px solid"
            borderColor="gray.900"
            borderRadius="lg"
            maxW={{lg: '490px', xl: '580px'}}
            p={4}
          >
            <Heading
              fontSize="xl"
              color="gray.900"
            >
              {course.Name}
            </Heading>
            <Text fontSize="sm" color="gray.700">{course.Subtitle__c}</Text>
            <Text fontSize="sm" color="gray.500">{course.Description__c}</Text>
            <Text fontSize="lg" color="gray.700">${course.Price__c}</Text>
            
          </Box>
        ))}
      </Box>
    </Box>
  )
}