import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Flex, Link, Spacer, Heading, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isLoginSignup = to === "/login" || to === "/signup";
  const isSelected = isLoginSignup
    ? location.pathname === "/login" || location.pathname === "/signup"
    : location.pathname === to;

  return (
    <Link
      as={RouterLink}
      to={to}
      bg={isSelected ? "teal.600" : "teal.500"} // Less contrasting teal
      textShadow="2px 4px 8px rgba(0, 0, 0, 0.6)"
      borderRadius="3xl"
      paddingX="4"
      paddingY="2"
      transition="all 0.3s"
      _hover={{
        bg: "teal.400",
        transform: "scale(1.05)",
      }}
      fontWeight="bold"
      color="white"
    >
      {children}
    </Link>
  );
};

const Navbar = () => {
  return (
    <Box 
      as="header" 
      px={12} 
      py={2} 
      bg="teal.500" // Changed to solid teal color
    >
      <Flex alignItems="center">
        <Image src="src/assets/Logo.webp" alt="Logo" boxSize="60px" mr={4} />
        <Heading
          as={RouterLink}
          to="/"
          size="lg"
          mr="8"
          textShadow="2px 4px 5px rgba(0, 0, 0, 0.6)"
        >
          Dream Team
        </Heading>

        <Spacer />

        <nav>
          <Flex gap="8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/connect">Connect</NavLink>
            <NavLink to="/matches">Matches</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/login">Login/Signup</NavLink>
          </Flex>
        </nav>
      </Flex>
    </Box>
  );
};

export default Navbar;
