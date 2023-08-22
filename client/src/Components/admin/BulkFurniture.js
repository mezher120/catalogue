import React, { useEffect, useState } from 'react'
import { read, utils } from 'xlsx'
import axios from 'axios'
import excelImage from '../../assets/excel-example.png'
import './BulkFurniture.css'
import BulkImage from './BulkImage'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import Swal from 'sweetalert2'

function BulkFurniture() {

    const [loading, setLoading] = useState(false);
    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rows, setRows] = useState([]);
    const [downloadImages, setDownloadImages] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          setLoading(true);
          const result = (await axios.get("http://localhost:3002/furniture"))
            .data;
          setRows(result);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error)
        }
      };

    const readUploadFile = (e) => {
        e.preventDefault();
        console.log(e.target.files[0])
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: "array"});
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);
                setExcelRows(json);
              };
            reader.readAsArrayBuffer(file);
            }
        }
    console.log(rows, 'rows')
    console.log(excelRows, 'exccelrows')
  
    const uploadData = async (e) => {
        e.preventDefault();
        if (excelRows) {
            try {
                const res = await axios.post('http://localhost:3002/bulk', {excelRows, downloadImages})
                // alert(res.data.message)
                Swal.fire({
                  title: 'Uploaded!',
                  text: res.data.message,
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                })
                document.getElementById('fileId').value = '';
                setExcelRows([])
            } catch (error) {
                console.log(error)
            }
        }
    };

    const updateData = async (e) => {
      e.preventDefault();
      if (excelRows) {
        try {
          setLoading(true);
          const res = await axios.put('http://localhost:3002/bulk', excelRows);
          // alert(res.data.message)
          Swal.fire({
            title: 'Updated!',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          setLoading(false);
          document.getElementById('fileId').value = '';
          setExcelRows([])
        } catch (error) {
          setLoading(false);
          console.log(error)
        }
      }
    }

    const deleteData = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.delete('http://localhost:3002/bulk');
        // alert(res.data.message);
        Swal.fire({
          title: 'Deleted!',
          text: res.data.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      } catch (error) {
        console.log(error)
      }
    }

    const takeImagesFromFirebase = async (e) => {
      e.preventDefault();
      const imageRef = ref(storage);
      let downloadUrls;
      let downloadNames;
      let downloadMix = [];
      const dataImage = listAll(imageRef)
      .then(async res => {
        console.log(res)
        const items = res.items;
        downloadUrls = await Promise.all (items.map((item) => getDownloadURL(item)))
        downloadNames = items.map((item) => item.name);
        console.log(downloadNames)
        console.log(downloadUrls)

        for (let i = 0; i < downloadNames.length; i++) {
            downloadMix[i] = {url: downloadUrls[i], nameUrl: downloadNames[i]}   
        }
        setDownloadImages(downloadMix);
        console.log(downloadImages)
      })
      .catch( error => console.log(error, 'error'));
      console.log(dataImage, 'dataiamge')
    } 

  return (
    <div className='bulkContainer'>
        <BulkImage></BulkImage>
        <form>
        <label>Insert your Excel</label>
        <input id='fileId' type='file' name='file' onChange={readUploadFile}></input>
        </form> 
        <div>
        <button onClick={uploadData}>Upload File</button>
        <button onClick={updateData}>Update data</button>
        <button onClick={deleteData}>Delete data</button>
        <button onClick={takeImagesFromFirebase}>New button for images</button>
        </div>
        {loading ? <progress className='adminProgessBar'></progress> : ""}
        <div>
        <span>Example of the excel file to import</span>
        <img src={excelImage} alt='excel example'></img>
        </div>
    </div>
  )
}

export default BulkFurniture