import React, { Component } from 'react'
import {connect} from 'react-redux'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import NavBar from '../../components/user/NavBar'
import PhotoCard from '../../components/admin/PhotoCard'

import {getAllPhotos} from '../../redux/actions/adminActions'

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

class photos extends Component {

    state = {
        inappropriate : ''
    }

    componentDidMount(){
        this.props.getAllPhotos()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    displayPhotos(){
        const { photos } = this.props.admin
        let appropriatePhotos = photos
        if(this.state.inappropriate === ""){
            appropriatePhotos = photos
        } else {
            appropriatePhotos = photos.filter(photo => {
                return photo.inappropriate === this.state.inappropriate
            })
        }
        // console.log()
        return appropriatePhotos.map((photo) => <PhotoCard key={photo.photo_id} photo={photo}/>) 

    }

    render() {
        const {classes } = this.props
        return (    
            <Grid container direction="row">
                <Grid container item>
                    <NavBar/>
                </Grid>
                
                <Grid container item xs ={3} className={classes.filter}>
                    Select photo filter :
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
                    { Object.keys(this.props.admin.photos).length !== 0 && this.displayPhotos()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    admin : state.admin,
})

export default connect(mapStateToProps, {getAllPhotos} )(withStyles(styles)(photos))
