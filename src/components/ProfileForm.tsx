import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";

const ProfileForm: React.FC = () => {
  // Adjust the form layout based on screen size
  const spacing = useBreakpointValue({ base: "4", md: "8" });

  const [school, setSchool] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [desiredRole, setDesiredRole] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const [isSchoolInvalid, setIsSchoolInvalid] = useState<boolean>(false);
  const [isTechStackInvalid, setIsTechStackInvalid] = useState<boolean>(false);
  const [isRoleInvalid, setIsRoleInvalid] = useState<boolean>(false);
  const [isContactInvalid, setIsContactInvalid] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;

    // Validate fields
    if (!school) {
      setIsSchoolInvalid(true);
      hasErrors = true;
    } else {
      setIsSchoolInvalid(false);
    }

    if (!techStack) {
      setIsTechStackInvalid(true);
      hasErrors = true;
    } else {
      setIsTechStackInvalid(false);
    }

    if (!desiredRole) {
      setIsRoleInvalid(true);
      hasErrors = true;
    } else {
      setIsRoleInvalid(false);
    }

    if (!contact) {
      setIsContactInvalid(true);
      hasErrors = true;
    } else {
      setIsContactInvalid(false);
    }

    if (hasErrors) {
      return; // Stop the form submission if there are validation errors
    }

    // If no errors, send the values
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5001/api/auth/profile",
        { school, techStack, desiredRole, contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Successful");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={spacing} align="stretch">
        <FormControl id="school" isRequired>
          <FormLabel>School</FormLabel>
          <Input
            placeholder="Enter your program and school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            isInvalid={isSchoolInvalid}
            errorBorderColor="crimson"
          />
        </FormControl>

        <FormControl id="tech-stack" isRequired>
          <FormLabel>Tech Stack</FormLabel>
          <Input
            placeholder="Enter the technologies you use"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            isInvalid={isTechStackInvalid}
            errorBorderColor="crimson"
          />
        </FormControl>

        <FormControl id="looking-for" isRequired>
          <FormLabel>I'm looking for someone that knows...</FormLabel>
          <RadioGroup onChange={(value) => setDesiredRole(value)} value={desiredRole}>
            <Stack direction='column'>
              <Radio value='1' colorScheme='teal' isInvalid={isRoleInvalid}>Frontend</Radio>
              <Radio value='2' colorScheme='teal' isInvalid={isRoleInvalid}>Backend</Radio>
              <Radio value='4' colorScheme='teal' isInvalid={isRoleInvalid}>Fullstack</Radio>
              <Radio value='5' colorScheme='teal' isInvalid={isRoleInvalid}>Mobile</Radio>
              <Radio value='6' colorScheme='teal' isInvalid={isRoleInvalid}>AI/ML</Radio>
              <Radio value='7' colorScheme='teal' isInvalid={isRoleInvalid}>Hardware/Embedded</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl id="contact" isRequired>
          <FormLabel>Contact</FormLabel>
          <Input
            placeholder="Enter your contact information"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            isInvalid={isContactInvalid}
            errorBorderColor="crimson"
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default ProfileForm;
