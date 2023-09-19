import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Home.css';
import { useSelector } from 'react-redux';
import { Pagination, Stack, Typography } from '@mui/material';

function Home({category}) {

  const furnitures = useSelector((state) => state.filtered)
  const [page, setPage] = useState(1);
  const countPages = Math.floor(furnitures.length / 36);
  const furnituresPerPage = furnitures.slice((page - 1)  * 36, page * 36);
  function handleChange(event, value) {
    setPage(value);
  }
  console.log(furnitures, 'home')

  useEffect(() => {
    setPage(1);
  }, [furnitures]);

  return (
    <div>
    <div className='homeTitleContainer'>
      <span className='homeTitle'>{category.toUpperCase()}</span>
    </div>
    <div className='homeContainer'>
      {furnituresPerPage && furnituresPerPage.map((furniture) => (
        <Card key={furniture._id} data={furniture}></Card>
        
      ))}
    </div>
      <div className='homePagination'>
      <Stack spacing={2}>
      <Typography className='homePageNumber'>Page: {page}</Typography>
      <Pagination count={countPages} page={page} onChange={handleChange} />
      </Stack>
      </div>
    </div>
  )
}

export default Home