import React, { useRef, useState } from 'react'
import './Login.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from '@mui/material';

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            console.log(user);
            localStorage.setItem("user", user.user.email)
            window.location.href = '/admin'
        } catch (error) {
            console.log(error.message)
            if (error.message.includes('email')) {
                setErrorEmail(true)
            } else {
                setErrorPassword(true)
            }
        }
    }


  return (
    <div className='loginContainer'>
    <h1>Login</h1>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      className='loginInputs'
    >
    <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}></TextField>     
    <TextField id="outlined-basic" label="Password" variant="outlined" type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
    </Box>
    <Button variant="contained" onClick={(e) => handleSubmit(e)}>Login</Button>
    {errorEmail && <Alert onClose={() => setErrorEmail(!errorEmail)}>Email incorrect — check it out!</Alert>}
    {errorPassword && <Alert onClose={() => setErrorPassword(!errorPassword)}>Password incorrect — check it out!</Alert>}
    </div>
  )
}

export default Login