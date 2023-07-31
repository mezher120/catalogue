import React from 'react'
import './Carrousel.css'
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


function Carrousel() {
  
  const imagesforSlider = [
    'https://cdn.pixabay.com/photo/2017/07/15/06/44/landscape-2505715_1280.jpg',
    'https://previews.123rf.com/images/suthiporn1/suthiporn11803/suthiporn1180300722/98124371-silla-verde-en-gardent-vista-frontal-desde-el-frente-paisaje-t%C3%A9cnico.jpg',
    'https://static.vecteezy.com/system/resources/previews/010/247/840/non_2x/wooden-chair-and-table-at-seaside-with-beautiful-turquoise-sea-landscape-under-the-blue-sky-photo.jpg'
  ]
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  return (
    <AutoPlaySwipeableViews interval={5000}>
      {imagesforSlider && imagesforSlider.map((image) => (
        <div id='s  lider'className='carouselContainer'>
          <img src={image} className='carrouselImage' alt='carousel images'/>
        </div>
      ))}
  </AutoPlaySwipeableViews>
  )
}

export default Carrousel