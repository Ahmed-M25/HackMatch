import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Heading, List, ListItem, Text, Spinner } from '@chakra-ui/react';

interface UserProfile {
  user: string;
  tech_stack: string;
  interests: string;
  preferences: string[];
}

interface Teams {
  [key: string]: UserProfile[];
}

const Matches: React.FC = () => {
  const [teams, setTeams] = useState<Teams>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/teams');
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
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
      {Object.keys(teams).map((teamId) => (
        <Box key={teamId} mb={8} p={4} bg="gray.700" borderRadius="md" shadow="md">
          <Heading as="h2" size="lg" mb={4}>
            Team {parseInt(teamId) + 1}
          </Heading>
          <List spacing={3}>
            {teams[teamId].map((member, index) => (
              <ListItem key={index} p={3} bg="gray.600" borderRadius="md">
                <Text fontWeight="bold">{member.user}</Text>
                <Text>{member.tech_stack}</Text>
                <Text>{member.interests}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default Matches;