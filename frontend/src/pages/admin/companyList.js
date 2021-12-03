import { Avatar, Button, Card, CardContent, Container, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { ListItemButton, Rating } from '@mui/material'
import NavBar from '../../components/user/NavBar'
import backendServer from "../../webConfig";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { width } from '@mui/system';
const axios = require('axios');

export default function CompanyList() {
    const [companyDetails, setCompanyDetails] = React.useState([]);
    const [searchvalue, setSearch] = React.useState([]);
    const [searchResult, setSearchResult] = React.useState([]);
     const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${backendServer}/admin/getAllCompanies`)
            .then(response => {
                let data = response.data;
                console.log(data)
                setCompanyDetails(data);

            }).catch = (error) => {
                console.log(error)
            }
    }, [searchResult])

    const search = async () => {
        let searchResultTemp = [];
        let tempSession=[]
        for (var i = 0; i < companyDetails.length; i++){
            if (companyDetails[i].comp_name.includes(searchvalue)) {
                console.log(companyDetails[i])
                tempSession.push(companyDetails[i])
                // const temp = createCompanyObj(companyDetails[i].comp_name);
                searchResultTemp.push(companyDetails[i].comp_name);
            }
            
        }
        sessionStorage.setItem("obj", JSON.stringify(tempSession))
        setSearchResult(searchResultTemp);
        
    }
    const createCompanyObj = (obj) => {
        return {
            comp_name: obj.comp_name,
            comp_id: obj.comp_id
        }
    }
    

    const openReviews = (value) => {
        console.log(value)
        sessionStorage.setItem("compId", value)
           navigate('/employer/jobstats')  
    }
    
    const openSearchReviews = (value) => {
        console.log(value)
        let details = JSON.parse(sessionStorage.getItem("obj"))
        console.log(details)
        for (let i = 0; i < details.length; i++){
            if (details[i].comp_name === value) {
                sessionStorage.setItem("compId", details[i].comp_id)
            }
        }
        // sessionStorage.setItem("compId", value)
           navigate('/employer/jobstats')  
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

                
            <Grid container spacing={2} style={{'margin':'2% ', justifyContent:"center", alignItems:"center"}}>
                   
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined" 
                        fullWidth
                        required
                            onChange={(e)=>setSearch(e.target.value)}
                        name="search"
                        id="search"
                        label="Search"/>
                    </Grid>
                    
                    <Grid item sm={2}>
                        <Button
                            onClick={(e)=>search()}
                        type="submit"
                        size="large"
                        color="primary"
                        variant="contained" 
                        margin="normal"
                        // onClick={this.search}
                        >
                            Find Company
                        
                        </Button>
                    </Grid>
                </Grid>


                {searchResult.length === 0 ? <div></div> :
                    <div>
                    <Typography variant="h5"> Search Result</Typography>
                <br/>
            <Card style={{
                    width: 700,
                flexDirection: "column"}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {searchResult.map(details=>(
                    <div>
                        <ListItem  disablePadding>
                            <ListItemButton onClick={(e)=>openSearchReviews(details)}>
                                <ListItemText primary={details} />
                            </ListItemButton>
                        </ListItem>
                        <Divider component="li" />
                        </div>))}
                        </List>
                        </Card>
                    </div>
                                
                            
                }
            
                <Typography variant="h5"> Company List</Typography>
                <br/>
            <Card style={{
                    width: 700,
                flexDirection: "column"}}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {companyDetails.map(details=>(
                    <div>
                        <ListItem key={details.comp_id} disablePadding
                        secondaryAction={
              <IconButton edge="end" aria-label="comments">
                View Reviews
              </IconButton>
            }>
                            <ListItemButton onClick={(e)=>openReviews(details.comp_id)}>
                                <ListItemText primary={details.comp_name} >
                                    
                                </ListItemText>
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