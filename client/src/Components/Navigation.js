import React from 'react'
import './Navigation.css'
import { useDispatch, useSelector } from 'react-redux'

// const elementsToSell = ['Accesorios', 'Bancos', 'Puff', 'Banquetas','Mesas', 'Mesas bajas', 
// 'Muebles de exterior', 'Sillas de cromo y cuero', 'Sillas de diseño', 'Sillas de oficina', 'Sillones de diseño', 'Almohadones',
// 'Muebles de exterior', 'Sillas de cromo y cuero', 'Sillas de diseño', 'Sillas de oficina', 'Sillones de diseño', 'Almohadones',
// 'Muebles de exterior', 'Sillas de cromo y cuero', 'Sillas de diseño', 'Sillas de oficina', 'Sillones de diseño', 'Almohadones']


function Navigation() {

  const elementsToSell = useSelector((state) => state.categories)
  const dispatch = useDispatch();
  // const elementsToSell = categoriesDB.map((item) => 
  // item.toLowerCase().charAt(0).toUpperCase() + item.slice(1));
  // console.log(elementsToSell)
  function handleFilter(e) {
    const name = document.getElementById(e.target.id).innerHTML;
    dispatch({payload: name, type: "FILTER_BY_CATEGORY"})
  }

  return (
    <div className='navigationWrapper'>
    <div className='navigationContainer'>
        
        {elementsToSell && elementsToSell.map((element, index) => (
            // <div key={index} className='btn btn-one'>
                <span key={index} className='hover-underline-animation' id={index} onClick={(e) => handleFilter(e)} >{element}</span>
            // {/* </div> */}
        ))}
    </div>
    </div>
  )
}

export default Navigation