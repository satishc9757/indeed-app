import React, { Component, useState } from 'react';
import axios from 'axios';
import backendServer from "../../webConfig";


export default function ImageUpload(props) {
    const ID = sessionStorage.getItem('emp_company_id');
    // const ID = 2 gittt
    const handleClose = props.handleClose
    console.log(ID)
    const [selectedFile, setSelectedFile] = useState(null)

 const singleFileChangedHandler = ( event ) => {
        setSelectedFile( event.target.files[0]);
    }

   


    const singleFileUploadHandler = () => {
        console.log('inside image function')
        const data = new FormData();// If file selected
        if ( {selectedFile} ) 
            {
                
                data.append( 'profileImage', selectedFile, selectedFile.name );
                
            axios.post( `${backendServer}/company/profile?compId=${ID}`, data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
        
        .then( ( response ) => 
        {console.log(response)
            if (200 === response.status) {
                // If file size is larger than expected.
                if( response.data.error ) {
                    if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                        console.log( 'File is too large.' );
                    } else {
                    console.log( response.data );// If not the given file type
                        console.log('File type not allowed')
                    }
                } else {
                // Success
                    
                    let fileName = response.data;
                    
                    console.log( 'fileName', fileName );
                    handleClose();
                    return (fileName)
                    
                }
            }
        }).catch( ( error ) => {
        // If another error
            console.log(error)
        });
        } else {
        // if file not selected throw error
            console.log('Please upload a file')
        }};


   return(
     <div className="container">
      {/* For Alert box*/}
      <div id="oc-alert-container"></div>{/* Single File Upload*/}
       <div className="card-body">
        <input type="file"  onChange={singleFileChangedHandler}/>
        <div className="mt-5">
         <button className="btn btn-info" onClick={singleFileUploadHandler}>Upload!</button>
        </div>
       </div>
      </div>
     
    
   );
};  
