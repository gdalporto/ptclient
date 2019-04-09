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
    } from './core-actions.js'
import {API_BASE_URL} from '../config';
