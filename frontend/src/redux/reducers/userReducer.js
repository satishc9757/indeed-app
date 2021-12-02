import { GET_MESSAGES, SET_MESSAGE_SENDER_ID, SET_MESSAGE_SENDER_NAME, POST_MESSAGE } from '../types'

const initialState = {
    authenticatedUser : {
        _id : 1,
        seeker_name : "Rick"
    },
    authenticated : false,
    messages : [],
    msg_sender_id : '',
    msg_sender_name : ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case GET_MESSAGES:
            return {
                ...state,
                messages : action.payload
            }  

        case SET_MESSAGE_SENDER_ID:
            return {
                ...state,
                msg_sender_id : action.payload
            }

        case SET_MESSAGE_SENDER_NAME:
            return {
                ...state,
                msg_sender_name : action.payload
            }

        case POST_MESSAGE:
            return {
                ...state,
                messages : [
                    ...state.messages,
                    action.payload
                ]
            }

        default : 
            return {
                ...state
            }
    }
}