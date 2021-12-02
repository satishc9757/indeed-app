import { GET_MESSAGES, POST_MESSAGE } from '../types'
import axios from 'axios'

export const getChatMessages = (id) => (dispatch) => {
    axios.get(`chats/getChatMessage?id=${id}`)
        .then(res => {
            console.log("in getChatMessage userAction")

            dispatch({
                type : GET_MESSAGES,
                payload : res.data
            })
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}

export const addChatMessage = (msgDetails) => (dispatch) => {
    axios.post(`chats/addChatMessage`, msgDetails)
        .then(res => {
            console.log("in addChatMessage userAction")

            dispatch({
                type : POST_MESSAGE,
                payload : msgDetails
            })
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}