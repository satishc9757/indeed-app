import backendServer from "../../../webConfig";
import { Avatar, Container, Grid, Paper, Tab, Typography, TextField, Button, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Card, CardActions, CardContent, IconButton, Pagination, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { Component } from 'react'
import {connect} from 'react-redux'
import JobDetails from "./jobDetails";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import backendServer from "../../../webConfig";

class Jobs extends Component {

    state = {
            jobTitleSearchText :"",
            locationSearchText :"",
            limit:1,
            page:1,
            totalpage:2,
            company_id: "Comp1",
            company_name: "PWC",
            jobs : [{
                    job_company_id: "Comp1",
                    job_title: "Software Engineer Intern",
                    job_company_name: "PWC",
                    job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
                    job_industry: "Information Technology",
                    job_location: [{
                        city: "San Jose",
                        street:"7th Street",
                        state: "CA",
                        country: "USA",
                        zipcode: "95126",
                    }],
                    job_work_type: "Internship",
                    job_salary_details: "$50/hour",
                    job_compensation: 50,
                    job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
                    job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
                    job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
                    job_created_at: "11/12/2021"
                }, {
                    job_company_id: "Comp1",
                    job_title: "Summer Analyst",
                    job_company_name: "PWC",
                    job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
                    job_industry: "Information Technology",
                    job_location: [{
                        city: "San Jose",
                        street:"7th Street",
                        state: "CA",
                        country: "USA",
                        zipcode: "95126",
                    }],
                    job_work_type: "Internship",
                    job_salary_details: "$50/hour",
                    job_compensation: 50,
                    job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
                    job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
                    job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
                    job_created_at: "11/01/2021"
                }],
            currentJob: {
                job_company_id: "Comp1",
                job_title: "Software Engineer Intern",
                job_company_name: "PWC",
                job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
                job_industry: "Information Technology",
                job_location: {
                    city: "San Jose",
                    street:"7th Street",
                    state: "CA",
                    country: "USA",
                    zipcode: "95126",
                },
                job_work_type: "Internship",
                job_salary_details: "$50/hour",
                job_compensation: 50,
                job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
                job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
                job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
                job_created_at: "11/01/2021"
            },
            selectedJobIndex : 0,
    }

    onPageChange = async(e, val)=>{
        await this.setState({
            page: val
        })
        await this.onSearch();
    }

    onChange = async(e)=>{
        await this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSelect = async(e)=>{
        await this.setState({
            limit: e.target.value
        });
        await this.onSearch();
    }

    handleJobCardClick = (event, jobIndex) => {
        // this.setState({currentJob: this.state.jobs[jobIndex]});
        // console.log(event);
        // event.target.classList.add("light-grey-background");
        this.setState({selectedJobIndex: jobIndex});
    }

    onSearch = async () => {
        let location = this.state.locationSearchText||'';
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/jobseeker/search?searchQuery=${this.state.jobTitleSearchText}&location=${location}&page=${this.state.page}&limit=${this.state.limit}`);
        console.log("jobs data : "+JSON.stringify(response.data));
        await this.setState({
            jobs: response.data.jobCards,
            totalpage: Number(response.data.totalPages),
            page: Number(response.data.currentPage)
        });

    }

    async componentDidMount(){
        let job_company_id = sessionStorage.getItem("job_company_id");
        console.log("called from browser")
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        const response = await axios.get(`${backendServer}/company/jobsByPages?compId=${job_company_id}&page=${this.state.page}&limit=${this.state.limit}`);
        console.log("jobs data : "+JSON.stringify(response.data));
        await this.setState({
            jobs: response.data.jobPostings,
            totalpage: Number(response.data.totalPages),
            page: Number(response.data.currentPage)
        });
      }

    renderJobCard = (job, index) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const currentDate = new Date();
        const jobDate = new Date(job.job_created_at); //job_created_at should be in mm/dd/yyyy format
        const diffDays = Math.round(Math.abs((currentDate - jobDate) / oneDay));
        const selectedStyle = (this.state.selectedJobIndex == index) ? {backgroundColor:"lightgrey", borderLeftColor:"#2557a7", borderLeftWidth: "thick"} : null;


        return(
            <div >
                <Card
                    style={selectedStyle}
                    variant="outlined"
                    onClick={(event) => this.handleJobCardClick(event, index)}
                    >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {job.job_title}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {job.job_location[0].city}, {job.job_location[0].state}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {diffDays}+ days ago
                        </Typography>
                    </CardContent>

                </Card>
            </div>
        );
    }

    render(){
        return (
            <div>
                <Typography
                        variant="h4">
                        Jobs
                </Typography>
                {/* SEARCH PANEL */}
                <Grid container spacing={2} style={{'margin':'2%'}}>
                    <Grid item sm={2}/>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined"
                        fullWidth
                        required
                        onChange = {this.onChange}
                        name="jobTitleSearchText"
                        id="jobTitleSearchText"
                        label="Job title"
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
                        onChange = {this.onChange}
                        name="locationSearchText"
                        id="locationSearchText"
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
                            Find jobs
                        </Button>
                    </Grid>
                </Grid>

                {/* JOBS PANEL */}
                <Container>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Stack spacing={2}>
                            {this.state.jobs.map(this.renderJobCard)}
                        </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <JobDetails job={this.state.jobs[this.state.selectedJobIndex]}/>
                        </Grid>
                    </Grid>
                </Container>

                {/* PAGINATION         */}
                <Grid container spacing={2}>
                        <Grid item xs={1}>
                        <InputLabel id="page-select-label">Page Size</InputLabel>
                        </Grid>
                        <Grid item xs={2}>
                            <Select id="page-select"
                                defaultValue={1}
                                label="page-select-label"
                                onChange={this.onSelect} >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </Grid>
                    </Grid>
                {/* <InputLabel id="page-select">Page Size</InputLabel>
                <Select id="page-select"
                    defaultValue={1}
                    label="limit Size"
                    onChange={this.onSelect} >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                </Select> */}
                <Pagination count={this.state.totalpage} page={this.state.page} onChange={this.onPageChange} />

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, {} )(Jobs)