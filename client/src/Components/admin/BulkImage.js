import { ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { storage } from '../../firebase';
import './BulkImage.css'
import Swal from 'sweetalert2';

function BulkImage() {

    const [imagesToUpload, setImagesToUpload] = useState([]);
    
    // uploading images directly with name file
    async function handleOnChangeFile(e) {  
        console.log(e.target.files)
        const promises = [];
        for (let i=0; i < e.target.files.length; i++) {
            let fileName = '';
            if (e.target.files[i].name.includes('/')) {
                fileName = e.target.files[i].name.split('/').join('');
            } else {
                fileName = e.target.files[i].name;
            }
            console.log(fileName)
            const imagerRef = ref(storage, fileName);
            promises.push(uploadBytes(imagerRef, e.target.files[i]))

        }

        console.log(promises)
        setImagesToUpload(promises);
    }

    async function uploadFileToStorage() {
        try {
            const images = await Promise.all(imagesToUpload)
            Swal.fire({
                title: 'Imagenes Cargadas!',
                text: '...',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })
            console.log(images, 'subido');
        } catch (error) {
            console.log(error)
        }
    }


    // // uploading after writing name codes without needing name file

    // const [imagesToUpload, setImagesToUpload] = useState([]);
    // console.log(imagesToUpload)

    // function handleOnChangeFile(e) {
    //     e.preventDefault(e);
    //     const images = [];
        
    //     let reader; 
    //     for (let i = 0; i < e.target.files.length; i++) {
    //         reader = new FileReader();
    //         reader.readAsDataURL(e.target.files[i]);
    //         reader.onload = (readerEvent) => {  // to load after reading as data url
    //             images[i] = readerEvent.target.result;
    //           }
    //     }
    //     setImagesToUpload(prev => images);
    //     console.log(images, 'here')
    // }

  return (
    <div className='bulkImageContainer'>
        <input type='file' name='fileImages' multiple='multiple' onChange={(e) => handleOnChangeFile(e)}></input>
        {imagesToUpload && <span>Total Images: {imagesToUpload.length}</span>}
        {/* <div className='bulkImageProduct'>
        {imagesToUpload && imagesToUpload.map((item, index) => (
                <img key={index} height='50px' src={item} alt={item}></img>
        ))}
        </div> */}
        <button onClick={() => uploadFileToStorage()}>Upload Images</button>
    </div>
  )
}

export default BulkImage