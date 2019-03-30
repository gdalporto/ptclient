import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR,
    LOG_TREATMENT_STATE
} from '../actions/auth';

import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../actions/utils';


const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: {
        username: null,
        condition: null,
        treatments: [],
        log: []
    },
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null, // authToken !== null does not mean it has been validated
            currentUser: {
                username: null,
                condition: null,
                treatments: [],
                log: []
            }
        });
    } else if (action.type === AUTH_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === AUTH_SUCCESS) {
        return Object.assign({}, state, {
            loading: false,
            currentUser: action.currentUser
        });
    } else if (action.type === AUTH_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } 
    else if(action.type===LOG_TREATMENT_STATE){

        // Update user log in state
        let user = action.user;
        console.log("NEW USERS RECORD IS", user);
        return Object.assign({},state,{
            currentUser: user
        })
    }

    return state;
}
