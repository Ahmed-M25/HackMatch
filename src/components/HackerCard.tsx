import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Image } from "@chakra-ui/react";

const HackerCard = () => {
  return (
    <Card w='480px' bg="var(--secondary-color)" mb="4">
        <CardHeader>
          <Heading size="md">Name</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Image src='src/assets/elementor-placeholder-image.webp' alt='Profile Picture'/>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                School
              </Heading>
              <Text pt="2" fontSize="sm">
                Computer Science, University of Waterloo, Third Year
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Tech Stack
              </Heading>
              <Text pt="2" fontSize="sm">
                Python, Go, JavaScript
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Looking for...
              </Heading>
              <Text pt="2" fontSize="sm">
                I'm looking for someone who knows blah blah blah
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
  )
}

export default HackerCard