import React from 'react';
import { Link } from 'react-router-dom';
//import './App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Menu = () => {
  return (
    <div className="menu">
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
          <Link to="/users">User</Link>
        </li>
        {/* Dodajte Link oko ikonice za prelazak na stranicu za login */}
        <Link to="/login">
          <AccountCircleIcon className="menu-icon" />
        </Link>
      </ul>
    </div>
  );
};

function App()  {
  return (
    <div>
      <div className="header">
        <Menu />
        <div className="title">
          The Taste That<br />
          Make You Feel<br />
          Awesome
        </div>
      </div>
      <div className='text'>
        <p>Welcome to our oasis of flavor! Indulge in irresistible dishes<br/> that will take you on a culinary journey like no other.<br/>
          Experience the harmony of taste and aroma in every bite.<br/>
          Step into our magical culinary adventure</p>
      </div>
      <div className="button-container">
        <button className="menu-button">View Our Menu</button>
      </div>
    </div>
  );
}

export default App;