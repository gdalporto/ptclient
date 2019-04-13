import React from 'react';
import {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import {Dashboard} from './dashboard';


// // create any initial state needed
// const initialState = {}; 

// // here it is possible to pass in any middleware if needed into //configureStore
// const mockStore = configureStore();
// let wrapper;
// let store;
// beforeEach(() => {
//   //creates the store with any initial state or middleware needed  
//   store = mockStore(initialState)
//  })

describe('<Dashboard />', ()=>{

    let user = {
        username: "N@n",
        log: [ 
            {
                "2019-01-15" : {
                    "Leg Lifts" : "complete",
                    "Crunches" : "complete"
                }
            }, 
            {
                "2019-03-13" : {
                    "Crunches" : "complete",
                    "Leg Lifts" : "complete"
                }
            }, 
            {
                "2019-03-25" : {
                    "Shoulder Rolls" : "complete",
                    "Leg Lifts" : "complete"
                }
            }, 
            {
                "2019-03-26" : {
                    "Shoulder Rolls" : "complete",
                    "Leg Lifts" : "complete"
                }
            }, 
            {
                "2019-04-07" : {
                    "Shoulder Rolls" : "complete"
                }
            }, 
            {
                "2019-04-08" : {
                    "Leg Lifts" : "complete",
                    "Shoulder Rolls" : "complete"
                }
            }, 
            {
                "2019-04-09" : {
                    "Leg Lifts" : "incomplete",
                    "Shoulder Rolls" : "complete"
                }
            }, 
            {
                "2019-04-10" : {
                    "Leg Lifts" : "incomplete",
                    "Shoulder Rolls" : "complete"
                }
            }
        ]
    }

    let username = "N@n";
    let treatments = [
        {
            "Leg Lifts" : {
                "id" : 2,
                "description" : "lorem ipsum",
                "video" : "https://www.youtube.com/embed/dHSIerbp-CE",
                "steps" : [ 
                    "Lie on your back, legs straight and together. ", 
                    "Keep your legs straight and lift them all the way up to the ceiling until your butt comes off the floor.", 
                    "Slowly lower your legs back down till they’re just above the floor. Hold for a moment.", 
                    "Raise your legs back up. Repeat."
                ],
                "picture" : "../images/legLift.jpg"
            }
        },
        {
            "Shoulder Rolls" : {
                "id" : 3,
                "description" : "lorem ipsum.",
                "video" : "https://www.youtube.com/embed/v9hnx_iIhxE",
                "steps" : [ 
                    "Roll your shoulders forward.", 
                    "Slowly make large circles.", 
                    "Reduce to smaller circles.", 
                    "Reverse direction.", 
                    "Repeat 10 times."
                ],
                "picture" : "../images/shoulderRoll.jpg"
            }
        },
        {
            "Crunches" : {
                "id" : 1,
                "description" : "Ab Crunches",
                "video" : "https://www.youtube.com/embed/Xyd_fa5zoEU",
                "steps" : [ 
                    "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.", 
                    "Place your hands behind your head so your thumbs are behind your ears.", 
                    "Don’t lace your fingers together.", 
                    "Hold your elbows out to the sides but rounded slightly in.", 
                    "Tilt your chin slightly, leaving a few inches of space between your chin and your chest.", 
                    "Gently pull your abdominals inward.", 
                    "Curl up and forward so that your head, neck, and shoulder blades lift off the floor.", 
                    "Hold for a moment at the top of the movement and then lower slowly back down."
                ],
                "picture" : "../images/crunches.jpg"
            }
        }
    ]     
    
    let conditions = [
        {
            "Upper Back" : [ 
                "Shoulder Rolls", 
                "Leg Lifts"
            ]
        },
        {
            "Lower Back" : [ 
                "Crunches", 
                "Leg Lifts", 
                "Shoulder Rolls"
            ]
        },
        {
            "Shoulder" : [ 
                "Shoulder Rolls"
            ]
        }
    ]

    let condition = "Upper Back"

    it('should load without crashing', ()=>{
        shallow(<Dashboard user={user} username={username} treatments={treatments} conditions={conditions} condition={condition} />)
    });

    // it('should update treatment status', ()=>{
    //     // render
    //     // simulate click on MarkComplete (requires mount)
    //     // check that dispatch was called.


    //     const dispatch = jest.fn();
    //     const treatmentObject = {
    //         currentUser:"N@n",
    //         treatment:"Shoulder Rolls",                            
    //         date: "04-10-2019",
    //         status:"complete",
    //         dateExists: false
    //     }
    //     const wrapper = mount(<Provider store={store}> <Dashboard /> </Provider>)
    //     // const wrapper = shallow(<Dashboard dispatch={dispatch} />);
    //     wrapper.find('button[name="markComplete]').simulate('click');
    //     expect(dispatch).toHaveBeenCalledWith(logTreatment())
    // })
})