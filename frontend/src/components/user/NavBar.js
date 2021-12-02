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
                    {(sessionStorage.getItem("user-type")==="employer")?(
                        <Link to="/applicants">Jobs</Link>
                    ):(
                        <p>Find salaries</p>
                    )
                    }
                </Button>
                {'user-id' in sessionStorage && sessionStorage.getItem("user-type")!=="employer"? (
                    <Button><Link to="/upload">Upload Resume</Link></Button>
                ):(
                    <div>
                        {sessionStorage.getItem("user-type")!=="employer" &&
                        <Button><Link to="/login">Upload Resume</Link></Button>}
                    </div>
                )
                }
                {!('user-id' in sessionStorage)&& 
                <div>
                    <Button>
                        Sign in
                    </Button>

                    <Button>
                        Employers / Post Job
                            </Button>
                    <Link to='/jobseeker'>
                        <IconButton>
                            <PersonIcon/>
                        </IconButton>
                    </Link>
                    <Button>
                        <Link to="/login">
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit"></Button>
                </div>
            }
            </Toolbar>
            </AppBar>
            </Box>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(NavBar)