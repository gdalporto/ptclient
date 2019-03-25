import * as actions from '../actions/core-actions';


const initialState =  {
    user: [],
    treatments: {},
    conditions: [],
    // authStatus: "loggedOut",
    // activeUser: 0,
    loadingUser: false
    // users: [
    //     {
    //         id: 0,
    //         username: "jimbob",
    //         password: "Hello12345",
    //         condition: "Lower Back",
    //         treatments: ["Crunches", "Leg Lifts", "Shoulder Rolls"],
    //         log: [{
    //             "2019-01-15": {
    //                 "Leg Lifts": "complete", 
    //                 "Crunches": "incomplete",
    //                 }
    //             },
    //             {"2019-03-14": {
    //                 "Crunches": "complete",
    //                 "Leg Lifts": "incomplete"
    //                 }
    //             }
    //         ]
    //     },
    //     {
    //         id: 1,
    //         username: "suelynn",
    //         password: "Hello12345",
    //         condition: "Upper Back",
    //         treatments: ["Shoulder Rolls", "Leg Lifts"],
    //         log: [{
    //             "2019-01-15": {
    //                 "Leg Lifts": "complete", 
    //                 "Crunches": "incomplete",
    //                 }
    //             },
    //             {"2019-03-13": {
    //                 "Crunches": "complete",
    //                 "Leg Lifts": "incomplete"
    //                 }
    //             }
    //         ]


    //     },
    //     {
    //         id: 2,
    //         username: "blob",
    //         password: "Hello12345",
    //         condition: "Shoulder",
    //         treatments: ["Shoulder Rolls"],
    //         log: []
    //     },

    // ],
    // treatments: 
    //     {
    //         "Crunches": {
    //             id: 1,
    //             description: "Ab Crunches",
    //             video: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    //             steps: [
    //                 "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.",
    //                 "Place your hands behind your head so your thumbs are behind your ears.",
    //                 "Don’t lace your fingers together.",
    //                 "Hold your elbows out to the sides but rounded slightly in.",
    //                 "Tilt your chin slightly, leaving a few inches of space between your chin and your chest.",
    //                 "Gently pull your abdominals inward.",
    //                 "Curl up and forward so that your head, neck, and shoulder blades lift off the floor.",
    //                 "Hold for a moment at the top of the movement and then lower slowly back down."
    //             ],
    //             picture: '../images/crunches.jpg'
    //         },
        
    //         "Leg Lifts": {
    //             id: 2,
    //             description: "lorem ipsum",
    //             video: "https://www.youtube.com/embed/dHSIerbp-CE",
    //             steps: [
    //                 "Lie on your back, legs straight and together. ",
    //                 "Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor.",
    //                 "Slowly lower your legs back down till they’re just above the floor. Hold for a moment.",
    //                 "Raise your legs back up. Repeat."
    //             ],
    //             picture: '../images/legLift.jpg',
    //         },
        
        
    //         "Shoulder Rolls": {
    //             id: 3,
    //             description: "lorem ipsum.",
    //             video: "https://www.youtube.com/embed/v9hnx_iIhxE",
    //             steps: [
    //                 "Roll your shoulders forward.",
    //                 "Slowly make large circles.",
    //                 "Reduce to smaller circles.",
    //                 "Reverse direction.",
    //                 "Repeat 10 times."
    //             ],
    //             picture: '../images/shoulderRoll.jpg'
    //         }
    //     },
    
    // conditions: [
    //     {"Lower Back": ["Crunches", "Leg Lifts", "Shoulder Rolls"]},
    //     {"Upper Back": ["Shoulder Rolls", "Leg Lifts"]},
    //     {"Shoulder": ["Shoulder Rolls"]}
    // ],
    // authStatus: "loggedOut",
    // activeUser: 0
}
    
export const reducer = (state=initialState, action) => {

    if(action.type===actions.CHANGE_AUTH_STATUS) {
        console.log("INSIDE CHANGE_AUTH_STATUS REDUCER");
        console.log("ACTION", action)
        return Object.assign({},state,{
            authStatus: action.authStatus,
            activeUser: action.activeUser
        })

    }
    else if(action.type===actions.SAVE_USER_TO_STATE){
        console.log("inside SAVE_USER_TO_STATE");
        return Object.assign({},state,{
            user: [...state.user,{
                id: action.id,
                username: action.username,
                condition: action.condition,
                treatments: action.treatments,
                log: action.log
            }]
        })
    }

    else if(action.type===actions.SAVE_LOADING_CORE_DATA) {
        console.log("inside SAVE_LOADING_CORE_DATA reducer");
        return Object.assign({},state,{
            loadingData: action.loadingData.loadingData
        })
    }
    else if(action.type===actions.SAVE_LOADING_USER) {
        console.log("inside SAVE_LOADING_USER reducer");
        return Object.assign({},state,{
            loadingUser: action.loadingUser.loadingUser
        })
    }
    else if(action.type===actions.UPDATE_TREATMENT_STATE) {
        console.log("inside UPDATE_TREATMENT_STATE reducer");
        return Object.assign({},state,{
            treatments: action.treatments
        })
    }
    else if(action.type===actions.UPDATE_CONDITION_STATE) {
        console.log("inside UPDATE_CONDITION_STATE reducer");
        return Object.assign({},state,{
            conditions: action.conditions
        })
    }



    return state;
}
    


