import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';

function Modal({id, open}) {

  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const categories = ['hola', 'chau']
  useEffect(() => {
    try {
      async function fetchData() {
        const res = await axios.get(`http://localhost:3002/furniture/getone?id=${id}`)
        console.log(res.data)
        setData(res.data)     
      }
    fetchData();       
    } catch (error) {
      console.log(error)
    }
  }, [id])

  function handleOnChange(e) {
    setData({...data, [e.target.name]: e.target.value});
    console.log(data)
  }

  function handleOnCheck(e) {
    setData({...data, [e.target.name]: e.target.checked})
    console.log(data)
  }

  function handleOnFile(e) {
    console.log('file')
  }

  async function updateFurniture() {
    try {
      const res = await axios.put('http://localhost:3002/furniture/update', {id: id, data: data});
      console.log(res.data)
      open(false)
      dispatch({payload: {id, data}, type: 'UPDATE_ONE'})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='createFurnitureFormContainer modalContainer'>
        <div className='modalTitle'>
        <h1>Update your product - {id}</h1>
        <CloseIcon className='modalClose' onClick={() => open(false)}></CloseIcon>
        </div>
      <form className='createForm'>
        <label>Product Code</label>
        <input type='text' name='codigo' value={data?.codigo} onChange={(e) => handleOnChange(e)} required></input>
        <label>Name</label>
        <input type='text' name='nombre' value={data?.nombre} onChange={(e) => handleOnChange(e)} required></input>
        <label>Stock</label>
        <input type='number' name='stock' value={data?.stock} onChange={(e) => handleOnChange(e)} required></input>
        <label>Price</label>
        <input type='number' name='precio' value={data?.precio}  onChange={(e) => handleOnChange(e)} required></input>
        <label>Discount</label>
        <input type='number' name='descuento' value={data?.descuento} onChange={(e) => handleOnChange(e)} required></input>
        <label>Category</label>
        <input type='text' name='category' value={data?.categoria} onChange={(e) => handleOnChange(e)} required></input>
        <label>Change Category</label>
        <select name='categoria' onChange={(e) => handleOnChange(e)}>
          <option value='sin categoria'>Select Category</option>
          {categories && categories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
          <option value='sin categoria'>Add new category...</option>
        </select>
        <label>Description</label>
        <input type='text' name='descripcion' value={data?.descripcion} onChange={(e) => handleOnChange(e)} required></input>
        <label>Units</label>
        <input type='number' name='unidades' value={data?.unidades} onChange={(e) => handleOnChange(e)} required></input>
        <label>Url</label>
        <input type='text' name='url' value={data?.url} onChange={(e) => handleOnChange(e)} required></input>
        <label>Change Image</label>
        <input type='file' name='imagen' onChange={(e) => handleOnFile(e)} required></input>
        <label>Outstanding</label>
        <input type='checkbox' name='destacado' value={data?.destacado} onChange={(e) => handleOnCheck(e)} required></input>
        <label>New</label>
        <input type='checkbox' name='nuevo' value={data?.nuevo} onChange={(e) => handleOnCheck(e)} required></input>
      </form>
      <button className='createButton' onClick={updateFurniture}>Update Furniture</button>
      <button className='createButton' onClick={() => open(false)}>Cancel</button>
    </div>
  </div>
  )
}

export default Modal