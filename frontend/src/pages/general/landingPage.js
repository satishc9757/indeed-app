import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Container, CardActions, CardContent, TableRow, TableCell, TextField, Typography } from '@material-ui/core';
import { Card, IconButton, Pagination, Stack } from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Table from '@mui/material/Table';
import JobDetailsCard from '../../components/landingpage/JobDetailsCard'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import {Link} from 'react-router-dom';
// import Link from '@material-ui/core/Link'
import axios from 'axios';
import backendServer from '../../webConfig';

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state={
            results:[],
            limit:2,
            page:1,
            totalpage:1,
            selectedJobIndex:0
        }
    }
    onPageChange = async(e, val)=>{
        await this.setState({
            page: val
        })
        await this.search();
    }

    jobId = async(e, id)=>{
        console.log("job id:",e);
        await this.setState({
            jobId:e
        })
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
        await this.search();
    }

    search = async(e)=>{
        console.log("called search")
        let location = this.state.location||'';
        var response = await axios.get(`${backendServer}/jobseeker/search?searchQuery=${this.state.search}&location=${location}&page=${this.state.page}&limit=${this.state.limit}`);
        await this.setState({
            results: response.data,
            totalpage: Number(response.data.totalPages),
            page: Number(response.data.currentPage),
            selectedJobIndex:0
        });
    }

    handleJobCardClick = async(event, jobIndex) => {
        await this.setState({
            selectedJobIndex: jobIndex
        });
    }

    async componentDidMount(){
        this.setState({searchResultText: "Popular companies near you" });

        const seeker_id = sessionStorage.getItem("job-seeker-id"); //to be fetched from cookie

        var response = await axios.get(`${backendServer}/jobseeker?seeker_id=${seeker_id}`);
        console.log("profile data : "+JSON.stringify(response.data));
        await this.setState({
            profileData: response.data[0]
        });
        console.log("profileData from state : "+this.state.profileData);
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
                        <Typography>
                            {job.job_company_name} | {job.job_industry}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {job.job_location[0].city}, {job.job_location[0].state}, {job.job_company_rating || ""} . Remote
                        </Typography>
                        <Typography>
                            Compensation: {job.job_salary_details} [Full Time]
                        </Typography>
                        <Typography>
                            Description: {job.job_what_you_need}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {diffDays}+ days ago
                        </Typography>
                    </CardContent>

                </Card>
            </div>
        );
    }


    render() {


        return (
            <div>

            <Box>
                <Grid container spacing={2} style={{'margin':'2% 0%'}}>
                    <Grid item sm={2}/>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined"
                        fullWidth
                        required
                        onChange = {this.onChange}
                        name="search"
                        id="search"
                        label="Search"/>
                    </Grid>
                    <Grid item sm={3}>
                        <TextField
                        variant = "outlined"
                        fullWidth
                        onChange = {this.onChange}
                        name="location"
                        id="location"
                        label="Search by location"/>
                    </Grid>
                    <Grid item sm={2}>
                        <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        margin="normal"
                        onClick={this.search}
                        >
                            Find jobs
                        </Button>
                    </Grid>
                </Grid>

                {this.state.results.length===0 &&
                <div>
                    <Grid container>
                        <Grid item sm={4}/>
                        <Grid item sm={6}>
                            {'user-id' in sessionStorage &&
                                <div><Link to="/upload" underline="none">
                                    Post Your Resume
                                </Link>- It only takes a few seconds</div>}
                            {!('user-id' in sessionStorage) &&
                                <div>
                                <Link to="/login" underline="none">
                                Post Your Resume
                                </Link> - It only takes a few seconds</div>}
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item sm={5}/>
                        <Grid item sm={6}>
                            Employers: <Link to="/"
                                underline="none">
                                Post a job
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                }
                {/* JOBS PANEL */}
                {'jobCards' in this.state.results && this.state.results.jobCards.length>0 &&
                <div>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Stack spacing={2}>
                            {this.state.results.jobCards.map(this.renderJobCard)}
                        </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <JobDetailsCard job={this.state.results.jobCards[this.state.selectedJobIndex]}
                                            profileData={this.state.profileData}/>
                        </Grid>
                    </Grid>

                </Container>


                {/* PAGINATION         */}
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <InputLabel id="page-select">Page Size</InputLabel>
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
                <Pagination count={this.state.totalpage} page={this.state.page} onChange={this.onPageChange} />
                </div>
                }
                </Box>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(LandingPage)
