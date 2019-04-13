import React from 'react';
import { shallow, mount } from 'enzyme';
import LandingPage from './landing-page';

describe('LandingPage', ()=>{
    it('Renders without crasching', ()=>{
        shallow(<LandingPage />)
    })
    // HELP - HOW SIMULATE LINK CLICK AND MAKE SURE DIRECTED TO CORRECT DESTINATION?
    // it('redirects on link click', ()=>{
    //     const wrapper = shallow(<LandingPage />);
    //     wrapper.find('loginButton').simulate('click');
    //     expect(wrapper).toHaveBeen('clicked');

    // })

})