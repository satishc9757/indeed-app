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
        for (var i = 0; i < companyDetails.length; i++){
            if (companyDetails[i].comp_name.includes(searchvalue)) {
                console.log(companyDetails[i])
                
                searchResultTemp.push(companyDetails[i].comp_name);
            }
            
        }
        setSearchResult(searchResultTemp);
        console.log(searchResult.length)
}
    
    // const search = async () => {
    //     setSearchResult([])
    //     console.log(companyDetails.length)
    //     for (var i = 0; i < companyDetails.length; i++){
    //         console.log(companyDetails[i])
    //         let company = companyDetails[i].comp_name
    //         console.log(company)
    //         if (company.includes(searchvalue)) {
    //             console.log(company)
    //             let a = searchResult
    //             a.push(company)
    //             console.log(a)
    //             setSearchResult(a)
    //             console.log(searchResult)
    //         }
            
    //     }
               
    // }


    const openReviews = (value) => {
        console.log(value)
        sessionStorage.setItem("compId", value)
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


                
                <div >
                    {companyDetails.map(details => (
                        <Card
                            style={{ width: "600" }}
                            key={details.comp_id}
                            variant="outlined"
                            // onClick={(event) => this.handleJobCardClick(event, index)}
                        >
                            <CardContent>
                                <Grid container spacing={3} style={{alignItems:"center"}}>
                                    <Grid item  >
                                        <Avatar
                                            alt="Company Logo"
                                            //src={company.comp_logo}
                                            src="https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/adobe_log.png"
                                            sx={{ width: 56, height: 56 }}
                                        />

                                    </Grid>
                                    <Grid item xs={2}>
                                        <Link href="/common?tab=snapshot">{details.comp_name}</Link>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Rating name="read-only"
                                            size="small"
                                            value={details.comp_avg_rating}
                                            defaultValue={2.5} precision={0.5}
                                            readOnly />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Link href="/common?tab=reviews">Reviews</Link>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Link href="/employer/jobstats">Stats</Link>
                                    </Grid>
                                    
                                </Grid>
                            </CardContent>

                        </Card>
                    ))}
                    </div>
                


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