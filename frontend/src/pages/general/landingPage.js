import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Card from '@mui/material/Card';
import axios from 'axios';
import backendServer from '../../webConfig';

class LandingPage extends Component {
    constructor(){
        super();
        this.state={
            results:[]
        }
    }
    uploadResume = ()=>{
        
    }

    onChange = async(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    search = async(e)=>{
        console.log("called search")
        let location = this.state.location||'';
        var response = await axios.get(`${backendServer}/jobseeker/search?searchQuery=${this.state.search}&location=${location}`);
        await this.setState({
            results:response.data
        });
        console.log(this.state.results);
    }

    render() {
        console.log(this.state.results.length===0)
        let jobCards = [];
        if(this.state.results.length>0){
            this.state.results.forEach(result=>
                jobCards.push(<div>
                    <Grid item>
                        <Card fullWidth>
                            <CardContent>
                                <Link href="/" underline="none">{result.job_title}</Link>
                                <Typography>{result.job_company_name} | {result.job_industry}</Typography>
                                <Typography>{result.job_location[0].city}, {result.job_location[0].state}, {result.job_company_rating || ""} . Remote</Typography>
                                <p>{result.job_location.length}+ locations</p>
                                <Typography>Compensation: {result.job_salary_details} [Full Time]</Typography>
                                <Typography>Description: {result.job_what_you_need}</Typography>
                            </CardContent>
                            <CardActions>
                                
                            </CardActions>
                        </Card>
                    </Grid><br/>
                </div>)
            )
        }


        return (  
            <div>
            
            <Box> 
                <Grid container spacing={2} style={{'margin':'2%'}}>
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
                            <Link href="/upload" underline="none">
                                Post Your Resume
                            </Link> - It only takes a few seconds
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item sm={5}/>
                        <Grid item sm={6}>
                            Employers: <Link href="/"
                                underline="none">
                                Post a job
                            </Link>
                        </Grid>
                    </Grid>
                </div>
                }

                {this.state.results.length>0 &&
                <div>
                    <Grid direction="column" 
                    alignItems="flex-start" 
                    container
                    >
                        {jobCards}
                    </Grid>
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
