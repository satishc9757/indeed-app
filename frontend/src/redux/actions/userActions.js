import { GET_MESSAGES, POST_MESSAGE, GET_SALARIES_BY_TITLE_LOC} from '../types'
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

export const getSalariesByJobTitleLocation = (searchDetails, history) => (dispatch) => {
    axios.get(`jobseeker/getSalariesByJobTitleLocation?job_title=${searchDetails.job_title}&job_location=${searchDetails.job_location}`)
        .then(res => {

            let result = {
                ...res.data,
                ...searchDetails
            }
            console.log("in getSalariesByJobTitleLocation userAction" + JSON.stringify(result))

            dispatch({
                type : GET_SALARIES_BY_TITLE_LOC,
                payload : result
            })

            // history.push('/salaryResults')
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}