import { Avatar, Container, Grid, Paper, Tab, Typography, TextField, Button } from "@material-ui/core";
import { Card, CardActions, CardContent, IconButton, Link, Rating, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { Component } from 'react'
import {connect} from 'react-redux'
import ReviewUserCard from "../user/reviewCard";
import NavBar from "../../components/user/NavBar";
import axios from 'axios';
import backendServer from '../../webConfig';

class JobStats extends Component {

    state = {

        reviews:[],
        

            jobStats:[
                // {
                //         job_title: "Software Enginer Intern",
                //         job_location: [{
                //             city: "San Jose",
                //             street:"7th Street",
                //             state: "CA",
                //             country: "USA",
                //             zipcode: "95126",
                //         }],
                //         job_created_at: "01-Dec-2020",
                //         applicants_applied: 2,
                //         applicants_selected: 2,
                //         applicants_rejected: 4
                //     },
                //     {
                //         job_title: "Software Analyst",
                //         job_location: [{
                //             city: "San Jose",
                //             street:"7th Street",
                //             state: "CA",
                //             country: "USA",
                //             zipcode: "95126",
                //         }],
                //         job_created_at: "01-Nov-2020",
                //         applicants_applied: 4,
                //         applicants_selected: 3,
                //         applicants_rejected: 8
                //     },
                ]

    }

    onFieldChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        this.setState({searchResultText: "Popular companies near you" });
        const compId = sessionStorage.getItem("emp_company_id");
        console.log(compId)  //hardcoded for now
        // const compId = sessionStorage.getItem("compId");
        // let comp = 3;
            // parseInt(compId)
        // console.log(compId)  //hardcoded for now
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/company/jobStats?compId=${compId}`);
        console.log(response.data)
        await this.setState({
            jobStats: response.data
        });
        console.log(this.state.jobStats)
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response2 = await axios.get(`${backendServer}/company/getReviewsByCompId?compId=${compId}`);
        console.log(response2.data)
        
        await this.setState({
            reviews: response2.data
        });
        console.log(this.state.reviews)


    }



    renderJobCard = (job, index) => {


        return(
            <div >
                <Card
                    variant="outlined"
                    >
                    <CardContent>

                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <Typography variant="h6" component="div">
                                    <b>{job.job_title}</b>
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {job.job_location[0].city}, {job.job_location[0].state}
                                </Typography>
                                <Typography>Posted on <i>{job.job_created_at}</i></Typography>
                            </Grid>

                            <Grid item xs={2}>

                                    <Typography><b>{job.applicants_applied}</b> <br/><b style={{color: "#2557a7"}}>Applied</b></Typography>


                            </Grid>
                            <Grid item xs={2}>
                                <Typography><b>{job.applicants_selected}</b> <br/><b style={{color: "#2557a7"}}>Hired</b></Typography>
                            </Grid>
                            <Grid item xs={2}>
                            <Typography><b>{job.applicants_rejected} </b> <br/><b style={{color: "#2557a7"}}>Rejected</b></Typography>
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


                {/* JOBS PANEL */}
                <br/>
                <Container maxWidth="md">

                    {sessionStorage.getItem("user-type") === "admin" ?
                    <Card style={{ width: 500 }}>
                    <CardContent>
                                <Typography variant='h6'>Reviews</Typography>
                                {/* <ReviewUserCard reviews={reviews}></ReviewUserCard> */}
                                
                                {this.state.reviews.length === 0 ? <div></div> :
                                    <Grid container style={{ flexDirection: "column" }} >
                                        {this.state.reviews.map(details => (
                                            <Grid style={{
                                                maxWidth: 500
                                            }} item md={3} key={this.state.reviews.review_id}>
                                                <ReviewUserCard reviews={details} />
                                                <br/>
                                            </Grid>
                                        ))}
                                    </Grid>}
                    </CardContent>
                        </Card> : <div></div>}
                    <br/>
                        <Typography variant="h6" component="div">
                            <b>Job Statistics for last year</b>
                        </Typography>
                        <Typography  component="div">
                            Total Jobs posted: {this.state.jobStats.length}
                        </Typography>
                        <br/><br/>

                        <Stack spacing={2}>
                            {this.state.jobStats.map(this.renderJobCard)}
                    </Stack>
                    

                </Container>


            </div>
        )
    }

}

const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, {} )(JobStats)