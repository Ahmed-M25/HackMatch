import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Spinner, Flex, Button, Image, Stack } from '@chakra-ui/react';
import { FaHeart, FaTimes } from 'react-icons/fa';

interface UserProfile {
  user: string;
  tech_stack: string;
  interests: string;
  preferences: [string];
  contact: string;
}

const Matches: React.FC = () => {
  const [team, setTeam] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await axios.get('http://localhost:5001/api/team', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTeam(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team:', error);
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      p={6}
      color="white"
      minH="100vh"
      bgGradient="linear(to-r, gray.800, gray.700)"
      backgroundImage="url('https://www.transparenttextures.com/patterns/cubes.png')"
    >
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        My Team
      </Heading>
      <Flex justify="center" flexWrap="wrap">
        {team.map((member, index) => (
          <Box
            key={index}
            bg="gray.700"
            borderRadius="md"
            shadow="md"
            m={4}
            p={6}
            width="300px"
            textAlign="center"
            position="relative"
          >
            {/* <Image
              src={`https://api.adorable.io/avatars/285/${member.user}.png`}
              alt={member.user}
              borderRadius="full"
              boxSize="120px"
              objectFit="cover"
              mx="auto"
              mb={4}
            /> */}
            <Heading as="h3" size="lg" mb={4} textTransform="capitalize">
              {member.user}
            </Heading>
            <Stack spacing={3} textAlign="left">
              <Box>
                <Text fontWeight="bold">Tech Stack</Text>
                <Text>{member.tech_stack}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Interests</Text>
                <Text>{member.interests}</Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Contact</Text>
                <Text>{member.contact}</Text>
              </Box>
            </Stack>
            <Flex justify="space-around" mt={6}>
              <Button colorScheme="red" leftIcon={<FaTimes />} variant="solid">
                Pass
              </Button>
              <Button colorScheme="green" leftIcon={<FaHeart />} variant="solid">
                Like
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Matches;
