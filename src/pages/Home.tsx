import React from 'react';
import { Link } from 'react-router-dom';
import CompImage from '../assets/Comp.png';


const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <img src={CompImage} alt="Illustration" style={styles.image} />
        <div style={styles.welcomeBox}>
          <h2 style={styles.welcomeTitle}>Connect with Innovators and Build Your Dream Team</h2>
          <Link to="/login">
          <button style={styles.getStartedButton}>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '91vh',
    margin: 0,
    padding: 0,
    backgroundColor: '#20232a',
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
  buttons: {
    display: 'flex',
    gap: '8px',
  },
  button: {
    padding: '8px 16px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    color: '#20232a',
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
  welcomeTitle: {
    marginBottom: '16px',
  },
  image: {
    maxWidth: '65%',
    height: 'auto',
  },
  getStartedButton: {
    padding: '12px 24px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    color: '#20232a',
  },
};

export default Home;
