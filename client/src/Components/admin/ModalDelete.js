import React from 'react'
import './ModalDelete.css'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {url} from '../../App.js';

function ModalDelete({id, open, body, setBody}) {

    const dispatch = useDispatch();

    async function handleDeleteFurniture() {
        try {
            const furnitureDeleted = await axios.delete(`${url}/furniture/delete?id=${id}`);
            console.log(furnitureDeleted.data);
            open(false);
            dispatch({data: id, type: 'DELETE_ONE'})
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
      <div className='createFurnitureFormContainer modalContainer'>
        <div className='modalTitle'>
        <h1>Delete this product - {id}</h1>
        <CloseIcon className='modalClose' onClick={() => open(false)}></CloseIcon>
        </div>
        <button onClick={() => handleDeleteFurniture()} >Delete</button>
        </div>
    </div>
  )
}

export default ModalDelete