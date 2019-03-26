
import jwtDecode from 'jwt-decode';
import {API_BASE_URL} from '../config';
import {loadAuthToken} from '../local-storage'



export const CHANGE_AUTH_STATUS = 'CHANGE_AUTH_STATUS';
export const changeAuthStatus = (user) => ({
    type: CHANGE_AUTH_STATUS,
    authStatus: user.authStatus,
    activeUser: user.id
});

export const SAVE_USER_TO_STATE = 'SAVE_USER_TO_STATE';
export const saveUserToState = (userData) => ({
    type: SAVE_USER_TO_STATE,
    id: userData.user.id,
    username: userData.user.username,
    condition: userData.user.condition,
    treatments: userData.user.treatments,
    log: userData.user.log
})

export const CLEAR_USER = 'CLEAR_USER';
export const clearUser = () => ({
    type: CLEAR_USER,
})


export const SAVE_LOADING_CORE_DATA='SAVE_LOADING_CORE_DATA';
export const saveLoadingCoreData=(loadingData)=>({
    type: SAVE_LOADING_CORE_DATA,
    loadingData
})
export const SAVE_LOADING_USER='SAVE_LOADING_USER';
export const saveLoadingUser=(loadingUser)=>({
    type: SAVE_LOADING_USER,
    loadingUser
})

export const UPDATE_TREATMENT_STATE='UPDATE_TREATMENT_STATE'
export const updateTreatmentState=(treatmentData)=>({
    type: UPDATE_TREATMENT_STATE,
    treatments: treatmentData.treatmentslist
})

export const UPDATE_CONDITION_STATE='UPDATE_CONDITION_STATE'
export const updateConditionState=(conditionData)=>({
    type: UPDATE_CONDITION_STATE,
    conditions: conditionData.conditionslist
})


export const getCoreData = () => (dispatch) => {
    let stat;
    dispatch(saveLoadingCoreData({"loadingData":true}))
    return fetch(`${API_BASE_URL}/treatmentdata`, {
        method: 'GET',
    })
    .then(response => {
        return response.json();
    }) 
    .then(jsonData =>{
        dispatch(updateTreatmentState(jsonData))
    })
    .then(()=>{
        return fetch(`${API_BASE_URL}/conditiondata`, {
            method: 'GET',
        })
        .then(response => {
            return response.json();
        }) 
        .then(jsonData =>{
            dispatch(updateConditionState(jsonData))
        })
    })
    .then(()=>{
        console.log("DONE LOADING CORE DATA");
        dispatch(saveLoadingCoreData({"loadingData":false}))
    })
    .catch(err => {
        console.error(err);
        stat = "unauthenticated";
        console.log("STAT IS", stat);
        dispatch(saveLoadingCoreData({"loadingData":false}))
        return stat;      
    })
}



export const getUserData = () => (dispatch) => {
    let stat;
    dispatch(saveLoadingUser({"loadingUser":true}))
    let authToken = loadAuthToken();
    const decodedToken = jwtDecode(authToken);
    console.log({decodedToken});
   
    fetch(`${API_BASE_URL}/authcheck`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${authToken}`,
        }
    })
    .then(response => {
        // parses response to JSON
        return response.json();
    }) 
    .then(jsonData =>{
        stat=jsonData.status;
        if(stat==="authenticated"){
            console.log("FETCHING USER");
            fetch(`${API_BASE_URL}/protected/user`, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${authToken}`,
                    id: decodedToken.user.id,
                }
            })
            .then(response => {
                return response.json()
            })
            .then(jsonData=>{
                console.log("USER FETCHED. JSON DATA TO PASS TO SAVEUSERTOSTATE", jsonData);
                dispatch(saveUserToState(jsonData))
            })
            .then(()=>{
                dispatch(saveLoadingUser({"loadingUser":false}))
            })
            .catch(err=>{
                console.error(err);
                stat = "unauthenticated";
                console.log("ERROR, STAT IS", stat);
                dispatch(saveLoadingUser({"loadingUser":false}))
                return stat;              
            })
        }
    })
    .catch(err => {
        console.error(err);
        stat = "unauthenticated";
        console.log("ERROR STAT IS", stat);
        dispatch(saveLoadingUser({"loadingUser":false}))
        return stat;      
    })

}


export const CHANGE_ACTIVE_USER = 'CHANGE_ACTIVE_USER';
export const changeActiveUser = (user) => ({
    type: CHANGE_ACTIVE_USER,
    username: user.username,
});








