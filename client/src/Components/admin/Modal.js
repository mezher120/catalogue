import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Modal.css';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { storage } from '../../firebase';

function Modal({id, open}) {

  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [newCategory, setNewCategory] = useState('');
  const [newImage, setNewImage] = useState('');
  const categories = useSelector((state) => state.categories)
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
    console.log(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setNewImage(readerEvent.target.result);
    }
  }

  function handleOnNewCategory(e) {
    e.preventDefault();
    setNewCategory(e.target.value.toUpperCase());
  }

  async function updateFurniture() {
    let newData = {...data};
    if (newImage) {
      const newCode = data.codigo.split('/').join('');
      const imageRef = ref(storage, newCode);
      let downloadUrl = '';
      await uploadString(imageRef, newImage, 'data_url')
      .then(async () => {
        downloadUrl = await getDownloadURL(imageRef);
        newData = {...newData, imagen: downloadUrl}
      })
    }
    if (data.categoria === 'sin categoria') {
      newData = {...newData, categoria: newCategory};
    }
    console.log(newData, 'antes de updatear')
    try {
      console.log(newData)
      const res = await axios.put('http://localhost:3002/furniture/update', {id: id, data: newData});
      console.log(res.data)
      open(false)
      dispatch({payload: {id, newData}, type: 'UPDATE_ONE'})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className='createFurnitureFormContainer modalContainerUpdate'>
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
        {data.categoria !== 'sin categoria' 
        ?
          <label>Category</label>
          :
          <label>New Category</label>
        }
        {data.categoria !== 'sin categoria' ?
        <input type='text' name='category' value={data?.categoria} onChange={(e) => handleOnChange(e)} required></input>
        :
        <input type='text' name='newCategory' value={newCategory} onChange={(e) => handleOnNewCategory(e)} required></input>
        }
        <label>Change Category</label>
        <select name='categoria' onChange={(e) => handleOnChange(e)}>
          <option value='sin categoria'>Select Category</option>
          {categories && categories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
          <option value='sin categoria' onChange={(e) => handleOnNewCategory(e)}>Add new category...</option>
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