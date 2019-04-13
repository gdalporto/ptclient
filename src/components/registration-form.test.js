import React from 'react';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import {reduxForm, reducer as form} from 'redux-form';
import configureStore from 'redux-mock-store';

import {RegistrationForm} from './registration-form';

describe("<RegistrationForm />", ()=>{
    it('should render without crashing', ()=>{
        let dispatch = jest.fn();
        let handleSubmit = jest.fn();
        shallow(<RegistrationForm dispatch={dispatch} handleSubmit={handleSubmit} />);
    })
    it('should submit the correct inputs', ()=>{
        let dispatch = jest.fn();
        let handleSubmit = jest.fn();
        let middlewares = [];
        let mockStore = configureStore(middlewares);
        let store = mockStore({});

        const username = "M@m.com";
        const password = "Hello12345";
        const condition = "Upper Back";
        const values = {
            username: username,
            password: password, 
            condition: "Upper Back",
            treatments: [
                "Shoulder Rolls", 
                "Leg Lifts"
            ],
            log:[]
        }

        const Decorated = reduxForm({form:'testForm'})(RegistrationForm);

        const wrapper = mount(
            <Provider store = {store}>
                <Decorated dispatch={dispatch} handleSubmit={handleSubmit} treatmentObject={values} />
            </Provider>
        );

        wrapper.find('input[name="username"]').instance().value=username;
        wrapper.find('input[name="password"]').instance().value=password;
        wrapper.find('select').instance().value=condition;
        wrapper.simulate('submit');
        expect(wrapper.find('input[id="username"]').instance().value).toEqual(username);
        expect(wrapper.find('input[id="password"]').instance().value).toEqual(password);
        expect(wrapper.find('select').instance().value).toEqual(condition);
        expect(handleSubmit).toHaveBeenCalled;

    })
})

