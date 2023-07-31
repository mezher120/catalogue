import React from 'react';
import './Header.css';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#fff',
      }
    }
  });

function Header() {
  return (
    <div className='headerContainer'>
        <h1 className='headerCatalogo'>CATALOGO 2023</h1>
        
        <div className='headerIncantoGroup'>
        <span className='headerIncanto'>INCANTO</span>
        <span className='headerGroup'>GROUP</span>
        </div>

        <div className='headerSocialsContainer'>
            <div className='headerSocials'>
            <ThemeProvider theme={theme}>
            <PinterestIcon className='cursor: pointer' color='primary' fontSize='large'></PinterestIcon>
            <InstagramIcon color='primary' fontSize='large'></InstagramIcon>
            </ThemeProvider>
            <span className='headerInstagram'>@incantogroup</span>
            </div>
            <div className='headerWhatsapp'>
            <ThemeProvider theme={theme}>
                <WhatsAppIcon></WhatsAppIcon>
            </ThemeProvider>
                <span>1130149572</span>
            </div>
        </div>


    </div>
  )
}

export default Header