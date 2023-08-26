import React, { useState } from 'react'
import './Theme.css'
import axios from 'axios'
import Swal from 'sweetalert2';

function Theme() {

    const [color, setColor] = useState()

    async function primaryColor(e) {
        const data = {name: e.target.id};
        console.log(typeof data)
        try {
            const res = await axios.post('http://localhost:3002/colors', data);
            console.log(res);
            Swal.fire({
                title: 'Color Changed!',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div className='themeContainer'>
        <h3>Custom your Colors</h3>
        <h5>Primary Color</h5>
        <div className='themeColors'>
            <div id='gray' className='themeColor gray' onClick={(e) => primaryColor(e)}></div>
            <div id='black' className='themeColor black' onClick={(e) => primaryColor(e)}></div>
            <div id='brown' className='themeColor brown' onClick={(e) => primaryColor(e)}></div>
        </div>
    </div>
  )
}

export default Theme