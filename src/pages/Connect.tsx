import { Stack, Flex, Button, Box, Spinner } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import HackerCard from "../components/HackerCard";
import { useState, useEffect } from "react";
import { HackerStats, profileList } from "../data/hackerData";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Connect = () => {
  const [currIndex, setCurrIndex] = useState(0);
  const [profile, setProfile] = useState<HackerStats>(profileList[currIndex]);
  const [interested, setInterested] = useState<string[]>([]);
  const [animation, setAnimation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleNotInterested = () => {
    // Move to the next profile, if available
    setAnimation("swipeLeft");
    setTimeout(() => {
      if (currIndex < profileList.length - 1) {
        const newIndex = currIndex + 1;
        setCurrIndex(newIndex);
        setProfile(profileList[newIndex]);
        setAnimation("swipeIn");
      }
      else{
        navigate('/matches');
      }
    }, 500);
  };

  const handleInterested = () => {
    // Move to the next profile, if available
    setAnimation("swipeRight");
    setTimeout(() => {
      const firstName = profile.name.split(' ')[0];
      setInterested((prev) => {
        const updatedInterested = [...prev, firstName];
        updatePreferences(updatedInterested);
        return updatedInterested;
      });

      if (currIndex < profileList.length - 1) {
        const newIndex = currIndex + 1;
        setCurrIndex(newIndex);
        setProfile(profileList[newIndex]);
        setAnimation("swipeIn");
      }
      else{
        navigate('/matches');
      }
    }, 500);
  };

  const updatePreferences = async (preferences: string[]) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/auth/preferences', { preferences }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  useEffect(() => {
    return () => {
      updatePreferences(interested);
    };
  }, [interested]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" backgroundImage="url('https://www.transparenttextures.com/patterns/cubes.png')">
      <style>{keyframes}</style>
      <div style={{ ...styles[animation] }}>
        <HackerCard profile={profile} />
      </div>

      <Stack direction="row" spacing={4}>
        <Button
          size="lg"
          colorScheme="red"
          variant="solid"
          flex="1"
          leftIcon={<ArrowBackIcon />}
          onClick={handleNotInterested}
        >
          Not Interested
        </Button>
        <Button
          size="lg"
          colorScheme="teal"
          variant="solid"
          flex="1"
          rightIcon={<ArrowForwardIcon />}
          onClick={handleInterested}
        >
          Interested
        </Button>
      </Stack>
    </Flex>
  );
};

// Define a type for the animation styles
type AnimationStyle = {
  animation: string;
};

// Use Record to type the styles object
const styles: Record<string, AnimationStyle> = {
  swipeLeft: {
    animation: "swipeLeft 0.5s forwards",
  },
  swipeRight: {
    animation: "swipeRight 0.5s forwards",
  },
  swipeIn: {
    animation: "swipeIn 0.5s forwards",
  },
};

// Define keyframes directly in the component
const keyframes = `
  @keyframes swipeLeft {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(-100%);
      opacity: 0;
    }
  }
  @keyframes swipeRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  @keyframes swipeIn {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default Connect;
