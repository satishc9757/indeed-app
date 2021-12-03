import { GET_ALL_REVIEWS, MARK_REVIEW_APPROPRIATE, MARK_REVIEW_INAPPROPRIATE} from '../types'
import axios from 'axios'

export const getAllReviews = () => (dispatch) => {
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios.get(`getAllReviews`)
        .then(res => {
            console.log("in getAllReviews userAction")

            dispatch({
                type : GET_ALL_REVIEWS,
                payload : res.data
            })
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}

export const markReviewAsAppropriate = (review_id) => (dispatch) => {
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios.get(`markReviewAsAppropriate?review_id=${review_id}`)
        .then(res => {
            console.log("in markReviewAsAppropriate userAction")

            dispatch({
                type : MARK_REVIEW_APPROPRIATE,
                payload : review_id
            })
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}

export const markReviewAsInappropriate = (review_id) => (dispatch) => {
    axios.defaults.headers.common.authorization = localStorage.getItem("token");
    axios.get(`markReviewAsInappropriate?review_id=${review_id}`)
        .then(res => {
            console.log("in markReviewAsInappropriate userAction")

            dispatch({
                type : MARK_REVIEW_INAPPROPRIATE,
                payload : review_id
            })
        })
        .catch(err => {
            console.log("error "+ JSON.stringify(err))
        })
}