import { Component } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button, Dialog, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../../components/user/NavBar'
import axios from 'axios';
import backendServer from '../../webConfig';
import Grid from '@material-ui/core/Grid'
import Container from '@mui/material/Container';

export default class UploadCoverLetter extends Component {

    state = {

    }

    singleFileChangedHandler = async(e)=> {
        console.log("calling");
        await this.setState({
            selectedFile: e.target.files[0]
        });
        console.log("selected file "+ this.state.selectedFile);
        const form_data = new FormData();// If file selected
        if ( this.state.selectedFile )
        {
            console.log("reaching here", this.state.selectedFile, this.state.selectedFile.name);
            form_data.append('profileImage', this.state.selectedFile, this.state.selectedFile.name);
            console.log(form_data.get('profileImage') )

            await axios.post(`${backendServer}/jobseeker/coverletter`, form_data, {
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
                    console.log("response daata : ",response.data);
                    // this.setState({
                    //     fileName:response.data.location,
                    //     imagename:response.data.image
                    // })
                    // alert( 'File Uploaded');
                    const coverLetterLocation = response.data;
                    this.props.createApplication(coverLetterLocation);
                    this.props.closeCoverLetterModal();
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
        return(<Dialog open={this.props.openCoverLetterModal} onClose={() => this.props.closeCoverLetterModal()}>
            {/* <DialogTitle style={{textAlign:"center"}}>New Job Posting</DialogTitle> */}
            <DialogContent>
            <Grid direction="row" container >

                    <Container>

                        <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                            <Typography component="h1" variant="h5" style={{padding:"2%"}}>
                                Add Cover Letter
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
            </Grid>
            </DialogContent>
            <DialogActions>
                    <Button onClick={() => this.props.closeCoverLetterModal()}>Cancel</Button>
            </DialogActions>
            </Dialog>);
    }
}