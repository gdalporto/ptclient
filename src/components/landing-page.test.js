import React from 'react';
import { shallow, mount } from 'enzyme';
import LandingPage from './landing-page';

describe('LandingPage', ()=>{
    it('Renders without crasching', ()=>{
        shallow(<LandingPage />)
    })
})