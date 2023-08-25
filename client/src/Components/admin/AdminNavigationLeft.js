import React from 'react'
import './AdminNavigationLeft.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TocIcon from '@mui/icons-material/Toc';
import AllOutIcon from '@mui/icons-material/AllOut';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

function AdminNavigationLeft() {
    
        function goTo(e) {
            if (e.target.id === '1') {
                window.location.href = '/admin/uploadexcel'
            } else if (e.target.id === '2') {
                window.location.href = '/admin/createnew'
            }  else if (e.target.id === '3') {
                window.location.href = '/admin/outstanding'
            } else if (e.target.id === '4') {
                window.location.href = '/admin/cover'
            } else {
                window.location.href = '/admin/'
            }
        }
        
  return (

    <div>
        <ul className='adminNavLeftListContainer'>
            <li id='1' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <CloudUploadIcon></CloudUploadIcon> Upload / Update / Delete </li>
            <li id='2' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <AddCircleIcon></AddCircleIcon> Create a new one </li>
            <li id='3' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <AllOutIcon></AllOutIcon> Outstandings </li>  
            <li id='4' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <TextSnippetIcon></TextSnippetIcon> Cover </li>  
            <li id='5' className='adminNavLeftListItems' onClick={(e) => goTo(e)}> <TocIcon></TocIcon> Manage your DB </li>    
        </ul>
    </div>
  )
}

export default AdminNavigationLeft