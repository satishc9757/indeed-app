import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@mui/icons-material/Search'
import AddLocationIcon from '@mui/icons-material/AddLocation'

import bg_salaries from '../../media/bg_salaries.png'

const styles = (theme) => ({
    ...theme.spread,
    tile : {
        width:'1349px',
        height:'335px',
        objectFit: 'cover',
        position: 'relative',
        backgroundPosition: 'center'
    },
    search : {
        backgroundImage: `url(${bg_salaries})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: window.innerWidth,
        height:'335px',
        paddingLeft : '40px'
    },
    head1 : {
        paddingTop : '55px',
        fontSize : '30px',
        fontWeight : 640
    },
    searchBar : {
        marginTop : '25px',
        backgroundColor : 'white',
        borderRadius : '10px',
        borderTop : '10px solid #7EACFB',
        height : '148px'
    },
    searchBarInner : {
        paddingLeft : '15px',
        marginTop : '30px'
    },
    title : {
        fontSize : '17px',
        fontWeight : 640,
        marginBottom : '10px'
    },
    input : {
        border : '1px solid #949494',
        borderRadius : '10px',
        height : '45px'
    },
    button: {
        height : '45px',
        borderRadius : '10px',
        paddingLeft : '23px',
        paddingRight : '23px',
        fontSize : '17px',
        color : 'white',
        backgroundColor : '#085FF7',
        textTransform : 'capitalize',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    },
})

class FindSalaries extends Component {
    state = {
        jobTitle : '',
        location : ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        })
    }

    render() {
        const { classes } = this.props

        return (    
            <Grid container >
                <Grid alignItems item className={classes.search}> 
                    <Grid item className={classes.head1}>
                        Find a career you'll love
                    </Grid>
                    <Grid item>
                        Explore which careers have the highest job satisfaction, best salaries, and more
                    </Grid>
                    <Grid container item direction="row">
                        <Grid container item direction="row" xs={7} className={classes.searchBar}>
                            <Grid container item direction="column" xs={5} className={classes.searchBarInner}>
                                <Grid item className={classes.title}>
                                    What
                                </Grid>
                                <Grid item>
                                <InputBase
                                    id="jobTitle"
                                    name="jobTitle"
                                    className={classes.input}
                                    placeholder="job title"
                                    value={this.state.jobTitle}
                                    onChange={this.handleChange}
                                    fullWidth
                                    endAdornment={<SearchIcon style={{color : '#767676'}} />}
                                />
                                </Grid>
                            </Grid>
                            <Grid container item direction="column" xs={5} className={classes.searchBarInner}>
                                <Grid item className={classes.title}>
                                    Where
                                </Grid>
                                <Grid item>
                                <InputBase
                                    id="locationIcon"
                                    name="location"
                                    className={classes.input}
                                    value={this.state.location}
                                    placeholder="location"
                                    onChange={this.handleChange}
                                    fullWidth
                                    endAdornment={<AddLocationIcon style={{color : '#767676'}} />}
                                />
                                </Grid>
                            </Grid>
                            <Grid container item direction="column" xs={2} className={classes.searchBarInner}>
                                <Grid item className={classes.title} style={{color : 'white'}}>
                                    What
                                </Grid>
                                <Grid item>
                                    <Button className={classes.button}>
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(withStyles(styles)(FindSalaries))
