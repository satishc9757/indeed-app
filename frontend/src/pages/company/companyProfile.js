import { Button, Card, CardContent, Container, Grid, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import backendServer from "../../webConfig";
import NavBar from "../../components/user/NavBar";
import ArticleIcon from '@mui/icons-material/Article';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import { ListItemButton, ListItemText, Stack } from "@mui/material";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';


export default function CompanyProfile () {
    const [firstName, setFirstName] = React.useState([]);
    const [lastName, setLastName] = React.useState([]);
    const [role, setRole] = React.useState('');
    const [address, setAddress] = React.useState('');
    
    return (
        <div>
            <NavBar />
            <br />
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
                        <TextField fullWidth value= {firstName}
                        onChange={e => setFirstName(e.target.value)}
                            id="outlined-basic" label="" variant="outlined" />
                        
                        <Typography variant='subtitle1'>Last Name</Typography>
                        <TextField fullWidth  id="outlined-basic" label="" value={lastName} onChange={e => setLastName(e.target.value)}
                        variant="outlined" />
                        
                        <Typography variant='subtitle1'>Role</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={role}
                        onChange={e=>setRole(e.target.value)}
                            variant="outlined"  />
                        
                         <Typography variant='subtitle1'>Address</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={address}
                        onChange={e=>setAddress(e.target.value)}
                            variant="outlined" disabled />
                        
                        {/* <Link onClick={handleEmailOpen}><Typography variant='body' color='primary'>edit</Typography></Link>
                        <Modal open={emailOpen} onClose={handleEmailClose}>
                            <EmailModal seekerEmail={seekerEmail}/>
                        </Modal> */}
                        
                        {/* <Typography variant='subtitle1'>Phone Number</Typography>
                        <TextField fullWidth  id="outlined-basic" label="" variant="outlined" value={seekerProfile.seeker_contact}
                            onChange={e => setSeekerContact(e.target.value)} /> */}
                        <br /><br />
                        <Stack spacing={2} direction="row">
                        <Button variant="contained" color='primary'>Save</Button>
                        <Button variant="outlined" color='primary'>Cancel</Button>
                        </Stack>
                    </CardContent>
                </Card>
                </Container>
        </div>
    )
}