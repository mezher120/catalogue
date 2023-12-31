import React, { useState } from 'react'
import './CreateFurniture.css'
import { useSelector } from 'react-redux'
import { app, storage } from '../../firebase'
import { StringFormat, getDownloadURL, ref, uploadString } from 'firebase/storage';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import {url} from '../../App';

function CreateFurniture() {
  const [data, setData] = useState({})
  const [newCategory, setNewCategory] = useState('')
  const [validation, setValidation] = useState(false);
  const [newImage, setNewImage] = useState('');
  const categories = useSelector((state) => state.categories)
  console.log(data)

    function handleOnChange(e) {
      e.preventDefault();
    if (e.target.name === 'nombre' ) {
        setData({...data, [e.target.name]: e.target.value.toUpperCase()})
      } else {
        setData({...data, [e.target.name]: e.target.value })
      }
    }

    function handleChangeNewCategory(e) {
      e.preventDefault();
      setNewCategory(e.target.value.toUpperCase())
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
        setNewImage(readerEvent.target.result);
      }

    }
    
    async function addNewFurniture() {
      if(!data.categoria || !data.codigo || data.categoria.length === 0 || data.codigo.length === 0) {
        setValidation(true)
        return; 
      }
      console.log('hasta imagen')
      const newCode = data.codigo.split('/').join(''); // to delete / to store in firebase
      const imagesRef = ref(storage, newCode);  // ref to storage with the name of the file that will have
      if (newImage) {
        let downloadUrl = '';
        await uploadString(imagesRef, newImage, "data_url") // upload the file to the storage ref
        .then(async () => {
          downloadUrl = await getDownloadURL(imagesRef); // download the url of the imageRef 
          console.log(downloadUrl, 'getdownloadurl')
        })  
        let newData = {...data, imagen: downloadUrl}
        if (data.categoria === 'sin categoria') {
          newData = {...newData, categoria: newCategory}; 
        }
        console.log(newData, 'here');
        try {
          const addNewResult = await axios.post(`${url}/furniture`, newData)
          console.log(addNewResult.data);
          Swal.fire({
            title: 'Success!',
            text: addNewResult.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          const addNewResult = await axios.post('http://localhost:3002/furniture', data)
          console.log(addNewResult.data);
          Swal.fire({
            title: 'Success!',
            text: addNewResult.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          setData({});
        } catch (error) {
          console.log(error)
        }
      }
      

    }

  return (
    <div className='createFurnitureFormContainer'>
      <form className='createForm'>
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
        ? <input type='text' name='newCategory' onChange={(e) => handleChangeNewCategory(e)} required></input>
        : <input type='text' name='newCategory' onChange={(e) => handleChangeNewCategory(e)} required disabled></input>}
        <label>Description</label>
        <input type='text' name='descripcion' onChange={(e) => handleOnChange(e)} required></input>
        <label>Units</label>
        <input type='number' name='unidades' onChange={(e) => handleOnChange(e)} required></input>
        <label>Url</label>
        <input type='text' name='url' onChange={(e) => handleOnChange(e)} required></input>
        <label>Image</label>
        <input type='file' name='imagen' onChange={(e) => handleOnFile(e)} required></input>
        <div className='createCheckbox'>
        <label>Outstanding</label>
        <input type='checkbox' name='destacado' onChange={(e) => handleOnCheck(e)} required></input>
        </div>
        <div className='createCheckbox'>
        <label>New</label>
        <input type='checkbox' name='nuevo' onChange={(e) => handleOnCheck(e)} required></input>
        </div>
      </form>
      <button className='createButton' onClick={addNewFurniture}>Add New Furniture</button>
      {validation ? <Alert onClose={() => setValidation(false)}>Codigo y Categoria son campos obligatorios</Alert> : <div/>}
    </div>
  )
}

export default CreateFurniture