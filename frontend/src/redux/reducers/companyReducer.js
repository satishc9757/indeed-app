import { } from '../types'

const initialState = {
    selectedCompany : {
        comp_name : 'Google',
        photos : [
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : false
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : false
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
            { 
                url : "https://www.indeed.com/cmp/_s/photos/6e7b40121fbb5e2f-l-1bqthbi6fb86l8i2",
                appropriate : true
            },
        ]
    }
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