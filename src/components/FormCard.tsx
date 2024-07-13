import { Box } from '@chakra-ui/react';
import React from 'react';

interface FormCardProps {
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        p={10}
        borderRadius="md"
        boxShadow="md"
        minW="450px"
      >
        {children}
      </Box>
    </Box>
  );
};

export default FormCard;
