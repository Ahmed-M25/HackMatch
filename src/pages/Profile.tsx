import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Text } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg" height="100vh">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Your Profile
      </Heading>
      <Text fontSize="xl" mb={6} textAlign="center">
        Welcome, {username === "undefined" ? "Guest" : username}!
      </Text>

      <ProfileForm />

      <Button
        colorScheme="teal"
        onClick={handleLogout}
        position="absolute"
        bottom={8}
        right={8}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Profile;
