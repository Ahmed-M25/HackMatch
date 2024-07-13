import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
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
  const [desiredRoles, setDesiredRoles] = useState<string[]>([]);
  const [contact, setContact] = useState<string>("");

  const [isSchoolInvalid, setIsSchoolInvalid] = useState<boolean>(false);
  const [isTechStackInvalid, setIsTechStackInvalid] = useState<boolean>(false);
  const [isContactInvalid, setIsContactInvalid] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDesiredRoles(
      (prevRoles) =>
        prevRoles.includes(value)
          ? prevRoles.filter((role) => role !== value) // Remove if already in list
          : [...prevRoles, value] // Add if not in list
    );
  };

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

    if (!contact) {
      setIsContactInvalid(true);
      hasErrors = true;
    } else {
      setIsContactInvalid(false);
    }

    if (desiredRoles.length === 0) {
      hasErrors = true;
    }

    if (hasErrors) {
      return; // Stop the form submission if there are validation errors
    }

    // If no errors, send the values
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5001/api/auth/profile",
        { school, techStack, desiredRoles, contact },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Profile updated successfully");
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
          <FormLabel>I'm looking for...</FormLabel>
          <Stack direction="column">
            <Checkbox value="frontend" onChange={handleCheckboxChange}>
              Frontend
            </Checkbox>
            <Checkbox value="backend" onChange={handleCheckboxChange}>
              Backend
            </Checkbox>
            <Checkbox value="fullstack" onChange={handleCheckboxChange}>
              Fullstack
            </Checkbox>
            <Checkbox value="mobile" onChange={handleCheckboxChange}>
              Mobile
            </Checkbox>
            <Checkbox value="ai-ml" onChange={handleCheckboxChange}>
              AI/ML
            </Checkbox>
            <Checkbox value="hardware-embedded" onChange={handleCheckboxChange}>
              Hardware/Embedded
            </Checkbox>
          </Stack>
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
