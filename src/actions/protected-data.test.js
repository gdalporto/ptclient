import { shallow, mount } from 'enzyme';
import { fetchProtectedData, 
    fetchProtectedDataSuccess,FETCH_PROTECTED_DATA_SUCCESS,
    FETCH_PROTECTED_DATA_ERROR,fetchProtectedDataError
    } from './protected-data.js'
import {API_BASE_URL} from '../config';

// TESTED THE MORE COMPLEX AND IMPORTANT OPERATIONS.
// IGNORED TESTING SOME ELEMENTS FOR TIME

describe('PROTECTED DATA', ()=>{
    it('should get protected data', ()=>{
        const url=API_BASE_URL+"/protected";
        const dispatch=jest.fn();
        const authToken = jest.fn();
        global.fetch = jest.fn().mockImplementation(()=>{
            Promise.resolve({
                ok:true,
                json(){
                    return "Hello"
                }
            })
        })


        return fetchProtectedData()(dispatch).then(()=>{
            expect(dispatch).toHaveBeenCalledWith(fetchProtectedDataSuccess("Hello"));
            expect(fetch).toHaveBeenCalledWith(url, {"method":"GET"})
        })
    })
})


