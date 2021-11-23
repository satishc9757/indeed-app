import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

class login extends Component {
    render() {

        return (    
            <Grid direction="row" container >
                <Grid container item sm={3}>
                    login
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(login)
