import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import NavBar from '../../components/user/NavBar'
import LandingPage from './landingPage'

class home extends Component {
    render() {

        return (    
            <div>
                <Grid direction="row" container >
                    <NavBar/>
                </Grid>
                <LandingPage/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(home)
