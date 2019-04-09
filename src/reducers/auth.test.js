import reducer from './auth.js';
import { 
    setAuthToken, SET_AUTH_TOKEN,
    clearAuth, CLEAR_AUTH,
    authRequest, AUTH_REQUEST,
    authSucess, AUTH_SUCCESS,
    authError, AUTH_ERROR,
    logTreatmentState, LOG_TREATMENT_STATE,
    logTreatment
    } from '../actions/auth.js'

// TESTED THE MORE COMPLEX AND IMPORTANT OPERATIONS.
// IGNORED TESTING SOME ELEMENTS FOR TIME.

describe('AUTH REDUCER', ()=>{
    it('should SET_AUTH_TOKEN', ()=>{
        let authToken = "SOMECODEDAUTHTOKEN"        
        let state;
        state=reducer(state, setAuthToken(authToken));
        expect(state).toEqual({
            authToken: "SOMECODEDAUTHTOKEN", 
            currentUser: {
                username: null,
                condition: null,
                treatments: [],
                log: []
            },
        })
    })
    it('should CLEAR_AUTH', ()=>{
        let authToken = "SOMECODEDAUTHTOKEN"        
        let state;
        state=reducer(state, setAuthToken(authToken));
        state=reducer(state, clearAuth());
        expect(state).toEqual({
            authToken: null, // authToken !== null does not mean it has been validated
            currentUser: {
                username: null,
                condition: null,
                treatments: [],
                log: []
            },
        })

    })

    it('should LOG_TREATMENT_STATE', ()=>{
        let user = {                
            id: 1,
            username: "N@n",
            condition: "Upper Back",
            treatments: ["Shoulder Rolls", "Leg Lifts"],
            log: ["SOME LOG DATE"]
        }
        let state;
        state=reducer(state,logTreatmentState(user));
        expect(state).toEqual({
            authToken: null, // authToken !== null does not mean it has been validated
            currentUser: {                
                id: 1,
                username: "N@n",
                condition: "Upper Back",
                treatments: ["Shoulder Rolls", "Leg Lifts"],
                log: ["SOME LOG DATE"]
            },
        })
    })

})