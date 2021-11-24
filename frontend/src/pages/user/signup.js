import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

class signup extends Component {
    render() {

        return (    
            <Grid direction="row" container >
                <Grid container item sm={3}>
                    signup
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(signup)
