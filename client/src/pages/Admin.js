import React, { useEffect, useState } from 'react'
import { read, utils } from 'xlsx'
import axios from 'axios'

function Admin() {

    const [loading, setLoading] = useState(false);
    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [rows, setRows] = useState([]);

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
                const res = await axios.post('http://localhost:3002/bulk', excelRows)
                alert(res.data.message)
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
          alert(res.data.message)
          setLoading(false);
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
        alert(res.data.message);
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div>
        <form>
            <label>Insert your Excel</label>
            <input type='file' name='file' onChange={readUploadFile}></input>
        </form>
        <button onClick={uploadData}>Upload File</button>
        <button onClick={updateData}>Update data</button>
        <button onClick={deleteData}>Delete data</button>
        {loading ? <progress className='adminProgessBar'></progress> : ""}
    </div>
  )
}

export default Admin