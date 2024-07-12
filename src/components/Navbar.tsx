import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">Logo</Link>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login/Signup</Link>
        <Link to="/connect">Connect</Link>
      </nav>
    </header>
  );
};

export default Navbar;
