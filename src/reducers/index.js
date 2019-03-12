import * as actions from '../actions';


const initialState =  {
    users: [
        {
            id: 0,
            userName: "jimbob",
            password: "Hello12345",
            condition: "Lower Back",
            treatments: ["Crunches", "Leg Lifts"],
            log: [
                {date: new Date(2019, 1, 6),
                "Crunches": "complete"
                },
                {date: new Date(2019, 2, 6),
                "Crunches": "incomplete",
                "Leg Lifts": "complete"
                },
                {date: new Date(2019, 2, 12),
                    "Crunches": "complete"
                    },
                ]
        },
        {
            id: 1,
            userName: "suelynn",
            password: "Hello12345",
            condition: "Upper Back",
            treatments: ["Shoulder Rolls", "Leg Lifts"],
            log: [
                {date: new Date(2019, 2, 5),
                "Shoulder Rolls": "complete"
                },
                {date: new Date(2019, 2, 6),
                "Shoulder Rolls": "incomplete",
                "Leg Lifts": "complete"
                }
            ]
        },
        {
            id: 2,
            userName: "blob",
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
                video: "https://www.youtube.com",
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
        {"Lower Back": ["Crunches", "Leg Lifts"]},
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
                userName: action.userName,
                password: action.password,
                condition: action.condition
            }]
        })
    }
    else if(action.type===actions.CHANGE_AUTH_STATUS) {
        console.log("INSIDE CHANGE_AUTH_STATUS REDUCER");
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
                return {
                    ...user, 
                    log: [
                        ...user.log,
                        {
                            date: action.date,
                            [action.treatment]:action.status                            
                        }
                    ]
                }
            }
        })
        return Object.assign({},state,{
            users
        })
    }

    return state;
}
    

// {
//     id: 0,
//     userName: "jimbob",
//     password: "Hello12345",
//     condition: "Lower Back",
//     treatments: ["Crunches", "Leg Lifts"],
//     log: {
//         "2019-01-15": {
//          completed: ["Leg Lifts", "Shoulder Rolls"],
//          incompleted: []
//      }



// [
//             {Crunches: "complete"},
//             {"Leg Lifts": "complete"}
//             ],

    
//         "2019-01-28": [
//             {Crunches: "complete"},
//             {"Leg Lifts": ""}
//             ]
            
//     }
// },