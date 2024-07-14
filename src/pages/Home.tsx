import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button, VStack } from '@chakra-ui/react';
import BackgroundImage from '../assets/6e9794bcedeecf5a8f8f41338a2a7345.webp';

const Home: React.FC = () => {
  return (
    <Box style={styles.container}>
      <Box style={styles.overlay} />
      <Box style={styles.mainContent}>
        <VStack style={styles.centeredContent} spacing={6}>
          <Text style={styles.heading} fontSize="8xl" fontWeight="bold">
          HackMatch
          </Text>
          <Link to="/login">
            <Button size="lg" style={styles.gradientButton}>
              Create account
            </Button>
          </Link>
        </VStack>
      </Box>
    </Box>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative',
    minHeight: '90vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainContent: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    padding: '16px',
    boxSizing: 'border-box',
    width: '100%',
  },
  centeredContent: {
    textAlign: 'center',
  },
  heading: {
    color: 'white',
  },
  gradientButton: {
    background: 'linear-gradient(to right, teal, cyan)',
    color: 'white',
    borderRadius: '25px',
  },
};

export default Home;
