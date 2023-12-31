import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from './Menu'


function App()  {
  // localStorage.setItem('user')
  return (
    <div className="home-background"> {/* Primena klase za pozadinu */}
      <div className="header">
        <Menu />
        <div className="title">
          The Taste That<br />
          Make You Feel<br />
          Awesome
        </div>
      <br/>
     
      </div>
      <div className='text'>
        <p>Welcome to our oasis of flavor! Indulge in irresistible dishes<br/> that will take you on a culinary journey like no other.<br/>
          Experience the harmony of taste and aroma in every bite.<br/>
          Step into our magical culinary adventure</p>
      </div>
      
    </div>
  );
}

export default App;