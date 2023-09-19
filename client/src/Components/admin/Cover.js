import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import './Cover.css'
import Swal from 'sweetalert2'

function Cover() {

  const [data, setData] = useState({});
  const dispatch = useDispatch();


  function handleOnChange(e) {
    console.log(e.target.name)
    setData({...data, [e.target.name]: e.target.value})
  }

  function handleOnChecked(e) {
    setData({...data, [e.target.name]: e.target.checked})
  }

  async function modifyCovers() {
    try {
      console.log(data)
      const res = await axios.post('http://localhost:3002/covers', data);
      console.log(res.data)
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      // dispatch({type: 'MODIFY_COVERS', payload: data})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='coverWrapper'>
      <h3>Modify Company Data</h3>
      <div className='coverTitleMediasContainer'>
      <div>
      <div className='coverTitlesMedias'>
      <TextField id="outlined-basic" label="Title" name='title' variant="outlined" onChange={(e) => handleOnChange(e)} />
      <TextField id="outlined-basic" label="Name of Enterprise" name='enterprise' variant="outlined" onChange={(e) => handleOnChange(e)} />
      <TextField id="outlined-basic" label="subtitle" variant="outlined" name='subtitle' onChange={(e) => handleOnChange(e)} />
      </div>
      <div className='coverMediasContainer'>
      <div className='coverMediasIndividuals'>
      <FormControlLabel required control={<Checkbox />} label="Instagram" name='instagram' onChange={(e) => handleOnChecked(e)} />
      <TextField id="outlined-basic" label="@instagram" variant="outlined" name='instagramUrl' onChange={(e) => handleOnChange(e)} />
      </div>
      <div className='coverMediasIndividuals'>
      <FormControlLabel required control={<Checkbox />} label="Facebook" name='facebook' onChange={(e) => handleOnChecked(e)} />
      <TextField id="outlined-basic" label="facebook url" variant="outlined" name='facebookUrl' onChange={(e) => handleOnChange(e)} />
      </div>
      <div className='coverMediasIndividuals'>
      <FormControlLabel required control={<Checkbox />} label="WhatsApp" name='whatsApp' onChange={(e) => handleOnChecked(e)} />
      <TextField id="outlined-basic" label="WhatsApp Number" variant="outlined" name='whatsAppUrl' onChange={(e) => handleOnChange(e)} />
      </div>
      </div>
      </div>
      <br></br>
      <div>
      <TextField id="outlined-basic" label="Footer" name='footer' variant="outlined" onChange={(e) => handleOnChange(e)}  />
      </div>
      <button className='coverBtn' onClick={() => modifyCovers()}>Send</button>
      </div>
    </div>
  )
}

export default Cover