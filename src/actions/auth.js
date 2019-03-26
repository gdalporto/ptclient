import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

import {getUserData} from './core-actions';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const LOG_TREATMENT_STATE = 'LOG_TREATMENT_STATE';
export const logTreatmentState = (user) => ({
    type: LOG_TREATMENT_STATE,
    user
});




export const logTreatment = (treatmentObject) => (dispatch)=> {

    let treatmentProfile = {
        date: treatmentObject.date,
        treatment: treatmentObject.treatment,
        status: treatmentObject.status,
        currentUser: treatmentObject.currentUser
    }
    console.log("INSIDE LOGTREATMENT. TREATMENTPROFILE IS", treatmentProfile);

        let user = treatmentProfile.currentUser;
        console.log("INSIDE REDUCER USER IS". user);
        let newLog={};
        let dateList = {};

        // interate over each log date to create a master date list.
        user.log.forEach(log => {
            dateList = {...dateList, ...log}
        })
        let flatDateList = Object.keys(dateList);
        let dateKey = [treatmentProfile.date]
        flatDateList.forEach(date=>{
            if(date!==dateKey[0]){
                dateKey = [...dateKey, date]
            }
        })
        dateKey.sort();

        // iterate over each date log to process new set of logs
        dateKey.forEach((date,index)=>{

            // if dateKey doesn't match action date, then copy the old logs into the new logs
            const logitem = user.log[index];
            if(treatmentProfile.date !== date){
                newLog={...newLog, ...logitem}
                console.log("INSIDE FOREACH, DATE NOT MATCHED, NEWLOG IS", newLog)
            }

            // if datekey does match action date, 
            else if(treatmentProfile.date === date) {
                let actionLog={};

                //if no existing logs for this date, then append new action and status 
                if(!logitem){
                    actionLog={[treatmentProfile.date]:{[treatmentProfile.treatment]: treatmentProfile.status}};
                    newLog={...newLog, ...actionLog}
                    console.log("INSIDE FOREACH, DATE MATCHED, NO EXISTING, NEWLOG IS", newLog);
                }

                // if there are existing treatments, then iterate over each entry, appending new entry. 
                else {
                    const newActionEntry = {[treatmentProfile.treatment]: treatmentProfile.status};
                    let logList={};
                    let logEntry={}
                    let logDate=Object.keys(logitem);
                    let logKeys = Object.keys(logitem[logDate]);
                    let treatment=treatmentProfile.treatment
                    let totalLogKeys = [treatment];
                    logKeys.forEach(key=>{
                        if(key!==totalLogKeys[0]){
                            totalLogKeys = [...totalLogKeys, key]
                        }
                    })
                    totalLogKeys.forEach((key)=>{
                        const logItem = user.log[index];
                        const dayLogs=logItem[logDate];
                        const keyStatus=dayLogs[key];
                        logEntry = {[key]:keyStatus};
                        logList={...logList, ...logEntry, ...newActionEntry}

                    })
                    actionLog={[treatmentProfile.date]:logList}
                    newLog={...newLog, ...actionLog};
                    console.log("INSIDE FOREACH, DATE MATCHED, EXISTING, NEWLOG IS", newLog);
                }
            }
        })
        console.log("NEWLOG AFTER DATEKEY ITERATION", newLog);
        let newLogArray =Object.keys(newLog).map(key => {
            return { [key]:newLog[key] }
        })

        user = {
            ...user, 
            log: newLogArray
        }
        console.log("INSIDE LOGTREATMENT. USER IS", user);

        console.log("DISPATCHING NEWAUTHTOKENPAYLOAD");
        // update auth token with updated log payload
        dispatch(newAuthTokenPayload(user));

        console.log("DISPATCHING LOGTREATMENTSTATE")
        // update state with new log
        dispatch(logTreatmentState(user));


        console.log("DISPATCHING DB CALL TO UPDATELOG")
        // update user log in database
        fetch(`${API_BASE_URL}/user/updatelog`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(jsonRes => dispatch(getUserData()))
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
            });
        
};





// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    console.log("Inside StoreAuthInfo authtoken", authToken);
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};

export const NEW_AUTH_TOKEN_PAYLOAD = 'NEW_AUTH_TOKEN_PAYLOAD';
export const newAuthTokenPayload = (payload) => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
//    const payload = getState().auth.currentUser;
    console.log("PAYLOAD", JSON.stringify(payload));
    return fetch(`${API_BASE_URL}/auth/refresh/newpayload`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({
            id:payload.id,
            username: payload.username,
            condition: payload.condition,
            treatments: payload.treatments,
            log: payload.log
        })
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => {
            console.log("NEW AUTH TOKEN IS", authToken)
            storeAuthInfo(authToken, dispatch)
        })
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};
