import {reducer} from './core-reducers.js';
import { 
    clearUser, CLEAR_USER,
    changeAuthStatus, CHANGE_AUTH_STATUS,
    saveUserToState, SAVE_USER_TO_STATE,
    saveLoadingCoreData, SAVE_LOADING_CORE_DATA,
    saveLoadingUser, SAVE_LOADING_USER,
    updateTreatmentState, UPDATE_TREATMENT_STATE,
    updateConditionState, UPDATE_CONDITION_STATE,
    getCoreData,
    getUserData,
    changeActiveUser, CHANGE_ACTIVE_USER
    } from '../actions/core-actions.js'

// TESTED THE MORE COMPLEX AND IMPORTANT OPERATIONS.
// IGNORED TESTING SOME ELEMENTS FOR TIME: 
    // SAVE_LOADING_CORE_DATA, SAVE_LOADING_USER, 
    // UPDATE_TREATMENT_STATE, UPDATE_CONDITION)_STATE

describe('core-reducer', ()=>{

    it('Should set the initial state when nothing is passed in', () => {
        const state = reducer(undefined, {type: '__UNKNOWN'});
        expect(state).toEqual({
                user: [],
                treatments: {},
                conditions: [],
                loadingData: true,
                loadingUser: true
            });
    });
    
    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = reducer(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });
    
    it('should SAVE_USER_TO_STATE', ()=>{

        let user = {
                id: 1,
                username: "N@n",
                condition: "Upper Back",
                treatments: ["Shoulder Rolls", "Leg Lifts"],
                log: []
            };
        let userData = {
            user: user,
        }
        let state;
        state = reducer(state, saveUserToState(userData));
        expect(state).toEqual({
            user: [
                {
                    id: 1,
                    username: "N@n",
                    condition: "Upper Back",
                    treatments: ["Shoulder Rolls", "Leg Lifts"],
                    log: []
                }
            ],
            treatments: {},
            conditions: [],
            loadingData: true,
            loadingUser: true

        })
    })

    it('should CLEAR_USER', ()=>{
        let state = {            
            users: [
                {
                    id: 1,
                    username: "N@n",
                    condition: "Upper Back",
                    treatments: ["Shoulder Rolls", "Leg Lifts"],
                    log: []
                }
            ],
            treatments: {},
            conditions: [],
            loadingData: true,
            loadingUser: true
        }

        state = reducer(state, clearUser());
        expect(state).toEqual({                     
                users: [],
                treatments: {},
                conditions: [],
                loadingData: true,
                loadingUser: true
        })

    })


})

