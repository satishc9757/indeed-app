import { Button, Card, CardContent, Container, Grid, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import backendServer from "../../webConfig";
import Box from '@mui/material/Box';
import React, { useEffect } from "react";

const axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  
};
export default function EmailModal({ seekerEmail }, { handleEmailClose }) {
    const [seekerEmail1, setSeekerEmail] = React.useState('');
    const updateEmail = () => {
        let id= sessionStorage.getItem("job-seeker-id")
        let body = {
            "seeker_email": seekerEmail1,
            "seeker_id": id
        }
        console.log(body)
        axios.post(`${backendServer}/jobseeker/email`,body)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }
    }

    return (
        < Box sx = { style } >
            <Container >
                <br/>
                <Typography variant="h6">
                    Changing email address for {seekerEmail} </Typography>
                <Typography variant='subtitle1'>New Email Address</Typography>
                <TextField fullWidth variant="outlined"
                     onChange={e => setSeekerEmail(e.target.value)}
                    label=""></TextField>
                <Typography variant='subtitle1'>Enter again</Typography>
                <TextField fullWidth variant="outlined" label=""></TextField>
                <br /> <br />
                <Button color="primary"
                onClick={updateEmail}
                    variant="contained">Save Email</Button>
                <Button variant="text"
                    onClick={handleEmailClose}
                >Cancel changes</Button>
                <br/><br/>
            </Container>
            </Box >
                                

                                )
}