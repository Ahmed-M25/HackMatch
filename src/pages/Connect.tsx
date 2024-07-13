import { Stack, Flex, Button } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import HackerCard from "../components/HackerCard";
import { useState } from "react";
import { HackerStats, profileList } from "../data/hackerData";

const Connect = () => {
  const [started, setStarted] = useState(false);

  const [currIndex, setCurrIndex] = useState(0);
  const [profile, setProfile] = useState<HackerStats>(profileList[currIndex]);
  const [interested, setInterested] = useState<string[]>([]) // All the people the current user is interested in
  
  const [animation, setAnimation] = useState<string>("");

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
    }, 500);
  };

  const handleInterested = () => {
    // Move to the next profile, if available
    setAnimation("swipeRight");
    setTimeout(() => {
      setInterested((prev) => [...prev, profile.name]);

      if (currIndex < profileList.length - 1) {
        const newIndex = currIndex + 1;
        setCurrIndex(newIndex);
        setProfile(profileList[newIndex]);
        setAnimation("swipeIn");
      }
    }, 500);
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh">
      {!started ? (
        <Button size="lg" colorScheme="teal" onClick={handleStart}>
          Start Connecting
        </Button>
      ) : (
        <>
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
        </>
      )}
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
