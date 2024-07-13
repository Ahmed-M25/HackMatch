import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, Link } from '@chakra-ui/react';
import axios from 'axios';

interface AuthFormProps {
  formType: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ formType }) => {
  const [isLogin, setIsLogin] = useState(formType === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(formType === 'login');
  }, [formType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = isLogin 
        ? await axios.post('http://localhost:5001/api/auth/login', { email, password })
        : await axios.post('http://localhost:5001/api/auth/signup', { username, email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box p={8} maxWidth="450px" borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        {isLogin ? 'Login' : 'Sign Up'}
      </Heading>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <FormControl mb={4}>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </FormControl>
        )}
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormControl>
        <Button colorScheme="teal" width="full" type="submit" mb={4}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>
      <Text textAlign="center">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <Link as={RouterLink} to="/signup" color="teal.500">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="teal.500">
              Login
            </Link>
          </>
        )}
      </Text>
    </Box>
  );
};

export default AuthForm;
