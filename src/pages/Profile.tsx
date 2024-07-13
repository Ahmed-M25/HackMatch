import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Heading, Text } from '@chakra-ui/react';

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <Box p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Profile Page
      </Heading>
      <Text fontSize="xl" mb={6}>
        Welcome, {username ? username : "Guest"}!
      </Text>
      <Button colorScheme="teal" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
