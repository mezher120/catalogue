import React, { useEffect, useState } from 'react'
import { read, utils } from 'xlsx'
import axios from 'axios'
import excelImage from '../assets/excel-example.png'
import CreateFurniture from '../Components/admin/CreateFurniture';
import BulkFurniture from '../Components/admin/BulkFurniture';
import './Admin.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

const headers = ['codigo', 'nombre', 'categoria', 'descripcion', 'precio', 'stock', 'unidades', 'descuento', 'nuevo', 'destacado', 'habilitado']
const body = [{codigo: '123456', nombre: 'silla tolix', categoria: 'SILLA', descripcion: '100x500', precio: 123456, stock: 5, unidades: 3, descuento: 50, nuevo: 'true', destacado: 'false', imagen: 'https://firebasestorage.googleapis.com/v0/b/incanto-pili.appspot.com/o/A-821B.jpg?alt=media&token=e3f96045-b704-4260-aab1-4f579f8d4ef1', habilitado: 'si'},
{codigo: '123456', nombre: 'silla tolix', categoria: 'SILLA', descripcion: '100x500', precio: 123456, stock: 5, unidades: 3, descuento: 50, nuevo: 'true', destacado: 'false', imagen: 'https://firebasestorage.googleapis.com/v0/b/incanto-pili.appspot.com/o/A-821B.jpg?alt=media&token=e3f96045-b704-4260-aab1-4f579f8d4ef1', habilitado: 'no'}]

function Admin() {

    const [formActions, setformActions] = useState(false)

    function handleOnClickForm(e) {
      e.preventDefault();
      setformActions(!formActions);
    }

    function handleDeleteActionButton(e, item) {
      console.log(e.target.id, 'hancle')
      console.log(item, 'hola')
    }

    return (
    <div className='admin-table-container'>
        <table className="admin-styled-table">
          <thead>
          <tr>
            {formActions && <td>Actions</td>}
            <th>#</th>
            {headers && headers.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {body && body.map((item, index) => (
              <tr key={index} id={item.codigo} onClick={(e) => handleOnClickForm(e)}>
                {formActions && <td>
                  <DeleteForeverIcon id={item.codigo} onClick={(e) => handleDeleteActionButton(e)} className='adminButtonAction'></DeleteForeverIcon>
                  <FormatAlignJustifyIcon className='adminButtonActionEdit'></FormatAlignJustifyIcon>
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
                <td>{item.nuevo}</td>
                <td>{item.destacado}</td>
                <td>{item.habilitado}</td>
              </tr>      
            ))} 
          </tbody>
        </table>

    </div>
  )
}

export default Admin