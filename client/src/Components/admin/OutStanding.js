import React, { useState } from 'react'
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import axios from 'axios';

const promises = [];

function OutStanding() {

  const [outstandings, setOutStadings] = useState([0, 1, 2])
  const [imagesToUpload, setImagesToUpload] = useState([]);

  function addOneMore(){
    setOutStadings((prevState) => ([...prevState, outstandings.length]))
  }

  function handleOnFileSelected(e) {
    const index = e.target.id;
    const nameFile = 'outstanding'+index;
    const imagerRef = ref(storage, nameFile);
    promises[index] = (uploadBytes(imagerRef, e.target.files[0]));
    setImagesToUpload(promises)
    console.log(imagesToUpload)
    console.log(promises)
  }

  async function uploadOutStandings(params) {
    try {
      const images = await Promise.all(imagesToUpload)
      Swal.fire({
          title: 'Imagenes Cargadas!',
          text: '...',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      console.log(images, 'subido');
      const dataUrl = []
      for (let i = 0; i < imagesToUpload.length; i++) {
        const imagesRef = ref(storage, 'outstanding'+i)
        let downloadUrl = await getDownloadURL(imagesRef);    
        dataUrl[i] = {src: downloadUrl};  
      }
      const res = await axios.post('http://localhost:3002/outstandings', dataUrl);
      console.log(res);      
  } catch (error) {
      console.log(error)
  }
  }

  return (
    <div>
      <div>
        <h3>Imagenes de Marquesina</h3>
      </div>
      <form>
        {outstandings && outstandings.map((item, index) => (
            <div key={index}>
            <label>{index + 1}° Image: </label>
            <input type='file' id={index} onChange={(e) => handleOnFileSelected(e)}></input>
            </div>
        ))}
      </form>
      <button onClick={() => addOneMore()}>More Images...</button>
      <button onClick={() => uploadOutStandings()}>Upload OutStandings</button>
    </div>
  )
}

export default OutStanding