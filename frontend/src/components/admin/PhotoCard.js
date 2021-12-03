import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import {markPhotoAsAppropriate, markPhotoAsInappropriate} from '../../redux/actions/adminActions'

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

    },
    photo : {
        marginTop : '10px',
        height : "160px",
        width : "160px",
        backgroundSize: 'contain'
    }
})

class PhotoCard extends Component {

    handleMarkAppropriate = (photo_id) => {
        this.props.markPhotoAsAppropriate(photo_id)
    }

    handleMarkInappropriate = (photo_id) => {
        this.props.markPhotoAsInappropriate(photo_id)
    }

    render() {
        const { classes } = this.props
        const { photo } = this.props
        return (    
            <Grid container item direction="row" className={classes.main}>

                {photo._id && 
                <>
                <Grid container item xs={12}>
                    <div className={classes.photo} style={{backgroundImage: `url(${photo.comp_photos})`}}>
                    </div>
                </Grid>
                </>}

                {photo.inappropriate === 1 ? 
                <>
                <Grid container item xs={1} >
                    <ThumbDownIcon className={classes.inappropriate}/>
                </Grid>
                </>
                    :
                photo.inappropriate === 0 ? 
                <>
                <Grid container item xs={1} >
                    <ThumbUpIcon className={classes.appropriate}/>
                </Grid>
                </>

                : 
                <>
                <Grid container item xs={1}>
                    <IconButton onClick={() => this.handleMarkAppropriate(photo._id)}>
                        <ThumbUpIcon className={classes.appropriate}/>
                    </IconButton>
                </Grid>
                <Grid container item xs={1}>
                    <IconButton onClick={() => this.handleMarkInappropriate(photo._id)}>
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

export default connect(mapStateToProps, {markPhotoAsAppropriate, markPhotoAsInappropriate} )(withStyles(styles)(PhotoCard))
