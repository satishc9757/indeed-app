import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Typography } from "@material-ui/core";
import {Link} from 'react-router-dom';
import axios from 'axios';
import backendServer from '../../webConfig';
import NavBar from '../../components/user/NavBar'

class EmployerHome extends Component {

    async componentDidMount(){
        if("user-type" in sessionStorage && sessionStorage.getItem("user-type")==="employer"){
            var response = await axios.get(`${backendServer}/getCompanyId?id=${sessionStorage.getItem("emp-id")}`);
            console.log("data", response);
            sessionStorage.setItem('emp_company_id', response.data.id)
        }

    }
    render() {
        return (    
            <div>
                <Grid direction="row" container >
                    <NavBar/>
                    <Grid container spacing={2} style={{'margin':'5% 25%'}}>
                        {sessionStorage.getItem("user-type")==="employer"?(
                            <Link to="/jobs">Access Here</Link>
                        ):(
                            <div>
                                <Typography>Kindly Login here to access employers functionalities - <Link to="/login">Login</Link></Typography> 
                            </div>
                        )}
                    </Grid>

                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(EmployerHome)
