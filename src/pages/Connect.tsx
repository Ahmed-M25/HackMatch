import {Stack, Flex, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import HackerCard from "../components/HackerCard";

const Connect = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
    >
      <HackerCard />

      <Stack direction='row' spacing={4}>
        <Button size='lg' colorScheme='teal' variant='solid' flex='1' leftIcon={<ArrowBackIcon />}>
          Not Interested
        </Button>
        <Button size='lg' colorScheme='teal' variant='solid' flex='1' rightIcon={<ArrowForwardIcon />}>
          Interested
        </Button>
      </Stack>
    </Flex>
  );
};

export default Connect;
