import React from 'react';
import { Link } from 'react-router-dom';
import CompImage from '../assets/Comp.png';
import { Text, Button } from '@chakra-ui/react';


const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <img src={CompImage} alt="Illustration" style={styles.image} />
        <div style={styles.welcomeBox}>
          <Text color={'teal.100'} fontSize='2xl' mb={6}>Connect with innovators and build your Dream Team</Text>
          <Link to="/login">
            <Button size='lg' colorScheme='teal'>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '90vh',
    margin: 0,
    padding: 0,
    color: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  title: {
    margin: 0,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '16px',
    boxSizing: 'border-box',
    gap: '32px',
    marginLeft: '10%',
    width: '80%',
  },
  welcomeBox: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '50%',
  },
  image: {
    maxWidth: '60%',
    height: 'auto',
  }
};


export default Home;
