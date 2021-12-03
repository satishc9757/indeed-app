import { Avatar, Container, Grid, Paper, Tab, Typography, TextField, Button } from "@material-ui/core";
import { Card, CardActions, CardContent, IconButton, Link, Rating, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { Component } from 'react'
import {connect} from 'react-redux'
// import JobDetails from "./jobDetails";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBar from "../components/user/NavBar";
import axios from 'axios';
import backendServer from "../webConfig";

class CompanyReviews extends Component {

    state = {
            companySearchText :"",
            locaitonSearchText :"",
            searchResultText:"",
            companies:[{
                comp_id:"1",
                comp_name:"Adobe",
                comp_logo:"https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/adobe_log.png",
                comp_avg_rating:"4.3",
            },
            {
                comp_id:"2",
                comp_name:"Facebook",
                comp_logo:"https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/adobe_log.png",
                comp_avg_rating:"3.0",
            },
            {
                comp_id:"3",
                comp_name:"Apple",
                comp_logo:"https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/adobe_log.png",
                comp_avg_rating:"5.0",
            }]
    }

    onFieldChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setCompanyDetails = (company) => {
        sessionStorage.setItem("emp_company_id", company.comp_id);
        sessionStorage.setItem("job_company_name", company.comp_name);
    }

    async componentDidMount(){
        this.setState({searchResultText: "Popular companies near you" });

        let locationText = "San Jose"; //to be fetched from cookie
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/company/search?locaitonSearchText=${locationText}`);
        await this.setState({
            companies: response.data
        });
    }

    onSearch = async () => {
        console.log("called search")
        let companyText = this.state.companySearchText;
        let locationText = this.state.locaitonSearchText;
        this.setState({searchResultText: 'Search results for Company "'+companyText+'" and  Location "'+locationText+'" '});

        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/company/search?companySearchText=${companyText}&locaitonSearchText=${locationText}`);
        await this.setState({
            companies: response.data
        });
    }


    // handleJobCardClick = (event, jobIndex) => {
    //     // this.setState({currentJob: this.state.jobs[jobIndex]});
    //     // console.log(event);
    //     // event.target.classList.add("light-grey-background");
    //     this.setState({selectedJobIndex: jobIndex});
    // }


    renderCompanyCard = (company, index) => {
        // const oneDay = 24 * 60 * 60 * 1000;
        // const currentDate = new Date();
        // const jobDate = new Date(job.job_created_at); //job_created_at should be in mm/dd/yyyy format
        // const diffDays = Math.round(Math.abs((currentDate - jobDate) / oneDay));
        // const selectedStyle = (this.state.selectedJobIndex == index) ? {backgroundColor:"lightgrey", borderLeftColor:"#2557a7", borderLeftWidth: "thick"} : null;


        return(
            <div >
                <Card
                    // style={selectedStyle}
                    variant="outlined"
                    // onClick={(event) => this.handleJobCardClick(event, index)}
                    >
                    <CardContent>
                        {/* <Typography variant="h5" component="div">
                            {job.job_title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {job.job_location.city}, {job.job_location.state}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {diffDays}+ days ago
                        </Typography> */}

                        <Grid container spacing={2}>
                            <Grid item xs={1}>
                                <Avatar
                                    alt={"Company Logo"}
                                    //src={company.comp_logo}
                                    src={company.comp_profile_location}
                                    sx={{ width: 56, height: 56 }}
                                />

                            </Grid>
                            <Grid item xs={2}>
                                <Link href="/common?tab=snapshot">{company.comp_name}</Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Rating name="read-only"
                                        size="small"
                                        value={company.comp_avg_rating}
                                        defaultValue={2.5} precision={0.5}
                                        readOnly />
                            </Grid>
                            <Grid item xs={2}>
                                <Link href="/common?tab=reviews" onClick={() => this.setCompanyDetails(company)} >Reviews</Link>
                            </Grid>
                            <Grid item xs={2}>
                                <Link href="/common?tab=salaries" onClick={() => this.setCompanyDetails(company)} >Salaries</Link>
                            </Grid>
                            <Grid item xs={2}>
                                <Link href="/common?tab=jobs" onClick={() => this.setCompanyDetails(company)}>Jobs</Link>
                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>
            </div>
        );
    }

    render(){
        return (
            <div>
                <NavBar />
                {/* <Typography
                        variant="h4">
                        {this.state.company_name} Jobs
                </Typography> */}
                {/* SEARCH PANEL */}
                <Grid container spacing={2} style={{'margin':'2%'}}>
                    <Grid item sm={2}/>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined"
                        fullWidth
                        required
                        onChange = {this.onFieldChange}
                        name="companySearchText"
                        id="companySearchText"
                        label="Company name"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment> <SearchIcon /> </InputAdornment>
                              )
                          }}
                        // endAdornment={
                        //     <InputAdornment position="end">
                        //       <IconButton>
                        //         {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   }
                          />
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined"
                        fullWidth
                        onChange = {this.onFieldChange}
                        name="locaitonSearchText"
                        id="locaitonSearchText"
                        label="Search by location"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment> <LocationOnIcon /> </InputAdornment>
                              )
                          }}
                        />
                    </Grid>
                    <Grid item sm={3}>
                        <Button
                        size="medium"
                        style={{ backgroundColor:"#2557a7", color: "white"}}
                        variant="contained"
                        onClick={this.onSearch}>
                            Find Companies
                        </Button>
                    </Grid>
                </Grid>

                {/* JOBS PANEL */}

                <Container maxWidth="md">
                        <Typography variant="h6" component="div">
                            <b>{this.state.searchResultText}</b>
                        </Typography>
                        <br/><br/>

                        <Stack spacing={2}>
                            {this.state.companies.map(this.renderCompanyCard)}
                        </Stack>

                    {/* <Grid container spacing={2} style={{align:"center"}} >
                        <Grid item xs={6}>
                        <Stack spacing={2}>
                            {this.state.jobs.map(this.renderJobCard)}
                        </Stack>
                        </Grid> */}
                        {/* <Grid item xs={6}>
                            <JobDetails job={this.state.jobs[this.state.selectedJobIndex]}/>
                        </Grid> */}
                    {/* </Grid> */}
                </Container>


            </div>
        )
    }

}

const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, {} )(CompanyReviews)