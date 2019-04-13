import reducer from './protected-data.js';
import { 
    fetchProtectedDataSuccess, FETCH_PROTECTED_DATA_SUCCESS, 
    fetchProtectedDataError,FETCH_PROTECTED_DATA_ERROR
    } from '../actions/protected-data.js';
import {API_BASE_URL} from '../config';


// TESTED THE MORE COMPLEX AND IMPORTANT OPERATIONS.
// IGNORED TESTING SOME ELEMENTS FOR TIME: 
    // SAVE_LOADING_CORE_DATA, SAVE_LOADING_USER, 
    // UPDATE_TREATMENT_STATE, UPDATE_CONDITION)_STATE

describe('PROTECTED_DATA REDUCER', ()=>{
    it('should fetch protected data', ()=>{
        let data="true";
        let state;
        state = reducer(state, fetchProtectedDataSuccess(data));
        expect(state).toEqual({
            data: "true",
            error: null
        })
    })
})


