import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import NavBar from '../../components/user/NavBar'

class home extends Component {
    render() {

        return (    
            <Grid direction="row" container >
                <NavBar/>
                <Grid container item sm={3}>
                    home
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(home)
