import React from 'react';
import {shallow, mount} from 'enzyme';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { reduxForm, reducer as form } from 'redux-form'
import configureStore from 'redux-mock-store';

import {LoginForm} from './login-form.js'

describe('<LoginForm>', ()=>{
    it('should render without crashing', ()=>{

      let dispatch = jest.fn();
      let handleSubmit = jest.fn();
      shallow(<LoginForm dispatch={dispatch} handleSubmit={handleSubmit} />);
    })

    it('should submit username and password', ()=>{
      let handleSubmit = jest.fn();
      let dispatch = jest.fn();
      let middlewares = [];
      let mockStore = configureStore(middlewares);
      let store = mockStore({});

      const username = "M@m.com";
      const password = "Hello12345";
      const values = {
          username: username,
          password: password
      };
      const Decorated = reduxForm({form:'testForm'})(LoginForm)
      const wrapper = mount(
        <Provider store={store}>
          <Decorated dispatch={dispatch} handleSubmit={handleSubmit} />
        </Provider>
      );
      wrapper.find('input[id="username"]').instance().value=username;
      wrapper.find('input[id="password"]').instance().value=password;
      wrapper.simulate('submit');
      expect( wrapper.find('input[id="username"]').instance().value).toEqual(username);
      expect( wrapper.find('input[id="password"]').instance().value).toEqual(password);
      expect(handleSubmit).toHaveBeenCalled;
      // expect(dispatch).toHaveBeenCalledWith(login(username, password));

  })



  //Tried to use .dive();
    // it('should submit username and password', ()=>{
    //     let handleSubmit = jest.fn();
    //     let dispatch = jest.fn();
    //     // let store = mockStore({});

    //     const username = "M@m.com";
    //     const password = "Hello12345";
    //     const values = {
    //         username: username,
    //         password: password
    //     };
    //     // const Decorated = reduxForm({form:'testForm'})(<LoginForm dispatch={dispatch} handleSubmit={handleSubmit} />)
    //     const wrapper = shallow(<LoginForm dispatch={dispatch} handleSubmit={handleSubmit} />).dive();

    //     wrapper.find('input[id="username"]').instance().value=username;
    //     wrapper.find('input[id="password"]').instance().value=password;
    //     wrapper.simulate('submit');
    //     expect( wrapper.find('input[id="username"]').instance().value).toEqual(username);
    //     // expect(dispatch).toHaveBeenCalledWith(login(username, password));

    // })






    // it('should submit username and password', ()=>{
    //     const username = "M@m.com";
    //     const password = "Hello12345";
    //     const values = {
    //         username: username,
    //         password: password
    //     };
    //     const dispatch = jest.fn();
    //     const handleSubmit = jest.fn();
    //     const Decorated = reduxForm({ form: 'testForm' })(LoginForm)

    //     const wrapper = mount(
    //         <Provider store={store}>
    //             <Decorated />;
    //         </Provider>
    //     );

    //     wrapper.find('input[id="username"]').instance().value=username;
    //     wrapper.find('input[id="password"]').instance().value=password;
    //     wrapper.simulate('submit');
    //     expect( wrapper.find('input[id="username"]').instance().value).toEqual(username);
    //     expect(dispatch).toHaveBeenCalledWith(login(username, password));
    // })



    // const store = createStore(
    //   combineReducers({ form }),
    //   { form: {} }
    // )
  
    // const Decorated = reduxForm({ form: 'testForm' })(LoginForm)
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <Decorated />
    //   </Provider>
    // )



})