import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import {markReviewAsAppropriate, markReviewAsInappropriate} from '../../redux/actions/adminActions'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        border : '1px solid black',
        // marginBottom : '10px',
        margin : '20px',
        padding : '20px',
    },
    title : {
        fontWeight : 700,
    },
    appropriate : {
        color : '#326e31',
        // fontWeight : '700',
        marginTop : '10px',
        // backgroundColor : "#326e31",
        // borderRadius : '10px',
        // padding : "10px 30px"
    },
    inappropriate : {
        color : '#e35d54',
        marginTop : '10px',

    }
})

class ReviewCard extends Component {

    handleMarkAppropriate = (review_id) => {
        this.props.markReviewAsAppropriate(review_id)
    }

    handleMarkInappropriate = (review_id) => {
        this.props.markReviewAsInappropriate(review_id)
    }

    render() {
        const { classes } = this.props
        const { review } = this.props
        return (    
            <Grid container item direction="row" className={classes.main}>

                {review.review_title && 
                <>
                <Grid container item xs={3} className={classes.title}>
                    Title
                </Grid>
                <Grid container item xs={9}>
                    {review.review_title}
                </Grid>
                </>}

                {review.review_content && 
                <>
                <Grid container item xs={3} className={classes.title}>
                    Content
                </Grid>
                <Grid container item xs={9}>
                    {review.review_content}
                </Grid>
                </>}

                {review.review_pros && 
                <>
                <Grid container item xs={3} className={classes.title}>
                    Pros
                </Grid>
                <Grid container item xs={9}>
                    {review.review_pros}
                </Grid>
                </>}

                {review.review_cons && 
                <>
                <Grid container item xs={3} className={classes.title}>
                    Cons
                </Grid>
                <Grid container item xs={9}>
                    {review.review_cons}
                </Grid>
                </>}

                {review.review_prep && 
                <>
                <Grid container item xs={3} className={classes.title}>
                    Preparation
                </Grid>
                <Grid container item xs={9}>
                    {review.review_prep}
                </Grid>
                </>}

                {review.inappropriate === 1 && 
                <>
                <Grid container item xs={1} >
                    <ThumbDownIcon className={classes.inappropriate}/>
                </Grid>
                </>}

                {review.inappropriate === 0 && 
                <>
                <Grid container item xs={1} >
                    <ThumbUpIcon className={classes.appropriate}/>
                </Grid>
                </>}

                {review.inappropriate === null && 
                <>
                <Grid container item xs={1}>
                    <IconButton onClick={() => this.handleMarkAppropriate(review.review_id)}>
                        <ThumbUpIcon className={classes.appropriate}/>
                    </IconButton>
                </Grid>
                <Grid container item xs={1}>
                    <IconButton onClick={() => this.handleMarkInappropriate(review.review_id)}>
                        <ThumbDownIcon className={classes.inappropriate}/>
                    </IconButton>
                </Grid>
                </>}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    company : state.company,
})

export default connect(mapStateToProps, {markReviewAsAppropriate, markReviewAsInappropriate} )(withStyles(styles)(ReviewCard))
