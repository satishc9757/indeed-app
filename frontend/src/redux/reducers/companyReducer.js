import {SET_AUTHENTICATED_EMPLOYER , SET_SELECTED_COMPANY} from '../types'

const initialState = {

    selectedCompany : {},
    authenticatedEmployer: {
        user_id : 12,
        email : 'user5@gmail.com',
        user_type : "employer"
    },
    authenticated : false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case SET_AUTHENTICATED_EMPLOYER :
            return {
                ...state,
                authenticatedEmployer : action.payload,
                authenticated : true
            }

        case SET_SELECTED_COMPANY :
            return {
                ...state,
                selectedCompany : action.payload,
            }

        default :
            return {
                ...state
            }
    }
}