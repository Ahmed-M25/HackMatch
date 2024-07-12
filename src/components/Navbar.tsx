import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/connect" className="text-white hover:text-gray-300">
            Connect
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
