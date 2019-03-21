import * as actions from '../actions';


const initialState =  {
    users: [
        {
            id: 0,
            username: "jimbob",
            password: "Hello12345",
            condition: "Lower Back",
            treatments: ["Crunches", "Leg Lifts", "Shoulder Rolls"],
            log: [{
                "2019-01-15": {
                    "Leg Lifts": "complete", 
                    "Crunches": "incomplete",
                    }
                },
                {"2019-03-14": {
                    "Crunches": "complete",
                    "Leg Lifts": "incomplete"
                    }
                }
            ]
        },
        {
            id: 1,
            username: "suelynn",
            password: "Hello12345",
            condition: "Upper Back",
            treatments: ["Shoulder Rolls", "Leg Lifts"],
            log: [{
                "2019-01-15": {
                    "Leg Lifts": "complete", 
                    "Crunches": "incomplete",
                    }
                },
                {"2019-03-13": {
                    "Crunches": "complete",
                    "Leg Lifts": "incomplete"
                    }
                }
            ]


        },
        {
            id: 2,
            username: "blob",
            password: "Hello12345",
            condition: "Shoulder",
            treatments: ["Shoulder Rolls"],
            log: []
        },

    ],
    treatments: 
        {
            "Crunches": {
                id: 1,
                description: "Ab Crunches",
                video: "https://www.youtube.com/embed/Xyd_fa5zoEU",
                steps: [
                    "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.",
                    "Place your hands behind your head so your thumbs are behind your ears.",
                    "Don’t lace your fingers together.",
                    "Hold your elbows out to the sides but rounded slightly in.",
                    "Tilt your chin slightly, leaving a few inches of space between your chin and your chest.",
                    "Gently pull your abdominals inward.",
                    "Curl up and forward so that your head, neck, and shoulder blades lift off the floor.",
                    "Hold for a moment at the top of the movement and then lower slowly back down."
                ],
                picture: '../images/crunches.jpg'
            },
        
            "Leg Lifts": {
                id: 2,
                description: "lorem ipsum",
                video: "https://www.youtube.com/embed/dHSIerbp-CE",
                steps: [
                    "Lie on your back, legs straight and together. ",
                    "Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor.",
                    "Slowly lower your legs back down till they’re just above the floor. Hold for a moment.",
                    "Raise your legs back up. Repeat."
                ],
                picture: '../images/legLift.jpg',
            },
        
        
            "Shoulder Rolls": {
                id: 3,
                description: "lorem ipsum.",
                video: "https://www.youtube.com/embed/v9hnx_iIhxE",
                steps: [
                    "Roll your shoulders forward.",
                    "Slowly make large circles.",
                    "Reduce to smaller circles.",
                    "Reverse direction.",
                    "Repeat 10 times."
                ],
                picture: '../images/shoulderRoll.jpg'
            }
        },
    
    conditions: [
        {"Lower Back": ["Crunches", "Leg Lifts", "Shoulder Rolls"]},
        {"Upper Back": ["Shoulder Rolls", "Leg Lifts"]},
        {"Shoulder": ["Shoulder Rolls"]}
    ],
    authStatus: "loggedOut",
    activeUser: 0
}
    
export const reducer = (state=initialState, action) => {
    if(action.type===actions.ADD_USER) {
        console.log("INSIDE ADD_USER REDUCER");
        return Object.assign({},state,{
            users:[...state.users,{
                id: action.id,
                username: action.username,
                password: action.password,
                condition: action.condition,
                log: []
            }]
        })
    }

    else if(action.type===actions.CHANGE_AUTH_STATUS) {
        console.log("INSIDE CHANGE_AUTH_STATUS REDUCER");
        console.log("ACTION", action)
        return Object.assign({},state,{
            authStatus: action.authStatus,
            activeUser: action.activeUser
        })

    }
    else if(action.type===actions.LOG_TREATMENT){
        const users = state.users.map((user,index) => {
            if(index!==action.activeUser){
                return user
            }
            else {
                let newLog={};
                let dateList = {};

                // interate over each log date to create a master date list.
                user.log.forEach(log => {
                    dateList = {...dateList, ...log}
                })
                let flatDateList = Object.keys(dateList);
                let dateKey = [action.date]
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
                    if(action.date !== date){
                        newLog={...newLog, ...logitem}
                        console.log("INSIDE FOREACH, DATE NOT MATCHED, NEWLOG IS", newLog)
                    }

                    // if datekey does match action date, 
                    else if(action.date === date) {
                        let actionLog={};

                        //if no existing logs for this date, then append new action and status 
                        if(!logitem){
                            actionLog={[action.date]:{[action.treatment]: action.status}};
                            newLog={...newLog, ...actionLog}
                            console.log("INSIDE FOREACH, DATE MATCHED, NO EXISTING, NEWLOG IS", newLog);
                        }

                        // if there are existing treatments, then iterate over each entry, appending new entry. 
                        else {
                            const newActionEntry = {[action.treatment]: action.status};
                            let logList={};
                            let logEntry={}
                            let logDate=Object.keys(logitem);
                            let logKeys = Object.keys(logitem[logDate]);
                            let treatment=action.treatment
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
                            actionLog={[action.date]:logList}
                            newLog={...newLog, ...actionLog};
                            console.log("INSIDE FOREACH, DATE MATCHED, EXISTING, NEWLOG IS", newLog);
                        }
                    }
                })
                console.log("NEWLOG AFTER DATEKEY ITERATION", newLog);
                let newLogArray =Object.keys(newLog).map(key => {
                    return { [key]:newLog[key] }
                })
                return {
                    ...user, 
                    log: newLogArray
                    
                }
            }

        })
        console.log("NEW USERS RECORD IS", users);
        return Object.assign({},state,{
            users
        })
    }

    return state;
}
    


