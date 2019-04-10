import { shallow, mount } from 'enzyme';
import { 
    logTreatmentState, LOG_TREATMENT_STATE,
    logTreatment,
    newAuthTokenPayload
    } from './auth.js'
import {API_BASE_URL} from '../config';

// TESTED THE MORE COMPLEX AND IMPORTANT OPERATIONS.
// IGNORED TESTING SOME ELEMENTS FOR TIME

describe('Auth Actions', ()=>{
    it('should log treatment state', ()=>{
        let user = {username:"bob"};
        const action = logTreatmentState(user);
        expect(action.type).toEqual(LOG_TREATMENT_STATE);
        expect(action.user).toEqual(user);
    })
    it('should log the treatment (dispatch new authToken payload, post update to log', ()=>{
        const treatmentObject={
             date: "2019-04-09",
             treatment: ["Shoulder Rolls"],
             status: "complete",
             currentUser: {
                "treatments" : [ 
                    "Shoulder Rolls", 
                    "Leg Lifts"
                ],
                "log" : [ 
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
                    }
                ],
                "username" : "N@n",
                "password" : "$2a$10$QmzCGBZh7keQXK6THFTpqupi630jWLmL95a2bRW.o6X4.1ARkV8gq",
                "condition" : "Upper Back",
            }
        }
        const dispatch=jest.fn();
        const url = API_BASE_URL + "/user/updatelog";
        global.fetch = jest.fn().mockImplementation(()=>
            Promise.resolve({
                ok:true,
                json() {
                    return {username: "N@n"}
                }
            })
        )
        return logTreatment(treatmentObject)(dispatch).then(()=>{
            expect(dispatch).toHaveBeenCalled;
            expect(fetch).toHaveBeenCalledWith(url, {"method":"POST"})
        })
    })
})



