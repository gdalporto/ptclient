import React from 'react';
import {shallow, mount} from 'enzyme';
import {getUserData, saveLoadingUser ,getCoreData} from '../actions/core-actions.js';


import {Main} from './main';

describe('<Main />', ()=>{
    it('should load without crashing', ()=>{
        let dispatch = jest.fn();
        shallow(<Main dispatch={dispatch}    
            authToken={null}
            currentUser={null}
            users= {[]}
            activeUser= {null}
            authStatus= {null}
            loadingData= {false}
            loadingUser= {false}
            
            />);
    });
    // it('should request common data from database to prime state', ()=>{
    //     const dispatch=jest.fn();
    //     const wrapper=shallow(<Main dispatch={dispatch}/>);
    //     expect(dispatch).toHaveBeenCalledWith(getCoreData());
    // })
})

