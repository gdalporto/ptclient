import React from 'react';
import {shallow, mount} from 'enzyme';
import {logTreatment} from '../actions/auth'

import MarkComplete from './mark-complete.js'

describe('<MarkComplete>', ()=>{
    it('should render without crashing', ()=>{
        let dispatch = jest.fn();
        shallow(<MarkComplete dispatch={dispatch} />)
    });

    it('should dispatch status update when clicked', ()=>{
        let dispatch = jest.fn();
        let user=[]
        let username="N@n";
        let treatments=[{treatment:"treatment"}];
        let conditions=[{condition:"condition"}];
        let condition="condition";


        let treatmentObject = {
            user,
            username,
            treatments,
            conditions,
            condition
        }


        const wrapper = shallow(<MarkComplete dispatch={dispatch} user username treatments conditions condition logTreatment />)
        wrapper.find('#button');
        wrapper.simulate('click');
        expect(dispatch).toHaveBeenCalled;
    })


})
