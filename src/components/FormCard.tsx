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
      mt='100px'
      height="645px"
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
