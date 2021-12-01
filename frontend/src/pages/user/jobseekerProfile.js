import { Card, CardContent, Container, Grid, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import backendServer from "../../webConfig";
import NavBar from "../../components/user/NavBar";
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { ListItemButton, ListItemText } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
const axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
};

export default function Jobseeker({id}) {

    console.log("id",id);
    const [resumeOpen, setResumeOpen] = React.useState(false);
    const handleResumeOpen = () => setResumeOpen(true);
    const handleResumeClose = () => setResumeOpen(false);
    useEffect(() => {
        let seekerID = '61a081696d73d01739a267ef';
        axios.get(`${backendServer}/jobseeker?${seekerID}`)
            .then(response => {
                console.log(response.data);
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
                <Card style={{ width: 500 }}>
                    <CardContent >
                      <Typography variant='h6'>Contact Information</Typography>  
                    <Typography variant='subtitle1'>First Name</Typography>
                    <TextField fullWidth id="outlined-basic" label="" variant="outlined" />
                    <Typography variant='subtitle1'>Last Name</Typography>
                    <TextField fullWidth  id="outlined-basic" label="" variant="outlined" />
                    <Typography variant='subtitle1'>Email Address</Typography>
                    <TextField fullWidth id="outlined-basic" label="" variant="outlined" disabled />
                    <Link><Typography variant='body' color='primary'>edit</Typography></Link>
                    <Typography variant='subtitle1'>Phone Number</Typography>
                    <TextField fullWidth  id="outlined-basic" label="" variant="outlined" />
                </CardContent>
                </Card>
                <br/>
                <Card style={{ width: 500 }}>
                    <CardContent>
                        <Typography variant='h6'>Resume</Typography>
                        {/* <SvgIcon><path d="http://www.w3.org/2000/svg"></path></SvgIcon> */}
                        <Grid container alignItems='center'>
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
                                            <ListItemButton>
                                                <ListItemIcon> <FileDownloadOutlinedIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Download" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon><ContentCopyIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Replace" />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton>
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
                <br/>
            
            </Container>
        </div>
    )
}
