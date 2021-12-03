import React, { Component } from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import NavBar from '../../components/user/NavBar'
import ReviewCard from '../../components/admin/ReviewCard'

import {getAllReviews} from '../../redux/actions/adminActions'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        backgroundColor: '#F6F6F6'
    },
    filter : {
        fontSize : '25px',
        padding : '20px',
        fontWeight : 700

    },
    drop : {
        padding : '20px',
    }
})

class reviews extends Component {

    state = {
        inappropriate : ''
    }

    componentDidMount(){
        this.props.getAllReviews()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    displayReviews(){
        const { reviews } = this.props.admin
        let appropriateReviews = reviews
        if(this.state.inappropriate === ""){
            appropriateReviews = reviews
        } else {
            appropriateReviews = reviews.filter(review => {
                return review.inappropriate === this.state.inappropriate
            })
        }
        
        return appropriateReviews.map((review) => <ReviewCard key={review.review_id} review={review}/>) 

    }

    render() {
        const {classes } = this.props
        return (    
            <Grid container direction="row">
                <Grid container item>
                    <NavBar/>
                </Grid>
                
                <Grid container item xs ={3} className={classes.filter}>
                    Select review filter :
                </Grid>

                <Grid container item xs ={9} className={classes.drop}>
                    <FormControl >
                        <Select
                            name="inappropriate"
                            id="inappropriate"
                            value={this.state.inappropriate}
                            onChange={this.handleChange}
                            className={classes.select}
                            label="Filter"
                            >
                            <MenuItem value={""} defaultValue >None</MenuItem>
                            <MenuItem value={0}>Appropriate</MenuItem>
                            <MenuItem value={1}>Inappropriate</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid container item direction="column" xs ={5}>
                    { Object.keys(this.props.admin.reviews).length !== 0 && this.displayReviews()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    admin : state.admin,
})

export default connect(mapStateToProps, {getAllReviews} )(withStyles(styles)(reviews))
