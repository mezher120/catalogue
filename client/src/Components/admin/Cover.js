import { Box, Checkbox, FormControlLabel, TextField } from '@mui/material'
import React from 'react'
import './Cover.css'

function Cover() {
  return (
    <div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className='coverContainer'
    >
      <TextField id="outlined-basic" label="Title" variant="outlined" />
      <TextField id="outlined-basic" label="Name of Enterprise" variant="outlined" />
      <TextField id="outlined-basic" label="subtitle" variant="outlined" />
      <FormControlLabel required control={<Checkbox />} label="Instagram" />
      <TextField id="outlined-basic" label="@instagram" variant="outlined" />
      <FormControlLabel required control={<Checkbox />} label="Facebook" />
      <FormControlLabel required control={<Checkbox />} label="WhatsApp" />
      <TextField id="outlined-basic" label="WhatsApp Number" variant="outlined" />
      <br></br>
      <TextField id="outlined-basic" label="Footer" variant="outlined" />
    </Box>
    </div>
  )
}

export default Cover