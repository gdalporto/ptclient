import * as actions from '../actions/core-actions';


const initialState =  {
    user: [],
    treatments: {},
    conditions: [],
    loadingData: true,
    loadingUser: true
}
    
export const reducer = (state=initialState, action) => {

    // if(action.type===actions.CHANGE_AUTH_STATUS) {
    //     console.log("INSIDE CHANGE_AUTH_STATUS REDUCER");
    //     console.log("ACTION", action)
    //     return Object.assign({},state,{
    //         authStatus: action.authStatus,
    //         activeUser: action.activeUser
    //     })

    // }
    if(action.type===actions.SAVE_USER_TO_STATE){
        return Object.assign({},state,{
            user: [{
                id: action.id,
                username: action.username,
                condition: action.condition,
                treatments: action.treatments,
                log: action.log
            }]
        })
    }

    else if (action.type===actions.CLEAR_USER){
        return Object.assign({}, state, {
            users: []
        })
    }

    else if(action.type===actions.SAVE_LOADING_CORE_DATA) {
        return Object.assign({},state,{
            loadingData: action.loadingData.loadingData
        })
    }
    else if(action.type===actions.SAVE_LOADING_USER) {
        return Object.assign({},state,{
            loadingUser: action.loadingUser.loadingUser
        })
    }
    else if(action.type===actions.UPDATE_TREATMENT_STATE) {
        return Object.assign({},state,{
            treatments: action.treatments
        })
    }
    else if(action.type===actions.UPDATE_CONDITION_STATE) {
        return Object.assign({},state,{
            conditions: action.conditions
        })
    }



    return state;
}
    


