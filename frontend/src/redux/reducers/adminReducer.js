import { SET_AUTHENTICATED_ADMIN, GET_ALL_REVIEWS, MARK_REVIEW_APPROPRIATE, MARK_REVIEW_INAPPROPRIATE,GET_ALL_PHOTOS, MARK_PHOTO_APPROPRIATE, MARK_PHOTO_INAPPROPRIATE} from '../types'

const initialState = {
    authenticatedAdmin : {},
    authenticated : false,
    reviews : {},
    photos : {},
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){

        case SET_AUTHENTICATED_ADMIN:
            return {
                ...state,
                authenticatedAdmin : action.payload,
                authenticated : true
            }

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

        case GET_ALL_PHOTOS:
            return {
                ...state,
                photos : action.payload.photos
            }

        case MARK_PHOTO_APPROPRIATE:
            let index1 = state.photos.findIndex(
                (photo) => photo._id === action.payload
                )
            state.photos[index1].inappropriate = 0
            return {
                ...state,
            }

        case MARK_PHOTO_INAPPROPRIATE:

            let ind1 = state.photos.findIndex(
                (photo) => photo._id === action.payload
                )
            state.photos[ind1].inappropriate = 1
            return {
                ...state,
            }

        default : 
            return {
                ...state
            }
    }
}