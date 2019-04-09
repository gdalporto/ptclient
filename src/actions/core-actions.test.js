import { shallow, mount } from 'enzyme';
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



describe('core actions testing', ()=>{
    it('should clear user', ()=>{
        const action=clearUser();
        expect(action.type).toEqual(CLEAR_USER);
    });

    it('loadCoreData should get treatments, conditions, update both.', ()=>{
        const treatmenturl = API_BASE_URL + "/treatmentdata";
        const conditionurl = API_BASE_URL + "/conditiondata";
        const dispatch=jest.fn();
        const saveLoadingCoreDataInput = {"loadingData":true}
        const saveLoadingCoreDataInput2 = {"loadingData":false}
        const treatmentArray = [
            { "treatment" : "Shoulder Rolls"},
            { "treatment" : "Leg Lifts"}   
        ]
        const conditionArray = [
            { "condition" : "Upper Back"},
            { "condition" : "Lower Back"}   
        ]
        global.fetch = jest.fn().mockImplementation(()=>
            Promise.resolve({
                ok:true,
                json() {
                    return treatmentArray;
                }
            })
        )

        return getCoreData()(dispatch).then(()=>{
            expect(dispatch).toHaveBeenCalledWith(saveLoadingCoreData(saveLoadingCoreDataInput));
            expect(fetch).toHaveBeenCalledWith(treatmenturl, {"method": "GET"});
            expect(dispatch).toHaveBeenCalledWith(updateTreatmentState(treatmentArray));
            expect(fetch).toHaveBeenCalledWith(conditionurl, {"method": "GET"});
            expect(dispatch).toHaveBeenCalledWith(updateConditionState(conditionArray));
            expect(dispatch).toHaveBeenCalledWith(saveLoadingCoreData(saveLoadingCoreDataInput2));
        })

    })

})