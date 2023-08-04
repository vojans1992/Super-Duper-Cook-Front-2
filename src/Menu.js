import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Menu = () => {
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
        <Link to="/login">
          <AccountCircleIcon className={styles["menu-icon"]} />
        </Link>
      </ul>
    </div>
  );
};

export default Menu;