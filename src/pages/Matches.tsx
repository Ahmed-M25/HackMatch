import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Spinner } from '@chakra-ui/react';

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
    <Box p={6} color="white" minH="100vh">
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        My Team
      </Heading>
      <Box mb={8} p={4} bg="gray.700" borderRadius="md" shadow="md">
        <Heading as="h2" size="lg" mb={4}>
          Team
        </Heading>
        <List spacing={3}>
          {team.map((member, index) => (
            <ListItem key={index} p={3} bg="gray.600" borderRadius="md">
              <Text fontWeight="bold" textTransform={'capitalize'}>{member.user}</Text>
              <Text>{member.tech_stack}</Text>
              <Text>{member.interests}</Text>
              <Text>{member.contact}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Matches;
