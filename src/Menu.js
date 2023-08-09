import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import './App.css';


const Menu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    
    const fetchUserData = async () => {
      try {
        const userItem = localStorage.getItem('user');
        if (!userItem) {
          // Handle the case where 'user' item is not set
          console.log("User data not found in localStorage");
          return;
        }
        const token = JSON.parse(localStorage.getItem('user')).token;
        const response = await fetch('http://localhost:8080/api/v1/users', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            Accept: 'application/json',
          },
        });

        if (!ignore && response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('An error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));

  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Contact us</Link>
        </li>
        <li>
          <Link to="/ingredients">Ingredients</Link>
        </li>
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          {user ? (
            <div className="textMenu">
              {/* {`Hello, ${user.username}`} */}
              Hello!
              <ColorButton variant="outlined" onClick={handleLogout}>
                Logout
              </ColorButton>
            </div>
          ) : (
            <div>
              <Link to="/login">Sign in</Link>
            </div>
          )}
        </li>

      </ul>
    </div>
  );
};
export default Menu;
