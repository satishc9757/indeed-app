import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@mui/material/Avatar'
import { SET_MESSAGE_SENDER_ID, SET_MESSAGE_SENDER_NAME } from '../../redux/types'

import store from '../../redux/store'
import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    name : {
        color : '#2D2D2D',
        fontSize : '17px',
        fontWeight : 500,
        marginTop : '20px'
    },
    ava : {
        marginTop : '15px'
    },
    main : {
        borderBottom : '1px solid #E4E2E0',
    }
})

class MessageHead extends Component {

    handleSetMessageSender(){
        const { sender } = this.props

        store.dispatch({
            type : SET_MESSAGE_SENDER_ID,
            payload : sender.msg_sender
        })

        store.dispatch({
            type : SET_MESSAGE_SENDER_NAME,
            payload : sender.msg_sender_name
        })
        console.log("handleSetMessageSender"+sender.msg_sender)
    }
    
    render(){
        const { sender } = this.props
        const { classes } = this.props

        return (
            <Grid container direction="row" onClick={() => this.handleSetMessageSender()} style={{cursor: 'pointer'}} className={classes.main}>
                <Grid item xs={2} className={classes.ava}>
                    <Avatar src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                </Grid>
                <Grid item xs={10} className={classes.name}>
                    {sender.msg_sender_name}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(withStyles(styles)(MessageHead))