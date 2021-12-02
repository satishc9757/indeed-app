import { Button, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { ListItemButton } from '@mui/material'
import NavBar from '../../components/user/NavBar'
import backendServer from "../../webConfig";
import React, { useEffect } from "react";

const axios = require('axios');

export default function CompanyList() {
    const [companyDetails, setCompanyDetails] = React.useState([]);

    useEffect(() => {
        axios.get(`${backendServer}/admin/getAllCompanies`)
            .then(response => {
                let data = response.data;
                console.log(data)
                setCompanyDetails(data);

            }).catch = (error) => {
                console.log(error)
            }
    }, [])
    
    const openReviews = (value) => {
        console.log(value)
    }


    return (
        <div>
            <NavBar />
            <br /><br />
            <Container style={{
                justifyContent: 'center',
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignContent: "center",
                alignItems:"center"
            }}>
            <Grid container spacing={2} style={{'margin':'2% ', justifyContent:"center"}}>
                    <Grid item sm={2}/>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined" 
                        fullWidth
                        required
                        // onChange = {this.onChange}
                        name="search"
                        id="search"
                        label="Search"/>
                    </Grid>
                    
                    <Grid item sm={2}>
                        <Button
                        type="submit"
                        size="large"
                        color="primary"
                        variant="contained" 
                        margin="normal"
                        // onClick={this.search}
                        >
                            Find jobs
                        </Button>
                    </Grid>
                </Grid>


            
                <Typography variant="h5"> Company List</Typography>
                <br/>
            <Card style={{
                    width: 700,
                flexDirection: "column"}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {companyDetails.map(details=>(
                    <div>
                        <ListItem key={details.comp_id} disablePadding>
                            <ListItemButton onClick={(e)=>openReviews(e.target.value)}>
                                <ListItemText primary={details.comp_name} />
                            </ListItemButton>
                        </ListItem>
                        <Divider  component="li" />
                    </div>
                                
                            ))}
                
                
                
                
                    
            </List>
            </Card>
            </Container>
        </div>
    )
}