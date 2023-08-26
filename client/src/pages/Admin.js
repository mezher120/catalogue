import React, { useEffect, useState } from 'react'
import { read, utils } from 'xlsx'
import axios from 'axios'
import excelImage from '../assets/excel-example.png'
import CreateFurniture from '../Components/admin/CreateFurniture';
import BulkFurniture from '../Components/admin/BulkFurniture';
import './Admin.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Components/admin/Modal';
import ModalDelete from '../Components/admin/ModalDelete';
import { Autocomplete, Pagination, Stack, TextField, Typography } from '@mui/material';

const headers = ['codigo', 'nombre', 'categoria', 'descripcion', 'precio', 'stock', 'unidades', 'descuento', 'url', 'nuevo', 'destacado', 'habilitado']
// const body = [{codigo: '123456', nombre: 'silla tolix', categoria: 'SILLA', descripcion: '100x500', precio: 123456, stock: 5, unidades: 3, descuento: 50, nuevo: 'true', destacado: 'false', imagen: 'https://firebasestorage.googleapis.com/v0/b/incanto-pili.appspot.com/o/A-821B.jpg?alt=media&token=e3f96045-b704-4260-aab1-4f579f8d4ef1', habilitado: 'si'},
// {codigo: '123456', nombre: 'silla tolix', categoria: 'SILLA', descripcion: '100x500', precio: 123456, stock: 5, unidades: 3, descuento: 50, nuevo: 'true', destacado: 'false', imagen: 'https://firebasestorage.googleapis.com/v0/b/incanto-pili.appspot.com/o/A-821B.jpg?alt=media&token=e3f96045-b704-4260-aab1-4f579f8d4ef1', habilitado: 'no'}]

function Admin() {
  
  const user = localStorage.getItem("user")  

  if (!user) {
    window.location.href = '/login'
  }
  const dataState = useSelector((state) => state.furnitures)
  const names = dataState.map(item => item.nombre);
  const [body, setBody] = useState([]);

  console.log(dataState)
  console.log(body)
  useEffect(() => {
    setBody(dataState)
  }, [dataState]);

    // const headers = useSelector((state) => state.keys)
    const [formActions, setformActions] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [id, setId] = useState('')
    const [page, setPage] = useState(1);
    const countPages = Math.ceil(dataState.length / 10);
    let furnituresPerPage = body.slice((page - 1)  * 10, page * 10);

    
    function handleChange(event, value) {
      setPage(value);
    }

    function handleOnClickForm(e) {
      setformActions(!formActions);
    }

    function handleDeleteActionButton(e, item) {
      console.log(e.target.id, 'buttonDelete')
      console.log(item, 'hola')
      setId(e.target.id);
      setOpenModalDelete(!openModalDelete);
    }

    function handleUpdateActionButton(e, item) {
      console.log(e.target.id, 'here')
      console.log(item, 'here1')
      setId(e.target.id);
      setOpenModal(!openModal)
    }

    function handleFilterByName(e) {
      e.preventDefault();
      if (e.target.value.length > 2) {
        let nameInUppercase = e.target.value.toUpperCase();
        const filterByName = dataState.filter((item) => item.nombre.includes(nameInUppercase))
        setBody(filterByName)
      } else {
        setBody(dataState)
      }
    }

    return (
    
    <div className='admin-table-container'>
      <div className='adminAutocomplete'>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={names}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Filtrar por nombre"
      onChange={(e) => handleFilterByName(e)} />}
      />
      </div>
        <table className="admin-styled-table">
          <thead>
          <tr>
            {formActions && <td>Actions</td>}
            <th>#</th>
            {headers && headers.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {furnituresPerPage && furnituresPerPage.map((item, index) => (
              <tr key={index} onClick={() => handleOnClickForm()} className='adminDataTable'>
                {formActions && <td>
                  <button id={item.codigo} onClick={(e) => handleDeleteActionButton(e)} className='adminButtonAction'>X</button>
                  <button id={item.codigo} onClick={(e) => handleUpdateActionButton(e)} className='adminButtonActionEdit'>Edit</button>
                  </td>}
                <td><img src={item.imagen} alt='not found' height={50}></img></td>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.categoria}</td>
                <td>{item.descripcion}</td>
                <td>{item.precio}</td>
                <td>{item.stock}</td>
                <td>{item.unidades}</td>
                <td>{item.descuento}</td>
                <td>{item.url}</td>     
                <td>{item.nuevo}</td>
                <td>{item.destacado}</td>
                <td>{item.habilitado ? 'ON' : 'OFF'}</td>
              </tr>      
            ))} 
          </tbody>
        </table>
        {openModal && <Modal id={id} open={setOpenModal} ></Modal>}
        {openModalDelete && <ModalDelete id={id} open={setOpenModalDelete} body={body} setBody={setBody} ></ModalDelete>}
        <Stack spacing={2}>
        <Typography className='homePageNumber'>Page: {page}</Typography>
        <Pagination count={countPages} page={page} onChange={handleChange} />
        </Stack>
    </div>
  )
}

export default Admin