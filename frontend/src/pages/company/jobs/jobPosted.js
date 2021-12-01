import { Avatar, Container, Grid, Paper, Tab, Typography } from "@material-ui/core";
import React, { Component } from 'react';
import { CardActions, CardContent, TableRow, TableCell, TextField } from '@material-ui/core';
import { Card, IconButton, Pagination, Stack } from "@mui/material";
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import backendServer from '../../../webConfig';


class JobPosted extends Component {

    constructor(){
        super();
        this.state={
            jobs:[]
        }
        sessionStorage.setItem('emp_company_id',1);
    }

    async componentDidMount(){
        var response = await axios.get(`${backendServer}/company/jobs?compId=${sessionStorage.getItem('emp_company_id')}`)
        console.log("response",response);
        await this.setState({
            jobs: response.data
        })
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
                    // onClick={(event) => this.handleJobCardClick(event, index)}
                    >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <Link to = {`/applicants`} >{job.job_title}</Link>
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
                            Applicants applied: {job.job_applicants}
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
            <Container>
                <Typography
                    variant="h4">
                    Jobs Posted
                </Typography><br></br>
                <Container>

                    <Grid container spacing={2}>
                        <Grid item>
                        <Stack spacing={2}>
                            {this.state.jobs.map(this.renderJobCard)}
                        </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}
const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(JobPosted)