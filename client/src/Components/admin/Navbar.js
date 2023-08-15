import React, { useState } from 'react'
import './Navbar.css'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {

  function logOut(params) {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className='navBarContainer'>
        <div className='navBarLogo'>
          <div className='navBarButtons' onClick={() => window.location.href = '/'}>
            <HomeIcon/>
            <span>Incanto</span>
          </div>
        </div>
        <div className='navBarLogInOut'>
        <div className='navBarButtons' onClick={() => logOut()}>
        <AccountCircleIcon></AccountCircleIcon>
        <span>Log out</span>
        </div>
        </div>
    </div>
  )
}

export default Navbar