import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera'
import { Modal } from '@material-ui/core'
import { Box } from '@mui/system'
import axios from 'axios';
import InputBase from '@material-ui/core/InputBase'
import backendServer from '../../webConfig';
import store from '../../redux/store'
import {addChatMessage} from '../../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
    img : {
        marginTop : '10px',
        height : "160px",
        width : "160px",
        backgroundSize: 'contain'
    },
    title : {
        fontSize : '30px',
        fontWeight : 700,
    },
    cnt : {
        marginTop : '30px',
        fontSize : '20px',
        // fontWeight : 700,
    },
    upload : {
        marginTop : '10px',
        marginBottom : '10px',
        color : 'white',
        padding : '10px 40px',
        textTransform : 'capitalize',
        borderRadius : '30px',
        backgroundColor : '#085FF7',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
})


class SendMessage extends Component {
    state = {
        chatBox : '',
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        })
    }

    handleAddChatMessage = () =>{
        const { user_id, email} = this.props.company.authenticatedEmployer
        let msgDetails = {
            msg_content: this.state.chatBox,
            msg_sender: user_id,
            msg_receiver: this.props.seeker_id,
            msg_sender_type: "",
            msg_receiver_type: ""   ,
            msg_sender_name: email,
            msg_receiver_name: this.props.seeker_name,
        }
        this.props.addChatMessage(msgDetails)

        this.setState({
            chatBox : ''
        })
    }

    render() {
        

        return (    
            <Grid container >
                <Grid item xs={11}>
                    <InputBase
                        id="chatBox"
                        name="chatBox"
                        placeholder="Type a message"
                        value={this.state.chatBox}
                        onChange={this.handleChange}
                        fullWidth
                    />

                    <Button onClick={this.handleAddChatMessage}>
                        Send Message
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    company : state.company,
})

export default connect(mapStateToProps, {addChatMessage} )(withStyles(styles)(SendMessage))
