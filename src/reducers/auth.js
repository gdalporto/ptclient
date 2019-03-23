import {
    SET_AUTH_TOKEN,
    CLEAR_AUTH,
    AUTH_REQUEST,
    AUTH_SUCCESS,
    AUTH_ERROR
} from '../actions/auth';

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentUser: null,
    loading: false,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === CLEAR_AUTH) {
        return Object.assign({}, state, {
            authToken: null,
            currentUser: null
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

    // else if(action.type===actions.LOG_TREATMENT){
    //     const user = state.user.map((user,index) => {
    //         let newLog={};
    //         let dateList = {};

    //         // interate over each log date to create a master date list.
    //         user.log.forEach(log => {
    //             dateList = {...dateList, ...log}
    //         })
    //         let flatDateList = Object.keys(dateList);
    //         let dateKey = [action.date]
    //         flatDateList.forEach(date=>{
    //             if(date!==dateKey[0]){
    //                 dateKey = [...dateKey, date]
    //             }
    //         })
    //         dateKey.sort();

    //         // iterate over each date log to process new set of logs
    //         dateKey.forEach((date,index)=>{

    //             // if dateKey doesn't match action date, then copy the old logs into the new logs
    //             const logitem = user.log[index];
    //             if(action.date !== date){
    //                 newLog={...newLog, ...logitem}
    //                 console.log("INSIDE FOREACH, DATE NOT MATCHED, NEWLOG IS", newLog)
    //             }

    //             // if datekey does match action date, 
    //             else if(action.date === date) {
    //                 let actionLog={};

    //                 //if no existing logs for this date, then append new action and status 
    //                 if(!logitem){
    //                     actionLog={[action.date]:{[action.treatment]: action.status}};
    //                     newLog={...newLog, ...actionLog}
    //                     console.log("INSIDE FOREACH, DATE MATCHED, NO EXISTING, NEWLOG IS", newLog);
    //                 }

    //                 // if there are existing treatments, then iterate over each entry, appending new entry. 
    //                 else {
    //                     const newActionEntry = {[action.treatment]: action.status};
    //                     let logList={};
    //                     let logEntry={}
    //                     let logDate=Object.keys(logitem);
    //                     let logKeys = Object.keys(logitem[logDate]);
    //                     let treatment=action.treatment
    //                     let totalLogKeys = [treatment];
    //                     logKeys.forEach(key=>{
    //                         if(key!==totalLogKeys[0]){
    //                             totalLogKeys = [...totalLogKeys, key]
    //                         }
    //                     })
    //                     totalLogKeys.forEach((key)=>{
    //                         const logItem = user.log[index];
    //                         const dayLogs=logItem[logDate];
    //                         const keyStatus=dayLogs[key];
    //                         logEntry = {[key]:keyStatus};
    //                         logList={...logList, ...logEntry, ...newActionEntry}

    //                     })
    //                     actionLog={[action.date]:logList}
    //                     newLog={...newLog, ...actionLog};
    //                     console.log("INSIDE FOREACH, DATE MATCHED, EXISTING, NEWLOG IS", newLog);
    //                 }
    //             }
    //         })
    //         console.log("NEWLOG AFTER DATEKEY ITERATION", newLog);
    //         let newLogArray =Object.keys(newLog).map(key => {
    //             return { [key]:newLog[key] }
    //         })
    //         return {
    //             ...user, 
    //             log: newLogArray
                
    //         }
        

    //     })
    //     console.log("NEW USERS RECORD IS", user);
    //     return Object.assign({},state,{
    //         user
    //     })
    // }



    return state;
}
