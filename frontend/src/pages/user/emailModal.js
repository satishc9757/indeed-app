import { Button, Card, CardContent, Container, Grid, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import backendServer from "../../webConfig";
import Box from '@mui/material/Box';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  
};
export default function EmailModal({seekerEmail}) {
    return (
        < Box sx = { style } >
            <Container >
                <br/>
                <Typography variant="h6">
                    Changing email address for {seekerEmail} </Typography>
                <Typography variant='subtitle1'>New Email Address</Typography>
                <TextField fullWidth variant="outlined" label=""></TextField>
                <Typography variant='subtitle1'>Current Password</Typography>
                <TextField fullWidth variant="outlined" label=""></TextField>
                <br /> <br />
                <Button color="primary" variant="contained">Save Email</Button>
                <Button variant="text">Cancel changes</Button>
                <br/><br/>
            </Container>
            </Box >
                                

                                )
}