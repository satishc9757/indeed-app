import React, { Component } from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { CardActions, CardContent, TextField, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
// import {Link} from 'react-router-dom';
import Link from '@material-ui/core/Link'
import { Pagination } from '@mui/material';
import Card from '@mui/material/Card';
import axios from 'axios';
import backendServer from '../../webConfig';

class LandingPage extends Component {
    constructor(){
        super();
        this.state={
            results:[],
            raised: false,
            shadow:1,
            limit:1,
            page:1,
            totalpage:1,
        }
    }
    onPageChange = async(e, val)=>{
        await this.setState({
            page: val
        })
        await this.search();
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
            page: Number(response.data.currentPage)
        });

    }
        
    render() {
        console.log(this.state.results, this.state)
        let jobCards = [];
        if('jobCards' in this.state.results){
            this.state.results['jobCards'].forEach(result=>
                jobCards.push(
                <div>
                    <Grid item>
                        <Card fullWidth 
                        onMouseOver={()=> this.setState({raised:true, shadow:3})}
                        onMouseOut={()=> this.setState({raised:false, shadow:1})}
                        raised={this.state.raised}
                        zdepth={this.state.shadow} >
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
                </div>
                )
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
                            {this.state.jobSeekerId &&
                                <Link href="/upload" underline="none">
                                    Post Your Resume
                                </Link>}
                            {!this.state.jobSeekerId &&
                                <Link href="/login" underline="none">
                                Post Your Resume
                                </Link>} - It only takes a few seconds
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

                {'jobCards' in this.state.results &&
                <div>
                    <Grid direction="column" 
                    alignItems="flex-start" 
                    container
                    style={{'margin':'2%'}}
                    >
                        {jobCards}
                    </Grid>
                    <InputLabel id="page-select">Limit Size</InputLabel>
                    <Select id="page-select" 
                    defaultValue={1} 
                    label="limit Size"
                    onChange={this.onSelect} >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
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
