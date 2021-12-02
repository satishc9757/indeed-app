import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Link from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../../components/user/NavBar'
import axios from 'axios';
import backendServer from '../../webConfig';



class uploadResume extends Component {
    constructor(props){
        super(props);
        this.state={
            theme:createTheme(),
            isLoggedIn: false,
            // jobSeekerId: 4 /* For now hard Coded to make the code run*/
        }
    }

    singleFileChangedHandler = async(e)=>{
        console.log("calling");
        await this.setState({
            selectedFile: e.target.files[0]
        });
        console.log(this.state);
        const form_data = new FormData();// If file selected
        if ( this.state.selectedFile ) 
        {
            console.log("reaching here", this.state.selectedFile, this.state.selectedFile.name);
            form_data.append('profileImage', this.state.selectedFile, this.state.selectedFile.name);
            console.log(form_data.get('profileImage') )

            await axios.post(`${backendServer}/jobseeker/resume/${sessionStorage.getItem('user-id')}`, form_data, {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
                }
            })
            .then( ( response ) => {
                if ( 200 === response.status ) {
                    // If file size is larger than expected.
                    if( response.data.error ) {
                    if ( 'LIMIT_FILE_SIZE' === response.data.error.code ) {
                    alert( 'Max size: 2MB');
                    } else {
                    console.log( response.data );// If not the given file type
                    alert( response.data.error);
                    }
                    } else {
                    // Success
                    console.log("here",response.data,response.data.location);
                    this.setState({
                        fileName:response.data.location,
                        imagename:response.data.image
                    })
                    alert( 'File Uploaded');
                    }
                }
            }).catch( ( error ) => {
            // If another error
            alert( error );
            });
        }

        else {
        // if file not selected throw error
        alert( 'Please upload file');
        }
    }

    render() {

        return (   
            <div>
                <Grid direction="row" container >
                    <NavBar/>
                    <ThemeProvider theme={this.state.theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            >
                                <Typography component="h1" variant="h5" style={{padding:"2%"}}>
                                    Add/Update Resume
                                </Typography><br /><br/>
                                <label htmlFor="btn-upload" >
                                    <input
                                        id="btn-upload"
                                        name="btn-upload"
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="application/*"
                                        onChange = {this.singleFileChangedHandler}
                                    />
                                    
                                    <Button
                                        className="btn-choose"
                                        variant="outlined"
                                        component="span"
                                        >
                                        Choose a File to Upload
                                    </Button>
                                </label>
                            </Box>
                        </Container>
                    </ThemeProvider>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(uploadResume)
