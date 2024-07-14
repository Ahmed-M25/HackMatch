import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";

interface HackerCardProps {
  profile: {
    name: string;
    school: string;
    techStack: string;
    seeking: string;
    contact: string;
  };
}

const HackerCard: React.FC<HackerCardProps> = ({
  profile: { name, school, techStack, seeking, contact },
}) => {
  return (
    <Card
      w="425px"
      bgGradient="linear(to-r, gray.700, gray.800)"
      mb="4"
      borderWidth="2px"
      borderColor="gray.600"
      borderRadius="lg"
      shadow="lg"
    >
      <CardHeader textAlign="center">
        <Heading size="lg" color="white">
          {name}
        </Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider borderColor="gray.600" />} spacing="4">
          <Box textAlign="center">
            <Image
              src="src/assets/elementor-placeholder-image.webp"
              alt="Profile Picture"
              maxWidth="80%"
              height="auto"
              objectFit="cover"
              display="block"
              margin="0 auto"
              borderRadius="full"
              shadow="md"
            />
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" color="gray.300">
              School
            </Heading>
            <Text pt="2" fontSize="sm" color="white">
              {school}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" color="gray.300">
              Tech Stack
            </Heading>
            <Text pt="2" fontSize="sm" color="white">
              {techStack}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" color="gray.300">
              Looking for someone that knows...
            </Heading>
            <Text pt="2" fontSize="sm" color="white">
              {seeking}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase" color="gray.300">
              Contact
            </Heading>
            <Text pt="2" fontSize="sm" color="white">
              {contact}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HackerCard;
