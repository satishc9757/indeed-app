import { Button, Card, Container, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@material-ui/core'
import { ListItemButton } from '@mui/material'
import NavBar from '../../components/user/NavBar'
import backendServer from "../../webConfig";
import React, { useEffect } from "react";
const axios = require('axios');

export default function CompanyList() {
    const [companyDetails, setCompanyDetails] = React.useState([]);
    const [searchvalue, setSearch] = React.useState([]);
    const [searchResult, setSearchResult] = React.useState([]);

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
        setSearchResult([])
        console.log(companyDetails.length)
        for (var i = 0; i < companyDetails.length; i++){
            console.log(companyDetails[i])
            let company = companyDetails[i].comp_name
            console.log(company)
            if (company.includes(searchvalue)) {
                console.log(company)
                let a = searchResult
                a.push(company)
                console.log(a)
                setSearchResult(a)
                console.log(searchResult)
            }
            
        }
               
    }


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
                            <ListItemButton onClick={(e)=>openReviews(e.target.value)}>
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
                        <ListItem key={details.comp_id} disablePadding>
                            <ListItemButton onClick={(e)=>openReviews(details.comp_id)}>
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