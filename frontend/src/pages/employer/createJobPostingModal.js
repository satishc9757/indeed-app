import { Button, Dialog } from '@mui/material';
import React, { Component } from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "../../components/user/NavBar";
import { InputLabel, MenuItem, Select } from '@mui/material';
import backendServer from '../../webConfig';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default class CreateJobPostingsModal extends Component {
    state = {
        openModal: false,
        job_work_type : "Remote",
        job_type : "Full-time",
    }


    handleClickOpen = () => {
        this.setState({openModal: true});
    };

    // handleChange = (newValue) => {
    //     this.setState(newValue);
    // };

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log("state data "+JSON.stringify(this.state));
        await this.props.handleSubmit(this.state);
        this.handleClose();
    }

    handleClose = () => {
        this.setState({openModal: false});
      };

    onFieldChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <div>
            <Button variant="contained" onClick={this.handleClickOpen}>
                Add Job posting
            </Button>

            <Dialog open={this.state.openModal} onClose={this.handleClose}>
                <DialogTitle style={{textAlign:"center"}}>New Job Posting</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                {/* {inputFieldValues.map(this.renderFormInputElements)} */}
                                <Grid item xs={12}>
                                    <TextField
                                    autoComplete="given-name"
                                    name="job_title"
                                    required
                                    fullWidth
                                    id="job_title"
                                    label="Job Title"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField

                                    name="job_industry"
                                    required
                                    fullWidth
                                    id="job_industry"
                                    label="Industry"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField

                                    name="job_city"
                                    required
                                    fullWidth
                                    id="job_city"
                                    label="City"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    name="job_state"
                                    required
                                    fullWidth
                                    id="job_state"
                                    label="State"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    autoComplete="given-name"
                                    name="job_zipcode"
                                    type="number"
                                    required
                                    fullWidth
                                    id="job_zipcode"
                                    label="Zipcode"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField

                                    name="job_country"
                                    required
                                    fullWidth
                                    id="job_country"
                                    label="Country"
                                    onChange={this.onFieldChange}
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <InputLabel id="demo-work-type-select-label">Age</InputLabel> */}
                                    <Select
                                        labelId="demo-work-type-select-label"
                                        id="job_work_type"
                                        name="job_work_type"
                                        value={this.state.job_work_type}
                                        label="Work Type"
                                        onChange={this.onFieldChange}
                                    >
                                        <MenuItem value={"Remote"} selected>Remote</MenuItem>
                                        <MenuItem value={"In-person"}>In-person</MenuItem>

                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                                    <Select
                                        id="job_type"
                                        name="job_type"
                                        value={this.state.job_type}
                                        label="Type"
                                        onChange={this.onFieldChange}
                                    >
                                        <MenuItem value={"Part-time"}>Part-time</MenuItem>
                                        <MenuItem value={"Full-time"}>Full-time</MenuItem>

                                    </Select>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    name="job_what_you_do"
                                    required
                                    multiline
                                    rows={2}
                                    rowsMax={4}
                                    fullWidth
                                    onChange={this.onFieldChange}
                                    id="job_what_you_do"
                                    label="Responsibilities"
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    name="job_what_you_love"
                                    required
                                    multiline
                                    rows={2}
                                    rowsMax={4}
                                    fullWidth
                                    onChange={this.onFieldChange}
                                    id="job_what_you_love"
                                    label="What job seeker would love"
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                    name="job_what_you_need"
                                    required
                                    multiline
                                    rows={2}
                                    rowsMax={4}
                                    fullWidth
                                    onChange={this.onFieldChange}
                                    id="job_what_you_need"
                                    label="Qualifications"
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    name="job_salary_details"
                                    required
                                    fullWidth
                                    onChange={this.onFieldChange}
                                    id="job_salary_details"
                                    label="Salary details"
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    name="job_compensation"
                                    required
                                    fullWidth
                                    onChange={this.onFieldChange}
                                    id="job_compensation"
                                    label="Compensation"
                                    //errorText={this.state.inputErrors[inputField.name]}
                                    // helperText="error"
                                    autoFocus
                                    />
                                </Grid>
                            </Grid>
                            {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Create
                            </Button> */}
                            <Grid container justifyContent="flex-end">
                            {/* <Grid item>
                                <Link href="#" variant="body2">
                                Already have an account? Sign in
                                </Link>
                            </Grid> */}
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit}>Post Job</Button>
                    </DialogActions>
            </Dialog>
            </div>
        );
    }
}