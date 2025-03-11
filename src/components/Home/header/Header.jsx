import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../../../atom';
import { logout } from '../../../services/auth';

const Header = ({ title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from auth service
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header-container">
      <h1 className="header-title">
        <Link to="/" className="text-white text-decoration-none hover:text-gray-300">
          WAC
        </Link>
      </h1>
      {isAuthenticated && (
        <Dropdown
          show={isDropdownOpen}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <Dropdown.Toggle variant="primary" className="bg-blue-600 border-none">
            <span>{user?.firstName || user || 'User'}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end" className="dropdown-menu-custom">
            <Dropdown.Item as={Link} to="/userzz" className="dropdown-item-custom">
              Users
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={handleLogout}
              className="dropdown-item-custom logout-button"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </header>
  );
};

export default Header;