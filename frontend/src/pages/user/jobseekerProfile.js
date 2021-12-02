import {  Button, Card, CardContent, Container, Grid, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import backendServer from "../../webConfig";
import NavBar from "../../components/user/NavBar";
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { ListItemButton, ListItemText, Stack } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import JobCard from "./jobCard";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailModal from "./emailModal";
import { blue } from "@material-ui/core/colors";
const axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
};

export default function Jobseeker() {
    const navigate = useNavigate();
    const userType =""
        // sessionStorage.getItem("user_type")

    const [resumeOpen, setResumeOpen] = React.useState(false);
    const handleResumeOpen = () => setResumeOpen(true);
    const handleResumeClose = () => setResumeOpen(false);
    const [emailOpen, setEmailOpen] = React.useState(false);
    const handleEmailOpen = () => setEmailOpen(true);
    const handleEmailClose = () => setEmailOpen(false);
    const [firstName, setFirstName] = React.useState([]);
    const [lastName, setLastName] = React.useState([]);
    const [seekerProfile, setSeekerProfile] = React.useState('');
    const [seekerEmail, setSeekerEmail] = React.useState('');
    const [seekerContact, setSeekerContact] = React.useState('');
    const [jobDetails, setJobDetails] = React.useState([])
    const [appJobDetails, setAppJobDetails] = React.useState([])

    const [initials, setInitials] = React.useState([])

    const downloadResume = () => {
        let seekerID = 2
        // let seekerID = sessionStorage.getItem("seeker_id");
        console.log("download resume")
        axios.get(`${backendServer}/jobseeker/resume?seeker_id=${seekerID}`)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }
    }
     
    const updateProfile = () => {
        let seekerID = 2
        let data = {"seeker_id":seekerID,
            "seeker_name": firstName+' '+lastName,
            "seeker_email": seekerEmail,
            "seeker_contact":seekerContact
        }
        axios.post(`${backendServer}/jobseeker`,data)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }
        
    }

    const deleteResume = () => {
        let seekerID = 2
        axios.post(`${backendServer}/jobseeker/resume/delete?seeker_id=${seekerID}`)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }

    }

    const replaceResume = () => {
        navigate('/upload')
    }
    useEffect(() => {
        let seekerID = 2;
        axios.get(`${backendServer}/jobseeker?seeker_id=${seekerID}`)
            .then(response => {
                let data = response.data[0];
                console.log(data)
                let name = data.seeker_name.split(" ")
                setInitials(name[0].substring(0, 1).toUpperCase()+name[name.length - 1].substring(0, 1).toUpperCase())
                setFirstName(name[0]);
                setLastName(name[1]);
                setSeekerProfile(data);
            axios.get(`${backendServer}/jobseeker/jobs?jobSeekerId=${seekerID}`)
            .then(response => {
                let data1 = response.data;
                console.log(data1)
                setJobDetails(data1);
                axios.get(`${backendServer}/jobseeker/appliedJobs?jobSeekerId=${seekerID}`).then(response => {
                let data2 = response.data;
                console.log(data2)
                setAppJobDetails(data2);
                }).catch=(error) => {
                console.log(error)
            }
            }).catch=(error) => {
                console.log(error)
            }
            }).catch=(error) => {
                console.log(error)
            }
        
        
        }, [])

    return (
        <div>
            <NavBar />
            <br/>
            <Container style={{
                justifyContent: 'center',
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignContent:"center"
            }}>
                <Stack direction="row" spacing={2}>
                    
                    <Avatar sx={{ width: 70, height: 70, backgroundColor: "midnightblue" }}>{initials}</Avatar>
                    <Stack direction="column" >
                    <Typography variant="h5"> {seekerProfile.seeker_name}</Typography>
                    <div>
                            <LocationOnIcon /> <Typography variant="body">{seekerProfile.seeker_state} , {seekerProfile.seeker_country}</Typography>
                    </div>
                    </Stack>
                </Stack>
                <br/><br/>
                {userType === "employer" ?
              
                    <Card style={{ width: 500 }}>
                        <CardContent >
                            <Typography variant='h6'>Contact Information</Typography>
                            <Typography variant='subtitle1'>{seekerProfile.seeker_name}</Typography>
                            <Typography variant='subtitle1'>{seekerProfile.seeker_email}</Typography>
                            <Typography variant='subtitle1'>{seekerProfile.seeker_contact}</Typography>
                            <Typography variant='subtitle1'>{seekerProfile.seeker_state},{seekerProfile.seeker_country}</Typography>
                            <Typography variant='subtitle1'>{seekerProfile.seeker_age}</Typography>
                            <a href={seekerProfile.seeker_resume_location} type="application/pdf" >
                               Resume </a>
                        </CardContent>
                    </Card>

                    :
<div>
                    <Card style={{ width: 500 }}>
                        <CardContent >
                            <Typography variant='h6'>Contact Information</Typography>
                            <Typography variant='subtitle1'>First Name</Typography>
                            <TextField fullWidth value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                id="outlined-basic" label="" variant="outlined" />
                        
                            <Typography variant='subtitle1'>Last Name</Typography>
                            <TextField fullWidth id="outlined-basic" label="" value={lastName} onChange={e => setLastName(e.target.value)}
                                variant="outlined" />
                        
                            <Typography variant='subtitle1'>Email Address</Typography>
                            <TextField fullWidth id="outlined-basic" label="" value={seekerProfile.seeker_email}
                                onChange={e => setSeekerEmail(e.target.value)}
                                variant="outlined" disabled />
                        
                            <Link onClick={handleEmailOpen}><Typography variant='body' color='primary'>edit</Typography></Link>
                            <Modal open={emailOpen} onClose={handleEmailClose}>
                                <EmailModal seekerEmail={seekerEmail} />
                            </Modal>
                        
                            <Typography variant='subtitle1'>Phone Number</Typography>
                            <TextField fullWidth id="outlined-basic" label="" variant="outlined" value={seekerProfile.seeker_contact}
                                onChange={e => setSeekerContact(e.target.value)} />
                            <br /><br />
                            <Stack spacing={2} direction="row">
                                    <Button
                                        onClick={updateProfile}
                                        variant="contained" color='primary'>Save</Button>
                                <Button variant="outlined" color='primary'>Cancel</Button>
                            </Stack>
                        </CardContent>
                    </Card>

                

                <br/>
                <Card style={{ width: 500 }}>
                    <CardContent>
                        <Typography variant='h6'>Resume</Typography>
                        {/* <SvgIcon><path d="http://www.w3.org/2000/svg"></path></SvgIcon> */}
                        <Grid container style={{flexDirection: "row"}}alignItems='center'>
                            <Grid item xs={2}>
                                <ArticleIcon style={{ width: 44, height: 64 }} />
                            </Grid>
                            <Grid item xs={8}>
                                Name_Resume
                            </Grid>
                            <Grid item >
                                <MoreVertIcon onClick={handleResumeOpen }/>
                            </Grid>
                            <Modal
                            open={resumeOpen}
                                onClose={handleResumeClose}>
                                 <Box sx={style}>
                                <List>
                                        <ListItem disablePadding>
                                            <ListItemButton download onClick={downloadResume}>
                                                <ListItemIcon> <FileDownloadOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Download" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={replaceResume}>
                                                <ListItemIcon><ContentCopyIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Replace" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton onClick={deleteResume}>
                                                <ListItemIcon><DeleteIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" />
                                            </ListItemButton>
                                        </ListItem>
                                </List>
                                </Box>
                            </Modal>
                    
                        </Grid>
                    </CardContent>
                </Card>
                <br />
                

                <Card style={{
                    width: 500,
                flexDirection: "column"}}>
                    <CardContent >
                        <Typography variant='h6'>Jobs</Typography>
                        <Typography variant='subtitle1'>Saved</Typography>
                        <Grid container style={{flexDirection: "column"}} spacing={3} >
                            {jobDetails.map(details=>(
                                <Grid style={{ maxWidth:500
                                }} item md={3} key={details._id}>
                                    <JobCard jobDetails={details} /> 
                                </Grid>
                            ))}
                        </Grid>
                                <Typography variant='subtitle1'>Applied</Typography>
                                <Grid container style={{flexDirection: "column"}} spacing={3} >
                                    {appJobDetails.map(details=>(
                                        <Grid style={{ maxWidth:500
                                        }} item md={3} key={details._id}>
                                            <JobCard jobDetails={details} /> 
                                        </Grid>
                                    ))}
                                </Grid>
                    </CardContent>
                </Card>
                <br />
                
                <Card style={{ width: 500 }}>
                    <CardContent>
                        <Typography variant='h6'>Reviews</Typography>
                    </CardContent>
                </Card>
                </div>
                }
            </Container>
        </div>
    )
}
