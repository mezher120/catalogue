import React, { useState } from 'react'
import './CreateFurniture.css'
import { useSelector } from 'react-redux'
import { app, storage } from '../../firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function CreateFurniture() {
  const [data, setData] = useState({})
  const [validation, setValidation] = useState(false);
  const categories = useSelector((state) => state.categories)
  console.log(data)

    function handleOnChange(e) {
      e.preventDefault();
      setData({...data, [e.target.name]: e.target.value })
    }

    function handleOnCheck(e) {
      setData({...data, [e.target.name]: e.target.checked })
    }

    function handleOnFile(e) {
      console.log(e.target.files[0])
      const reader = new FileReader(); // js method to read files
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
      console.log(reader)
      console.log(reader.onload)
      reader.onload = (readerEvent) => {  // to load after reading as data url
        setData({...data, [e.target.name]: readerEvent.target.result});
      }

    }
    
    async function addNewFurniture() {
      if(!data.categoria || !data.codigo || data.categoria.length || data.codigo.length) {
        setValidation(true)
        return; 
      }
      
      const imagesRef = ref(storage, data.codigo);  // ref to storage with the name of the file that will have
      if (data.image) {
        let downloadUrl = '';
        await uploadString(imagesRef, data.imagen, "data_url") // upload the file to the storage ref
        .then(async () => {
          downloadUrl = await getDownloadURL(imagesRef); // download the url of the imageRef 
        })
        const newData = {...data, imagen: downloadUrl}
        console.log(newData, 'here');
        const addNewResult = await axios.post('http://localhost:3002/furniture', newData)
        console.log(addNewResult);
      
      }

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
          <option value='sin categoria'>Add new category...</option>
        </select>
        <label>New Category</label>
        {data.categoria === 'sin categoria' 
        ? <input type='text' name='categoria' onChange={(e) => handleOnChange(e)} required></input>
        : <input type='text' name='categoria' onChange={(e) => handleOnChange(e)} required disabled></input>}
        <label>Description</label>
        <input type='text' name='descripcion' onChange={(e) => handleOnChange(e)} required></input>
        <label>Units</label>
        <input type='number' name='unidades' onChange={(e) => handleOnChange(e)} required></input>
        <label>Image</label>
        <input type='file' name='imagen' onChange={(e) => handleOnFile(e)} required></input>
        <label>Outstanding</label>
        <input type='checkbox' name='destacado' onChange={(e) => handleOnCheck(e)} required></input>
        <label>New</label>
        <input type='checkbox' name='nuevo' onChange={(e) => handleOnCheck(e)} required></input>
      </form>
      <button onClick={addNewFurniture}>Add New Furniture</button>
      {validation ? <Alert onClose={() => setValidation(false)}>Codigo y Categoria son campos obligatorios</Alert> : <div/>}
    </div>
  )
}

export default CreateFurniture