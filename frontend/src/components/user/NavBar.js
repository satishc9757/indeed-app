import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../../media/IndeedLogo.png'

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            route:[]
        }
    }
    async componentDidMount(){
        // let type = sessionStorage.getItem("user_type");
        let type="jobseeker"
        if (type === "employer") {
            this.setState({
                route: "/companyProfile"
            })
        } else if (type === "jobseeker") {
            this.setState({
                route: "/jobseeker"
            })
        }
    }
    

    render(){
        return (
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative" color="transparent" >
            <Toolbar>
                
                <img src={logo} alt="Profile" width="110" height="30"/>

                <Button>
                    <Link to="/">Find jobs</Link>
                </Button>
                <Button>
                    Company reviews
                </Button>

                <Button>
                    Find salaries
                </Button>

                <Button>
                    {'userId' in sessionStorage &&
                    <Link to="/upload">Upload Resume</Link>}
                    {! ('userId' in sessionStorage) && 
                        <Link to="/login">Upload Resume</Link>
                        
                    }
                </Button>

                <Button>
                    Sign in
                </Button>

                <Button>
                    Employers / Post Job
                        </Button>
                <Link to={this.state.route}>
                    <IconButton>
                        <PersonIcon/>
                    </IconButton>
                </Link>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Login
                </Typography>
                <Button color="inherit"></Button>
            </Toolbar>
            </AppBar>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(NavBar)