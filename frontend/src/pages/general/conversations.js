import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Avatar from '@mui/material/Avatar'

import {getChatMessages, addChatMessage} from '../../redux/actions/userActions'

import NavBar from '../../components/user/NavBar'
import MessageHead from '../../components/user/MessageHead'
import MessageText from '../../components/user/MessageText'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        backgroundColor: '#F6F6F6'
    },
    allGrid : {
        backgroundColor: 'white',
        border : '1px solid #E4E2E0',
        borderRadius : '10px',
        marginTop : '30px',
        marginRight : '40px',
        marginLeft : '90px',
        height : window.innerHeight - 100,
        padding : '10px'
    },
    convGrid : {
        backgroundColor: 'white',
        border : '1px solid #E4E2E0',
        borderRadius : '10px',
        marginTop : '30px',
        marginRight : '90px',
        height : window.innerHeight - 100,
        padding : '10px'
    },
    convInnerGrid : {
        height : window.innerHeight - 200,
    },
    msgTitle : {
        color : '#2D2D2D',
        fontSize : '22px',
        fontWeight : 650
    },
    welcome : {
        color : '#2D2D2D',
        fontSize : '25px',
        fontWeight : 650,
        marginBottom : '20px'
    },
    chatBox : {
        border : '1px solid #E4E2E0',
        borderRadius : '7px',
        height : '35px'
    },
    button: {
        height : '35px',
        borderRadius : '10px',
        fontSize : '17px',
        color : 'white',
        backgroundColor : '#085FF7',
        textTransform : 'capitalize',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    },
    name : {
        color : '#2D2D2D',
        fontSize : '18px',
        fontWeight : 500,
        marginTop : '5px'
    },
    head : {
        borderBottom : '1px solid #b8b6b4',
    }
})

class conversations extends Component {

    state = {
        chatBox : '',
    }

    componentDidMount(){
        // CHANGEE THISS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let id = this.props.user.authenticatedUser._id
        // let id = 1
        console.log("getChatMessages"+JSON.stringify(id))
        this.props.getChatMessages(id)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        })
    }

    handleAddChatMessage = () =>{
        const { _id, seeker_name} = this.props.user.authenticatedUser
        const { msg_sender_id, msg_sender_name } = this.props.user
        let msgDetails = {
            msg_content: this.state.chatBox,
            msg_sender: _id,
            msg_receiver: msg_sender_id,
            msg_sender_type: "",
            msg_receiver_type: ""   ,
            msg_sender_name: msg_sender_name,
            msg_receiver_name: seeker_name
        }
        this.props.addChatMessage(msgDetails)

        this.setState({
            chatBox : ''
        })
    }

    getMessageHeads(){
        const { messages } = this.props.user
        const { _id } = this.props.user.authenticatedUser

        let uniqueSenders = [...new Map(messages.map(msg =>
            [msg.msg_sender, msg])).values()];

        return uniqueSenders.map((sender) => (
            sender.msg_sender !== _id && <MessageHead key={sender.msg_id} sender={sender}/>
        ))
    }

    displayMessages(){
        const { messages, msg_sender_id } = this.props.user
        const { _id } = this.props.user.authenticatedUser

        let displayMessages = messages.filter((msg) => {
            return (msg.msg_sender === msg_sender_id && msg.msg_receiver === _id) || (msg.msg_sender === _id && msg.msg_receiver === msg_sender_id)
        });

        console.log("displayMessages "+JSON.stringify(displayMessages))

        return displayMessages.map((message) => (
            <MessageText key={message.msg_id} message={message}/>
        ))
    }

    render(){
        const { classes } = this.props
        const { messages, msg_sender_name } = this.props.user

        return (    
            <Grid container >
                <Grid item xs={12}>
                    <NavBar/>
                </Grid>
                <Grid direction="row" container item className={classes.main}>
                    <Grid container item xs={3} className={classes.allGrid} direction="column" alignItems="left" justifyContent="top">
                        <Grid item className={classes.msgTitle}>
                            All Messages
                        </Grid>
                        <Grid item className={classes.msgTitle}>
                            {this.getMessageHeads()}
                        </Grid>
                    </Grid>
                    
                    <Grid container item xs={7} className={classes.convGrid} direction="row" >
                        {messages.length !== 0 && msg_sender_name !== "" &&
                        <Grid container item direction="row" className={classes.head}>                        
                            <Grid item xs={1} className={classes.ava}>
                                <Avatar src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                            </Grid>
                            <Grid item xs={10} className={classes.name}>
                                {msg_sender_name}
                            </Grid>
                        </Grid>}
                        <Grid container item xs={12} className={classes.convInnerGrid}>
                            {messages.length === 0 ? 
                                <Grid container item direction="column" alignItems="center" justifyContent="center">
                                    <Grid item className={classes.welcome} >
                                        Welcome to Messages
                                    </Grid>
                                    <Grid item>
                                        When an employer contacts you,
                                    </Grid>
                                    <Grid item>
                                        you will see messages here.
                                    </Grid>
                                </Grid>
                                :
                                msg_sender_name === "" ?
                                <Grid container item direction="column" alignItems="center" justifyContent="center">
                                    <Grid item className={classes.welcome} >
                                        Welcome to Messages
                                    </Grid>
                                    <Grid item>
                                        Select a name, to view messages
                                    </Grid>
                                </Grid>
                                :
                                <Grid container item direction="column">
                                    {this.displayMessages()}
                                </Grid>
                            }
                        </Grid>
                        {messages.length !== 0 && msg_sender_name !== "" &&
                        <Grid container item direction="row" spacing={1}>                        
                            <Grid item xs={11}>
                                <InputBase
                                    id="chatBox"
                                    name="chatBox"
                                    className={classes.chatBox}
                                    placeholder="Type a message"
                                    value={this.state.chatBox}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <Button className={classes.button} onClick={this.handleAddChatMessage}>
                                    Send
                                </Button>
                            </Grid>
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
})

export default connect(mapStateToProps, {getChatMessages, addChatMessage} )(withStyles(styles)(conversations))
