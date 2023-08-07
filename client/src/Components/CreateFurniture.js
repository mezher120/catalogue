import React, { useState } from 'react'
import './CreateFurniture.css'
import { useSelector } from 'react-redux'

function CreateFurniture() {
  const [data, setData] = useState({})
  const categories = useSelector((state) => state.categories)

    function handleOnChange(e) {
      e.preventDefault();
      setData({...data, [e.target.name]: e.target.value })
    }

    function handleOnCheck(e) {
      setData({...data, [e.target.name]: e.target.checked })
    }

    function handleOnFile(e) {
      console.log(e.target.value)
    }

    function addNewFurniture() {
      
    }

  return (
    <div>
      <form>
        <label>Product Code</label>
        <input type='text' name='codigo' onChange={(e) => handleOnChange(e)} required></input>
        <label>Name</label>
        <input type='text' name='nombre' onChange={(e) => handleOnChange(e)} required></input>
        <label>Stock</label>
        <input type='number' name='stock' onChange={(e) => handleOnChange(e)} required></input>
        <label>Price</label>
        <input type='number' name='precio' onChange={(e) => handleOnChange(e)} required></input>
        <label>Discount</label>
        <input type='number' name='descuento' onChange={(e) => handleOnChange(e)} required></input>
        <label>Category</label>
        <select name='categoria' onChange={(e) => handleOnChange(e)}>
          <option value='sin categoria'>Select Category</option>
          {categories && categories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <label>New Category</label>
        {data.categoria === 'sin categoria' 
        ? <input type='text' name='categoria' onChange={(e) => handleOnChange(e)} required></input>
        : <input type='text' name='categoria' onChange={(e) => handleOnChange(e)} required disabled></input>}
        <input type='text' name='categoria' onChange={(e) => handleOnChange(e)} required></input>
        <label>Description</label>
        <input type='text' name='descripcion' onChange={(e) => handleOnChange(e)} required></input>
        <label>Units</label>
        <input type='number' name='unidades' onChange={(e) => handleOnChange(e)} required></input>
        <label>Image</label>
        <input type='file' name='file' onChange={(e) => handleOnFile(e)} required></input>
        <label>Outstanding</label>
        <input type='checkbox' name='destacado' onChange={(e) => handleOnCheck(e)} required></input>
        <label>New</label>
        <input type='checkbox' name='nuevo' onChange={(e) => handleOnCheck(e)} required></input>
      </form>
      <button onClick={addNewFurniture}>Add New Furniture</button>
    </div>
  )
}

export default CreateFurniture