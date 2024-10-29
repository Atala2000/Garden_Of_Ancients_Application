import React, {useState} from "react";
import '../assets/css/ExcelPage.css';

export const ExcelPage = () => {
    const [file,setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!file){
            alert("Please select a file!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch('http://localhost:5500/api/uploadExcel', {
            method : 'POST',
            body : formData,
            credentials : 'include'
        });
        if(!response.ok){
            console.log("File upload failed!");
        } 
    }

    const handleDownload = async () => {
        const response = await fetch('https://api.gardenofancients.com/api/downloadExcel', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } else {
            console.log("File download failed!");
        }
    };

    return(
        <div className="excel-page">
            <div className="excel-title">
             <h1 className="excel-heading">Garden of Ancients</h1>
                <h2 className="sub-excel">Excel Page</h2>
                </div>
            <div className="excel-content">
                <div className="form-div">
        <form className="excel-form" onSubmit={handleSubmit}>
            <input type="file" accept=".xlsx" onChange={handleFileChange}/>
            <button type="submit">UPLOAD FILE</button>
        </form>
        </div>
        <button className="excel-dload" onClick={handleDownload}>DOWNLOAD FILE</button>
        </div>
        </div>
    )
}