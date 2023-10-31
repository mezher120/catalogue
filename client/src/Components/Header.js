import React, { useEffect, useState } from 'react';
import './Header.css';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import logo from '../assets/logoWhite.png'
import {url} from '../App';
import { Skeleton } from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#fff',
      }
    }
  });

function Header() {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      console.log(url);
      const res = await axios.get(`${url}/covers`);

      console.log(res, 'headers')
      setData(res.data[0])
    }
    fetchData();
  },[])

  function goToUrl(params) {
    window.open(`https://www.instagram.com/${data.instagramUrl}`, '_blank')
  }

  return (
    <div className='headerContainer'>
        {data?.title ? 
        <h1 className='headerCatalogo'>{data.title}</h1>
        :
        <h1 className='headerCatalogo'>{`CATALOGO ${new Date().getFullYear()}`}</h1>
        }
        
        <div className='headerIncantoGroup'>
        {/* <span className='headerIncanto'>{data?.enterprise ? data.enterprise : 'Company'}</span>
        <span className='headerGroup'>{data?.subtitle ? data.subtitle : 'GROUP'}</span> */}
        {logo ? 
        <img className='headerLogo' src={logo} alt='Logo Company'></img>
        : <Skeleton variant="rounded" width={410} height={160} />
        }
        </div>

        <div className='headerSocialsContainer'>
            {logo ? 
          <div className='headerSocials'>
            <ThemeProvider theme={theme}>
            {data?.facebook && <PinterestIcon className='headerIcon' color='primary' fontSize='large' onClick={() => window.location.href = data?.facebookUrl} ></PinterestIcon>}
            {data?.instagram && <InstagramIcon className='headerIcon' color='primary' fontSize='large' onClick={() => goToUrl()} ></InstagramIcon>}
            </ThemeProvider>
            <span className='headerInstagram' onClick={() => goToUrl()}>@{data?.instagramUrl}</span>
            </div>
            : <Skeleton variant="rounded" width={210} height={60} />   
          } 
            
          { logo ? 
            <div className='headerWhatsapp headerIcon'>
            <a className='headerWhatsapp headerIcon' target='_blank' href={`https://wa.me/${data?.whatsAppUrl}`}>
            <ThemeProvider theme={theme}>
                {data?.whatsApp && <WhatsAppIcon></WhatsAppIcon>}
            </ThemeProvider>
                {data?.whatsAppUrl && <span>1130149572</span>}
            </a>
            </div>
          : <Skeleton variant="rounded" width={210} height={60} />
        }
        </div>


    </div>
  )
}

export default Header