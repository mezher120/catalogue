import React from 'react'
import './AdminNavigationLeft.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TocIcon from '@mui/icons-material/Toc';

function AdminNavigationLeft() {
    
        function goTo(e) {
            if (e.target.id === '1') {
                window.location.href = '/admin/uploadexcel'
            } else if (e.target.id === '2') {
                window.location.href = '/admin/createnew'
            } else {
                window.location.href = '/admin/'
            }
        }
        
  return (

    <div>
        <ul>
            <li id='1' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <CloudUploadIcon></CloudUploadIcon> Upload / Update / Delete </li>
            <li id='2' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <AddCircleIcon></AddCircleIcon> Create a new one </li> 
            <li id='3' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <TocIcon></TocIcon> Manage your DB </li>    
        </ul>
    </div>
  )
}

export default AdminNavigationLeft