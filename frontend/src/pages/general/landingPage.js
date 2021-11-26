import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { TextField, Typography } from '@material-ui/core'
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button'
import Link from '@mui/material/Link'
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
        let location = this.state.location||'';
        var response = await axios.get(`${backendServer}/jobseeker/search?searchQuery=${this.state.search}&location=${location}`);
        await this.setState({
            results:response.data
        });
        console.log(this.state.results);
    }

    render() {
        console.log(this.state.results.length===0)
        return (   
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
                            <Typography>
                                <Link onClick={this.uploadResume}
                                    underline="none">
                                    Post Your Resume
                                </Link> - It only takes a few seconds
                            </Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item sm={5}/>
                        <Grid item sm={6}>
                            <Typography>Employers: <Link onClick={this.uploadResume}
                                    underline="none">
                                    Post a job
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
                }

                {this.state.results.length>0 &&
                <div>
                    <p>hii</p>
                </div>
                
                
                }
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(LandingPage)
