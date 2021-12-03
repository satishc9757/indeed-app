import { GET_ALL_REVIEWS, MARK_REVIEW_APPROPRIATE, MARK_REVIEW_INAPPROPRIATE} from '../types'

const initialState = {
    authenticated : false,
    reviews : {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){

        case GET_ALL_REVIEWS:
            return {
                ...state,
                reviews : action.payload
            }

        case MARK_REVIEW_APPROPRIATE:
            let index = state.reviews.findIndex(
                (review) => review.review_id === action.payload
                )
            state.reviews[index].inappropriate = 0
            return {
                ...state,
            }

        case MARK_REVIEW_INAPPROPRIATE:

            let ind = state.reviews.findIndex(
                (review) => review.review_id === action.payload
                )
            state.reviews[ind].inappropriate = 1
            return {
                ...state,
            }

        default : 
            return {
                ...state
            }
    }
}