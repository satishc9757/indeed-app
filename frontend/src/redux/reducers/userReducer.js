import { } from '../types'

const initialState = {
    authenticatedUser : {},
    authenticated : false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        default : 
            return {
                ...state
            }
    }
}