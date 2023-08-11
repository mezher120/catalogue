import React, { useState } from 'react'
import './Navbar.css'
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {

    const [login, setLogin] = useState(true)

  return (
    <div className='navBarContainer'>
        <div className='navBarLogo'>
          <div className='navBarButtons' onClick={() => window.location.href = '/'}>
            <HomeIcon/>
            <span>Incanto</span>
          </div>
        </div>
        <div className='navBarLogInOut'>
        {login ? 
        <div className='navBarButtons'>
        <AccountCircleIcon></AccountCircleIcon>
        <span>Log out</span>
        </div> : 
        <div className='navBarButtons'>
          <AccountCircleIcon></AccountCircleIcon>
          <span>Log In</span>
        </div> }
        </div>
    </div>
  )
}

export default Navbar