import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Flex, Link, Spacer, Heading } from "@chakra-ui/react";
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
      bg={isSelected ? "teal.500" : "teal.400"}
      borderRadius="3xl"
      paddingX="4"
      paddingY="2"
      transition="all 0.3s"
      _hover={{
        bg: "teal.500",
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
    <Box as="header" px={12} py={4} bg="teal.400">
      <Flex alignItems="center">
        <Heading as={RouterLink} to="/" size="lg" mr="8">
          Dream Team
        </Heading>

        <Spacer />

        <nav>
          <Flex gap="8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login/Signup</NavLink>
            <NavLink to="/connect">Connect</NavLink>
            <NavLink to="/matches">Matches</NavLink>
          </Flex>
        </nav>
      </Flex>
    </Box>
  );
};

export default Navbar;
