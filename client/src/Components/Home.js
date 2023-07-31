import React, { useState } from 'react'
import Card from './Card'
import './Home.css';
import { useSelector } from 'react-redux';
import { Pagination, Stack, Typography } from '@mui/material';

function Home() {

  const furnitures = useSelector((state) => state.furnitures)
  const [page, setPage] = useState(1);
  const countPages = Math.floor(furnitures.length / 18);
  const furnituresPerPage = furnitures.slice((page - 1)  * 18, page * 18);
  function handleChange(event, value) {
    setPage(value);
  }
  console.log(furnitures, 'home')

  return (
    <div className='homeContainer'>
      {furnituresPerPage && furnituresPerPage.map((furniture) => (
        <Card data={furniture}></Card>
        
      ))}
      <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={countPages} page={page} onChange={handleChange} />
    </Stack>
    </div>
  )
}

export default Home