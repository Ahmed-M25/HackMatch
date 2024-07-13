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

const HackerCard: React.FC<HackerCardProps> = ({ profile: { name, school, techStack, seeking, contact } }) => {
  return (
    <Card w="480px" bg="gray.700" mb="4">
      <CardHeader>
        <Heading size="md">{name}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* Optionally, you can add a placeholder image */}
          <Box>
            <Image
              src="src/assets/elementor-placeholder-image.webp"
              alt="Profile Picture"
            />
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              School
            </Heading>
            <Text pt="2" fontSize="sm">
              {school}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Tech Stack
            </Heading>
            <Text pt="2" fontSize="sm">
              {techStack}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Looking for...
            </Heading>
            <Text pt="2" fontSize="sm">
              {seeking}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Contact
            </Heading>
            <Text pt="2" fontSize="sm">
              {contact}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default HackerCard;
