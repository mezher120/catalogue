import React from 'react'
import './Footer.css'
import logo from '../assets/logoTransparent.png'

function Footer() {
  return (
    <div className='footerWrapper'>
    <div className='footerContainer'> 
      <div className='footerAlign'>{logo ? <img height={20}src={logo} alt='logo'></img> : 'INCANTO' } <span>© 2023</span></div>
    </div>
    </div>
  )
}

export default Footer