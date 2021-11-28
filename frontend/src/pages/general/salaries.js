import React, { Component } from 'react'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import NavBar from '../../components/user/NavBar'
import FindSalaries from '../../components/general/FindSalaries'

class salaries extends Component {
    render() {

        return (    
            <div>
                <Grid direction="row" container >
                    <NavBar/>
                </Grid>
                <FindSalaries/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(salaries)
