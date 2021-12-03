import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    msgSender : {
        border : '1px solid #E4E2E0',
        color : '#2D2D2D',
        fontSize : '15px',
        fontWeight : 420,
        marginTop : '16px',
        padding : '5px 10px',
        backgroundColor : '#f0f6ff',
        borderRadius : '5px'
    },
    msgReceiver : {
        border : '1px solid #E4E2E0',
        color : '#2D2D2D',
        fontSize : '15px',
        fontWeight : 420,
        marginTop : '16px',
        display: 'flex', 
        justifyContent: 'flex-end',
        padding : '5px 10px',
        borderRadius : '5px'

    },
    // chat : {
    //     border : '1px solid #E4E2E0',
    //     width : 'auto'
    // }
})

class MessageText extends Component {

    render(){
        const { message } = this.props
        const { _id } = this.props.user.authenticatedUser
        const { classes } = this.props

        return (
            <Grid container >
                {message.msg_sender === _id ? 
                <>
                    <Grid item xs={2} className={classes.name}>
                        
                    </Grid>
                    <Grid item xs={10} className={classes.msgReceiver}>
                        {message.msg_content}
                    </Grid>
                </> :
                <Grid container justifyContent="flex-end" alignContent="flex-end" >
                    <Grid item xs={10} className={classes.msgSender}>
                        {/* <div className={classes.chat}> */}
                            {message.msg_content}
                        {/* </div> */}
                    </Grid>
                    <Grid item xs={2} className={classes.name}>
                        
                    </Grid>
                </Grid> 
                }
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(MessageText))